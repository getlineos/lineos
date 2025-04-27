-- Create profiles table
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    developer_status VARCHAR(20) DEFAULT 'not_applied',
    -- Add more profile fields as needed
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT
);

-- Enable RLS
ALTER TABLE
    profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON profiles FOR
SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles FOR
UPDATE
    USING (auth.uid() = id);

-- Create function to update updated_at timestamp
CREATE
OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $ $ BEGIN NEW.updated_at = NOW();

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE
UPDATE
    ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user signup
CREATE
OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $ $ BEGIN
INSERT INTO
    public.profiles (id)
VALUES
    (NEW.id);

RETURN NEW;

END;

$ $ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
AFTER
INSERT
    ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();