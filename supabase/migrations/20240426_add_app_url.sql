-- Add app_url column to apps table
ALTER TABLE
    apps
ADD
    COLUMN app_url TEXT NOT NULL DEFAULT '';

-- Update existing rows to have a default app_url
UPDATE
    apps
SET
    app_url = support_url
WHERE
    app_url = '';

-- Add a check constraint to ensure app_url is a valid URL
ALTER TABLE
    apps
ADD
    CONSTRAINT valid_app_url CHECK (app_url ~ '^https?://[^\s/$.?#].[^\s]*$');