-- Run this script if you have an existing readefy_db with users table
-- This adds the missing name and registration_no columns

USE readefy_db;

-- Check if columns exist, if not add them
ALTER TABLE users
ADD COLUMN IF NOT EXISTS name VARCHAR(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS registration_no VARCHAR(100) DEFAULT NULL;

SELECT 'Database schema updated successfully!' AS status;

SELECT * FROM users;