-- Drop existing policies
DROP POLICY IF EXISTS "uso_voucher_insert_policy" ON uso_voucher;
DROP POLICY IF EXISTS "uso_voucher_select_policy" ON uso_voucher;

-- Enable RLS
ALTER TABLE uso_voucher ENABLE ROW LEVEL SECURITY;

-- Create unified insert policy
CREATE POLICY "uso_voucher_insert_policy" ON uso_voucher AS PERMISSIVE
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM admin_users au
            WHERE au.id = auth.uid()
            AND au.permissoes->>'sistema' = 'true'
        )
        AND
        CASE 
            WHEN voucher_extra_id IS NOT NULL THEN
                check_voucher_extra_rules(
                    voucher_extra_id, 
                    usuario_id, 
                    tipo_refeicao_id,
                    (SELECT voucher FROM usuarios WHERE id = usuario_id)
                )
            ELSE
                check_voucher_comum_rules(
                    usuario_id, 
                    tipo_refeicao_id,
                    (SELECT voucher FROM usuarios WHERE id = usuario_id)
                )
        END
    );

-- Create select policy
CREATE POLICY "uso_voucher_select_policy" ON uso_voucher AS PERMISSIVE
    FOR SELECT TO authenticated
    USING (
        usuario_id = auth.uid()
        OR
        EXISTS (
            SELECT 1 FROM admin_users au
            WHERE au.id = auth.uid()
            AND au.permissoes->>'gerenciar_usuarios' = 'true'
            AND NOT au.suspenso
        )
    );