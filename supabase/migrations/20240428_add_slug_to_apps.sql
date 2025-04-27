-- Add slug column to apps table
ALTER TABLE
    apps
ADD
    COLUMN slug TEXT;

-- Set default slugs for existing data
UPDATE
    apps
SET
    slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE
    slug IS NULL;

-- Make slug column unique and not null
ALTER TABLE
    apps
ALTER COLUMN
    slug
SET
    NOT NULL;

ALTER TABLE
    apps
ADD
    CONSTRAINT apps_slug_key UNIQUE (slug);