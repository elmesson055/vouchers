-- Drop existing policies
DROP POLICY IF EXISTS "vouchers_descartaveis_select_policy" ON vouchers_descartaveis;
DROP POLICY IF EXISTS "vouchers_descartaveis_update_policy" ON vouchers_descartaveis;

-- Enable RLS
ALTER TABLE vouchers_descartaveis ENABLE ROW LEVEL SECURITY;

-- Create select policy with proper validation
CREATE POLICY "vouchers_descartaveis_select_policy" ON vouchers_descartaveis AS RESTRICTIVE
    FOR SELECT TO authenticated, anon
    USING (
        -- Voucher não usado e dentro da validade
        usado_em IS NULL 
        AND data_uso IS NULL
        AND CURRENT_DATE <= data_expiracao::date
        AND codigo IS NOT NULL
        AND EXISTS (
            SELECT 1 FROM tipos_refeicao tr
            WHERE tr.id = tipo_refeicao_id
            AND tr.ativo = true
            AND CURRENT_TIME BETWEEN tr.horario_inicio 
            AND (tr.horario_fim + (tr.minutos_tolerancia || ' minutes')::INTERVAL)
        )
    );

-- Create update policy to allow marking as used
CREATE POLICY "vouchers_descartaveis_update_policy" ON vouchers_descartaveis AS RESTRICTIVE
    FOR UPDATE TO authenticated, anon
    USING (
        -- Voucher não usado e dentro da validade
        usado_em IS NULL 
        AND data_uso IS NULL
        AND CURRENT_DATE <= data_expiracao::date
        AND EXISTS (
            SELECT 1 FROM tipos_refeicao tr
            WHERE tr.id = tipo_refeicao_id
            AND tr.ativo = true
            AND CURRENT_TIME BETWEEN tr.horario_inicio 
            AND (tr.horario_fim + (tr.minutos_tolerancia || ' minutes')::INTERVAL)
        )
    );

-- Create function to validate voucher update
CREATE OR REPLACE FUNCTION validate_voucher_update()
RETURNS TRIGGER AS $$
BEGIN
    -- Verificar se o voucher já foi usado
    IF EXISTS (
        SELECT 1 FROM vouchers_descartaveis
        WHERE id = NEW.id
        AND (usado_em IS NOT NULL OR data_uso IS NOT NULL)
    ) THEN
        RAISE EXCEPTION 'Este voucher já foi utilizado';
    END IF;

    -- Verificar se os campos importantes não foram alterados
    IF NEW.tipo_refeicao_id != OLD.tipo_refeicao_id OR
       NEW.codigo != OLD.codigo OR
       NEW.data_expiracao != OLD.data_expiracao THEN
        RAISE EXCEPTION 'Não é permitido alterar campos do voucher';
    END IF;

    -- Verificar se está sendo marcado como usado corretamente
    IF NEW.usado_em IS NULL OR NEW.data_uso IS NULL THEN
        RAISE EXCEPTION 'O voucher deve ser marcado com data de uso';
    END IF;

    -- Verificar se o tipo de refeição está ativo e dentro do horário
    IF NOT EXISTS (
        SELECT 1 FROM tipos_refeicao tr
        WHERE tr.id = NEW.tipo_refeicao_id
        AND tr.ativo = true
        AND CURRENT_TIME BETWEEN tr.horario_inicio 
        AND (tr.horario_fim + (tr.minutos_tolerancia || ' minutes')::INTERVAL)
    ) THEN
        RAISE EXCEPTION 'Tipo de refeição inválido ou fora do horário permitido';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for validation
DROP TRIGGER IF EXISTS validate_voucher_update_trigger ON vouchers_descartaveis;
CREATE TRIGGER validate_voucher_update_trigger
    BEFORE UPDATE ON vouchers_descartaveis
    FOR EACH ROW
    EXECUTE FUNCTION validate_voucher_update();

-- Grant necessary permissions
GRANT SELECT, UPDATE ON vouchers_descartaveis TO anon;
GRANT SELECT ON tipos_refeicao TO anon;

-- Add helpful comments
COMMENT ON POLICY "vouchers_descartaveis_select_policy" ON vouchers_descartaveis IS 
'Permite visualizar apenas vouchers válidos, não utilizados e dentro do horário permitido';

COMMENT ON POLICY "vouchers_descartaveis_update_policy" ON vouchers_descartaveis IS 
'Permite apenas marcar vouchers como usados quando dentro do horário permitido';

COMMENT ON FUNCTION validate_voucher_update() IS 
'Valida a atualização de vouchers para garantir uso único e correto';