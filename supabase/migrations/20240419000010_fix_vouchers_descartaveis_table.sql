/* Drop existing table */
DROP TABLE IF EXISTS vouchers_descartaveis CASCADE;

/* Create table with UUID */
CREATE TABLE IF NOT EXISTS vouchers_descartaveis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    codigo VARCHAR(4) NOT NULL,
    tipo_refeicao_id UUID REFERENCES tipos_refeicao(id),
    data_expiracao TIMESTAMP WITH TIME ZONE NOT NULL,
    usado BOOLEAN DEFAULT FALSE,
    data_uso TIMESTAMP WITH TIME ZONE,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(codigo)
);

/* Enable RLS */
ALTER TABLE vouchers_descartaveis ENABLE ROW LEVEL SECURITY;

/* Drop existing policies */
DROP POLICY IF EXISTS "vouchers_descartaveis_select_policy" ON vouchers_descartaveis;
DROP POLICY IF EXISTS "vouchers_descartaveis_insert_policy" ON vouchers_descartaveis;
DROP POLICY IF EXISTS "vouchers_descartaveis_update_policy" ON vouchers_descartaveis;

/* Create new policies with proper security context */
CREATE POLICY "vouchers_descartaveis_select_policy"
ON vouchers_descartaveis FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "vouchers_descartaveis_insert_policy"
ON vouchers_descartaveis FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM auth.users
        WHERE auth.uid() = id
        AND (
            raw_user_meta_data->>'role' = 'admin'
            OR raw_user_meta_data->>'role' = 'manager'
        )
    )
    OR
    current_setting('app.inserting_voucher_descartavel', true)::boolean = true
);

CREATE POLICY "vouchers_descartaveis_update_policy"
ON vouchers_descartaveis FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

/* Create indexes */
CREATE INDEX idx_vouchers_descartaveis_tipo_refeicao ON vouchers_descartaveis(tipo_refeicao_id);
CREATE INDEX idx_vouchers_descartaveis_data_expiracao ON vouchers_descartaveis(data_expiracao);
CREATE INDEX idx_vouchers_descartaveis_usado ON vouchers_descartaveis(usado);
CREATE INDEX idx_vouchers_descartaveis_codigo ON vouchers_descartaveis(codigo);

/* Ensure proper permissions */
GRANT ALL ON vouchers_descartaveis TO authenticated;
GRANT ALL ON vouchers_descartaveis TO service_role;

/* Drop existing function if it exists */
DROP FUNCTION IF EXISTS insert_voucher_descartavel;

/* Create helper function for inserting disposable vouchers with correct column names */
CREATE OR REPLACE FUNCTION insert_voucher_descartavel(
    p_tipo_refeicao_id UUID,
    p_data_expiracao DATE,
    p_codigo VARCHAR
)
RETURNS UUID
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
    v_id UUID;
BEGIN
    /* Set the security context for RLS */
    PERFORM set_config('app.inserting_voucher_descartavel', 'true', true);
    
    /* Verificar se o tipo de refeição está ativo */
    IF NOT EXISTS (
        SELECT 1 
        FROM tipos_refeicao 
        WHERE id = p_tipo_refeicao_id 
        AND ativo = true
    ) THEN
        RAISE EXCEPTION 'Tipo de refeição inválido ou inativo';
    END IF;

    /* Verificar se o código já existe */
    IF EXISTS (
        SELECT 1 
        FROM vouchers_descartaveis 
        WHERE codigo = p_codigo
    ) THEN
        RAISE EXCEPTION 'Código de voucher já existe';
    END IF;

    /* Verificar se a data de expiração é válida */
    IF p_data_expiracao < CURRENT_DATE THEN
        RAISE EXCEPTION 'Data de expiração deve ser futura';
    END IF;

    /* Inserir o voucher usando os nomes corretos das colunas */
    INSERT INTO vouchers_descartaveis (
        id,
        tipo_refeicao_id,
        codigo,
        data_expiracao,
        usado,
        data_criacao
    )
    VALUES (
        gen_random_uuid(),
        p_tipo_refeicao_id,
        p_codigo,
        p_data_expiracao,
        false,
        CURRENT_TIMESTAMP
    )
    RETURNING id INTO v_id;

    /* Reset the security context */
    PERFORM set_config('app.inserting_voucher_descartavel', 'false', true);

    RETURN v_id;
EXCEPTION
    WHEN OTHERS THEN
        /* Reset the security context in case of error */
        PERFORM set_config('app.inserting_voucher_descartavel', 'false', true);
        RAISE EXCEPTION 'Erro ao inserir voucher descartável: %', SQLERRM;
END;
$$;

/* Set function permissions */
REVOKE ALL ON FUNCTION insert_voucher_descartavel FROM PUBLIC;
GRANT EXECUTE ON FUNCTION insert_voucher_descartavel TO authenticated;

/* Add comment */
COMMENT ON FUNCTION insert_voucher_descartavel IS 'Insere um novo voucher descartável com validações de segurança';