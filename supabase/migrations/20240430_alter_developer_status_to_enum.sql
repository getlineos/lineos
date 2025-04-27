-- Create the enum type
CREATE TYPE developer_status_type AS ENUM ('not_applied', 'pending', 'approved', 'rejected');

-- Drop the existing column
ALTER TABLE
    profiles DROP COLUMN developer_status;

-- Add the column with the new enum type
ALTER TABLE
    profiles
ADD
    COLUMN developer_status developer_status_type DEFAULT 'not_applied';

-- Update existing rows to match the enum values
UPDATE
    profiles
SET
    developer_status = 'not_applied' :: developer_status_type
WHERE
    developer_status IS NULL;