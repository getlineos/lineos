-- Add icon_url column to apps table
ALTER TABLE
    apps
ADD
    COLUMN icon_url TEXT NOT NULL DEFAULT '';

-- Update existing rows to have a default icon URL
UPDATE
    apps
SET
    icon_url = 'https://via.placeholder.com/1024'
WHERE
    icon_url = '';

-- Make the column non-nullable after updating existing rows
ALTER TABLE
    apps
ALTER COLUMN
    icon_url
SET
    NOT NULL;