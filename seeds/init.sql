CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS auth_providers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    provider VARCHAR(50) NOT NULL,
    provider_user_id VARCHAR(255) NOT NULL,

    CONSTRAINT fk_user
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    UNIQUE(provider, provider_user_id)
);


-- Seed users required for testing

INSERT INTO users (email, name, password_hash, role)
VALUES
(
'admin@example.com',
'Admin User',
'$2b$10$FGTWnzqpnNTnxqL7xgYEieBhlIot8ZaNx6kRwVFvcrfrahW.1LqsW',
'admin'
),
(
'john@example.com',
'Regular User',
'$2b$10$FGTWnzqpnNTnxqL7xgYEieBhlIot8ZaNx6kRwVFvcrfrahW.1LqsW',
'user'
)
ON CONFLICT (email) DO NOTHING;