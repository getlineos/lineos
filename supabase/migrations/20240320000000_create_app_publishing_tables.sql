-- Create enum types
CREATE TYPE pricing_model AS ENUM ('free', 'paid', 'freemium', 'subscription');

CREATE TYPE release_type AS ENUM ('immediate', 'manual', 'scheduled');

CREATE TYPE age_rating AS ENUM ('4+', '9+', '12+', '17+');

CREATE TYPE app_status AS ENUM (
    'draft',
    'pending_review',
    'approved',
    'rejected'
);

-- Create apps table
CREATE TABLE apps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    name VARCHAR(100) NOT NULL,
    subtitle VARCHAR(100),
    description TEXT NOT NULL,
    primary_category VARCHAR(50) NOT NULL,
    subcategory VARCHAR(50),
    keywords TEXT [] NOT NULL,
    support_url TEXT NOT NULL,
    privacy_policy_url TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    pricing_model pricing_model NOT NULL,
    price DECIMAL(10, 2),
    currency VARCHAR(3),
    release_type release_type NOT NULL,
    scheduled_release_date TIMESTAMP WITH TIME ZONE,
    is_preorder BOOLEAN DEFAULT false,
    age_rating age_rating NOT NULL,
    content_descriptors TEXT [],
    review_notes TEXT,
    status app_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create app_assets table
CREATE TABLE app_assets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    app_id UUID REFERENCES apps(id) ON DELETE CASCADE NOT NULL,
    asset_type VARCHAR(20) NOT NULL,
    -- 'icon', 'screenshot', 'preview_video'
    file_path TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create app_territories table
CREATE TABLE app_territories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    app_id UUID REFERENCES apps(id) ON DELETE CASCADE NOT NULL,
    territory_code VARCHAR(2) NOT NULL,
    -- ISO 3166-1 alpha-2 country codes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(app_id, territory_code)
);

-- Create app_reviews table
CREATE TABLE app_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    app_id UUID REFERENCES apps(id) ON DELETE CASCADE NOT NULL,
    reviewer_id UUID REFERENCES auth.users(id) NOT NULL,
    status app_status NOT NULL,
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE
    apps ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    app_assets ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    app_territories ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    app_reviews ENABLE ROW LEVEL SECURITY;

-- Apps policies
CREATE POLICY "Users can view their own apps" ON apps FOR
SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own apps" ON apps FOR
INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own apps" ON apps FOR
UPDATE
    USING (auth.uid() = user_id);

-- App assets policies
CREATE POLICY "Users can view their own app assets" ON app_assets FOR
SELECT
    USING (
        EXISTS (
            SELECT
                1
            FROM
                apps
            WHERE
                apps.id = app_assets.app_id
                AND apps.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create assets for their own apps" ON app_assets FOR
INSERT
    WITH CHECK (
        EXISTS (
            SELECT
                1
            FROM
                apps
            WHERE
                apps.id = app_assets.app_id
                AND apps.user_id = auth.uid()
        )
    );

-- App territories policies
CREATE POLICY "Users can view their own app territories" ON app_territories FOR
SELECT
    USING (
        EXISTS (
            SELECT
                1
            FROM
                apps
            WHERE
                apps.id = app_territories.app_id
                AND apps.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage territories for their own apps" ON app_territories FOR ALL USING (
    EXISTS (
        SELECT
            1
        FROM
            apps
        WHERE
            apps.id = app_territories.app_id
            AND apps.user_id = auth.uid()
    )
);

-- App reviews policies
CREATE POLICY "Users can view reviews for their own apps" ON app_reviews FOR
SELECT
    USING (
        EXISTS (
            SELECT
                1
            FROM
                apps
            WHERE
                apps.id = app_reviews.app_id
                AND apps.user_id = auth.uid()
        )
    );

-- Create function to update updated_at timestamp
CREATE
OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $ $ BEGIN NEW.updated_at = NOW();

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_apps_updated_at BEFORE
UPDATE
    ON apps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_app_reviews_updated_at BEFORE
UPDATE
    ON app_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();