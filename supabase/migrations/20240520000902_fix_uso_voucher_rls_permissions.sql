-- Drop existing policies
DROP POLICY IF EXISTS "uso_voucher_select_policy" ON uso_voucher;
DROP POLICY IF EXISTS "uso_voucher_insert_policy" ON uso_voucher;
DROP POLICY IF EXISTS "uso_voucher_update_policy" ON uso_voucher;
DROP POLICY IF EXISTS "uso_voucher_delete_policy" ON uso_voucher;

-- Enable RLS
ALTER TABLE uso_voucher ENABLE ROW LEVEL SECURITY;

-- Create new policies with full access for authenticated users
CREATE POLICY "uso_voucher_select_policy" ON uso_voucher
    FOR SELECT TO authenticated, anon
    USING (true);

CREATE POLICY "uso_voucher_insert_policy" ON uso_voucher
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "uso_voucher_update_policy" ON uso_voucher
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "uso_voucher_delete_policy" ON uso_voucher
    FOR DELETE TO authenticated
    USING (true);

-- Grant necessary permissions
GRANT ALL ON uso_voucher TO authenticated;
GRANT SELECT ON uso_voucher TO anon;
GRANT ALL ON uso_voucher TO service_role;

-- Grant schema usage
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Add comments
COMMENT ON POLICY "uso_voucher_select_policy" ON uso_voucher IS 'Permite que todos os usuários visualizem registros';
COMMENT ON POLICY "uso_voucher_insert_policy" ON uso_voucher IS 'Permite que usuários autenticados insiram registros';
COMMENT ON POLICY "uso_voucher_update_policy" ON uso_voucher IS 'Permite que usuários autenticados atualizem registros';
COMMENT ON POLICY "uso_voucher_delete_policy" ON uso_voucher IS 'Permite que usuários autenticados deletem registros';