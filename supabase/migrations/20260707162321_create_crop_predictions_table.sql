/*
# Create Crop Predictions Table

1. New Tables
- `crop_predictions`
  - `id` (uuid, primary key)
  - `nitrogen` (float, not null) - Nitrogen content in soil (kg/ha)
  - `phosphorus` (float, not null) - Phosphorus content in soil (kg/ha)
  - `potassium` (float, not null) - Potassium content in soil (kg/ha)
  - `temperature` (float, not null) - Temperature in Celsius
  - `humidity` (float, not null) - Relative humidity percentage
  - `ph` (float, not null) - Soil pH value
  - `rainfall` (float, not null) - Rainfall in mm
  - `predicted_crop` (text, not null) - Recommended crop name
  - `confidence` (float) - Model confidence score
  - `created_at` (timestamp)

2. Security
- Enable RLS on `crop_predictions`.
- Allow anon + authenticated CRUD for public crop prediction access.

3. Notes
- This is a single-tenant application for crop prediction.
- All predictions are stored for analysis and history tracking.
*/

CREATE TABLE IF NOT EXISTS crop_predictions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nitrogen float NOT NULL,
  phosphorus float NOT NULL,
  potassium float NOT NULL,
  temperature float NOT NULL,
  humidity float NOT NULL,
  ph float NOT NULL,
  rainfall float NOT NULL,
  predicted_crop text NOT NULL,
  confidence float,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE crop_predictions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_predictions" ON crop_predictions;
CREATE POLICY "anon_select_predictions" ON crop_predictions FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_predictions" ON crop_predictions;
CREATE POLICY "anon_insert_predictions" ON crop_predictions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_predictions" ON crop_predictions;
CREATE POLICY "anon_update_predictions" ON crop_predictions FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_predictions" ON crop_predictions;
CREATE POLICY "anon_delete_predictions" ON crop_predictions FOR DELETE
  TO anon, authenticated USING (true);

-- Create index for faster queries by predicted crop
CREATE INDEX IF NOT EXISTS idx_crop_predictions_crop ON crop_predictions(predicted_crop);
CREATE INDEX IF NOT EXISTS idx_crop_predictions_created_at ON crop_predictions(created_at DESC);