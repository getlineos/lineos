-- Enable RLS on the storage.objects table
ALTER TABLE
    storage.objects ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files" ON storage.objects FOR
INSERT
    TO authenticated WITH CHECK (
        bucket_id = 'lineos'
        AND (storage.foldername(name)) [1] = 'app-icons'
    );

-- Create a policy to allow public access to read files
CREATE POLICY "Allow public access to read files" ON storage.objects FOR
SELECT
    TO public USING (bucket_id = 'lineos');

-- Create a policy to allow users to delete their own files
CREATE POLICY "Allow users to delete their own files" ON storage.objects FOR DELETE TO authenticated USING (
    bucket_id = 'lineos'
    AND (storage.foldername(name)) [1] = 'app-icons'
);