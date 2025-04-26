-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can create their own apps" ON apps;

DROP POLICY IF EXISTS "Users can view all published apps" ON apps;

DROP POLICY IF EXISTS "Users can view and manage their own apps" ON apps;

-- Enable RLS
ALTER TABLE
    apps ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can create their own apps" ON apps FOR
INSERT
    TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all published apps" ON apps FOR
SELECT
    TO authenticated USING (status = 'approved');

CREATE POLICY "Users can view and manage their own apps" ON apps FOR ALL TO authenticated USING (auth.uid() = user_id);