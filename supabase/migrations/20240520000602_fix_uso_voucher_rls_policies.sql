-- Drop existing policies
DROP POLICY IF EXISTS "uso_voucher_insert_policy" ON uso_voucher;
DROP POLICY IF EXISTS "uso_voucher_select_policy" ON uso_voucher;

-- Enable RLS
ALTER TABLE uso_voucher ENABLE ROW LEVEL SECURITY;

-- Create unified insert policy with proper validation
CREATE POLICY "uso_voucher_insert_policy" ON uso_voucher
    FOR INSERT TO authenticated, anon
    WITH CHECK (
        -- Allow system to register voucher usage
        (
            EXISTS (
                SELECT 1 FROM admin_users au
                WHERE au.id = auth.uid()
                AND au.permissoes->>'sistema' = 'true'
            )
        )
        OR
        -- Allow anonymous users to register disposable voucher usage
        (
            EXISTS (
                SELECT 1 FROM vouchers_descartaveis vd
                WHERE vd.id = NEW.voucher_descartavel_id
                AND vd.usado_em IS NULL
                AND CURRENT_DATE <= vd.data_expiracao::date
                AND EXISTS (
                    SELECT 1 FROM tipos_refeicao tr
                    WHERE tr.id = NEW.tipo_refeicao_id
                    AND tr.ativo = true
                    AND CURRENT_TIME BETWEEN tr.horario_inicio 
                    AND (tr.horario_fim + (tr.minutos_tolerancia || ' minutes')::INTERVAL)
                )
            )
        )
    );

-- Create select policy
CREATE POLICY "uso_voucher_select_policy" ON uso_voucher
    FOR SELECT TO authenticated, anon
    USING (
        -- Authenticated users can see their own records
        (auth.uid() IS NOT NULL AND usuario_id = auth.uid())
        OR
        -- Admins can see all records
        (
            EXISTS (
                SELECT 1 FROM admin_users au
                WHERE au.id = auth.uid()
                AND au.permissoes->>'gerenciar_usuarios' = 'true'
                AND NOT au.suspenso
            )
        )
        OR
        -- Anonymous users can see disposable voucher usage
        (
            auth.uid() IS NULL 
            AND voucher_descartavel_id IS NOT NULL
        )
    );

-- Ensure proper column exists
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'uso_voucher' 
        AND column_name = 'voucher_descartavel_id'
    ) THEN
        ALTER TABLE uso_voucher 
        ADD COLUMN voucher_descartavel_id UUID REFERENCES vouchers_descartaveis(id);
    END IF;
END $$;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_uso_voucher_descartavel_id 
ON uso_voucher(voucher_descartavel_id);

-- Grant necessary permissions
GRANT SELECT, INSERT ON uso_voucher TO anon;
GRANT SELECT ON tipos_refeicao TO anon;
GRANT SELECT ON vouchers_descartaveis TO anon;

-- Add helpful comments
COMMENT ON POLICY "uso_voucher_insert_policy" ON uso_voucher IS 
'Permite que o sistema e usuários anônimos registrem uso de vouchers com validações específicas';

COMMENT ON POLICY "uso_voucher_select_policy" ON uso_voucher IS 
'Permite visualização do histórico de uso de vouchers para usuários autenticados e anônimos';