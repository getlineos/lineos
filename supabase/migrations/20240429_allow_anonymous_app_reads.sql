-- Create a policy to allow anonymous users to view published apps
CREATE POLICY "Allow anonymous users to view published apps" ON apps FOR
SELECT
    TO anon USING (status = 'approved');

-- Create a policy to allow anonymous users to view app assets for published apps
CREATE POLICY "Allow anonymous users to view published app assets" ON app_assets FOR
SELECT
    TO anon USING (
        EXISTS (
            SELECT
                1
            FROM
                apps
            WHERE
                apps.id = app_assets.app_id
                AND apps.status = 'approved'
        )
    );

-- Create a policy to allow anonymous users to view app territories for published apps
CREATE POLICY "Allow anonymous users to view published app territories" ON app_territories FOR
SELECT
    TO anon USING (
        EXISTS (
            SELECT
                1
            FROM
                apps
            WHERE
                apps.id = app_territories.app_id
                AND apps.status = 'approved'
        )
    );