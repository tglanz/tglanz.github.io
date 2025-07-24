---
title: PostgreSQL Cheatsheet
categories:
- Cheatsheet
tags:
- PostgreSQL
- Database
- SQL
---

# PostgreSQL Cheatsheet

Essential PostgreSQL commands and queries I use regularly. Focused on practical stuff you'll actually need.

## Connecting & Basic Commands

**Connect to PostgreSQL:**
```bash
psql -U username -d database_name          # Connect to specific database
psql -U postgres                           # Connect as postgres user
psql -h localhost -p 5432 -U user mydb     # Connect with host/port
```

**Essential psql commands:**
```sql
\?                      -- Show help
\q                      -- Quit psql
\l                      -- List all databases
\c database_name        -- Connect to database
\dt                     -- List tables in current database
\d table_name           -- Describe table structure
\du                     -- List users/roles
\i script.sql           -- Execute SQL file
```

## Database Operations

**Create and manage databases:**
```sql
CREATE DATABASE myproject;
DROP DATABASE myproject;
\c myproject            -- Switch to myproject database

-- Create database with specific encoding
CREATE DATABASE myapp 
    WITH ENCODING 'UTF8' 
    LC_COLLATE='en_US.UTF-8' 
    LC_CTYPE='en_US.UTF-8';
```

## Table Operations

**Create tables with common patterns:**
```sql
-- Basic table with common column types
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Table with foreign key
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Modify existing tables:**
```sql
-- Add column
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- Change column type
ALTER TABLE users ALTER COLUMN name TYPE VARCHAR(150);

-- Add constraint
ALTER TABLE users ADD CONSTRAINT email_format 
    CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Drop column
ALTER TABLE users DROP COLUMN phone;
```

## CRUD Operations

**Insert data:**
```sql
-- Single insert
INSERT INTO users (email, name) 
VALUES ('john@example.com', 'John Doe');

-- Multiple inserts
INSERT INTO users (email, name) VALUES 
    ('alice@example.com', 'Alice Smith'),
    ('bob@example.com', 'Bob Johnson');

-- Insert and return data
INSERT INTO users (email, name) 
VALUES ('new@example.com', 'New User') 
RETURNING id, created_at;
```

**Select data:**
```sql
-- Basic selects
SELECT * FROM users;
SELECT email, name FROM users WHERE is_active = true;

-- With joins
SELECT u.name, p.title 
FROM users u 
JOIN posts p ON u.id = p.user_id
WHERE u.is_active = true;

-- Pagination
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 20;

-- Count records
SELECT COUNT(*) FROM users WHERE created_at >= '2024-01-01';
```

**Update data:**
```sql
-- Simple update
UPDATE users SET name = 'Jane Doe' WHERE id = 1;

-- Update with timestamp
UPDATE users SET 
    name = 'Updated Name',
    updated_at = CURRENT_TIMESTAMP 
WHERE email = 'user@example.com';

-- Update with condition
UPDATE posts SET title = 'Updated: ' || title 
WHERE created_at < '2024-01-01';
```

**Delete data:**
```sql
-- Soft delete (recommended)
UPDATE users SET is_active = false WHERE id = 1;

-- Hard delete
DELETE FROM users WHERE id = 1;

-- Delete with join condition
DELETE FROM posts 
WHERE user_id IN (SELECT id FROM users WHERE is_active = false);
```

## User & Role Management

**Create and manage users:**
```sql
-- Create user with password
CREATE ROLE myapp_user WITH LOGIN PASSWORD 'secure_password';

-- Create user with specific privileges
CREATE ROLE app_readonly WITH LOGIN PASSWORD 'password'
    CONNECTION LIMIT 10;

-- Grant database access
GRANT CONNECT ON DATABASE myproject TO myapp_user;
GRANT USAGE ON SCHEMA public TO myapp_user;

-- Grant table permissions
GRANT SELECT, INSERT, UPDATE ON users TO app_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;

-- Make user a superuser (be careful!)
ALTER ROLE username CREATEDB CREATEROLE;
```

**Common role patterns:**
```sql
-- Read-only user for reports
CREATE ROLE reports_user WITH LOGIN PASSWORD 'password';
GRANT CONNECT ON DATABASE myproject TO reports_user;
GRANT USAGE ON SCHEMA public TO reports_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO reports_user;

-- Application user with limited permissions
CREATE ROLE app_user WITH LOGIN PASSWORD 'password';
GRANT CONNECT ON DATABASE myproject TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON users, posts TO app_user;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;
```

## Indexes & Performance

**Create indexes for better performance:**
```sql
-- Basic index
CREATE INDEX idx_users_email ON users(email);

-- Composite index
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at);

-- Partial index (conditional)
CREATE INDEX idx_active_users ON users(email) WHERE is_active = true;

-- Check index usage
SELECT indexname, indexdef FROM pg_indexes WHERE tablename = 'users';
```

## Common Queries & Patterns

**Date/time queries:**
```sql
-- Records from last 7 days
SELECT * FROM posts 
WHERE created_at >= CURRENT_DATE - INTERVAL '7 days';

-- Group by date
SELECT DATE(created_at) as day, COUNT(*) 
FROM posts 
GROUP BY DATE(created_at) 
ORDER BY day;

-- Format timestamps
SELECT name, TO_CHAR(created_at, 'YYYY-MM-DD HH24:MI') as formatted_date
FROM users;
```

**String operations:**
```sql
-- Case-insensitive search
SELECT * FROM users WHERE LOWER(name) LIKE '%john%';

-- Pattern matching
SELECT * FROM users WHERE email ~ '@gmail\.com$';

-- String concatenation
SELECT name || ' (' || email || ')' as display_name FROM users;
```

**Aggregations:**
```sql
-- Count posts per user
SELECT u.name, COUNT(p.id) as post_count
FROM users u
LEFT JOIN posts p ON u.id = p.user_id
GROUP BY u.id, u.name
ORDER BY post_count DESC;

-- Find duplicates
SELECT email, COUNT(*) 
FROM users 
GROUP BY email 
HAVING COUNT(*) > 1;
```

## JSON Operations (PostgreSQL specialty)

**Working with JSON columns:**
```sql
-- Create table with JSON
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    data JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert JSON data
INSERT INTO events (data) VALUES 
('{"type": "login", "user_id": 123, "ip": "192.168.1.1"}'),
('{"type": "purchase", "user_id": 123, "amount": 29.99, "product": "book"}');

-- Query JSON data
SELECT * FROM events WHERE data->>'type' = 'login';
SELECT * FROM events WHERE (data->>'user_id')::int = 123;
SELECT data->'amount' as amount FROM events WHERE data ? 'amount';

-- Create index on JSON field
CREATE INDEX idx_events_type ON events USING GIN ((data->>'type'));
```

## Backup & Restore

**Backup database:**
```bash
# Full database backup
pg_dump -U postgres myproject > backup.sql

# Compressed backup
pg_dump -U postgres -Fc myproject > backup.dump

# Schema only
pg_dump -U postgres -s myproject > schema.sql

# Data only
pg_dump -U postgres -a myproject > data.sql
```

**Restore database:**
```bash
# From SQL file
psql -U postgres -d myproject < backup.sql

# From compressed dump
pg_restore -U postgres -d myproject backup.dump

# Create database and restore
createdb -U postgres myproject_restored
pg_restore -U postgres -d myproject_restored backup.dump
```

## Useful Maintenance Commands

**Database maintenance:**
```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('myproject'));

-- Check table sizes
SELECT 
    tablename,
    pg_size_pretty(pg_total_relation_size(tablename::regclass)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(tablename::regclass) DESC;

-- Update table statistics
ANALYZE users;

-- Reclaim space after deletes
VACUUM users;

-- Full vacuum (locks table)
VACUUM FULL users;
```

**Monitor active connections:**
```sql
-- See current connections
SELECT pid, usename, application_name, client_addr, state, query_start
FROM pg_stat_activity 
WHERE state = 'active';

-- Kill a connection
SELECT pg_terminate_backend(pid) FROM pg_stat_activity 
WHERE usename = 'problem_user';
```

## Environment Variables

Set these in your shell or `.env` file:
```bash
export PGHOST=localhost
export PGPORT=5432
export PGUSER=myuser
export PGPASSWORD=mypassword
export PGDATABASE=myproject

# Then just run: psql
```

## Connection String Examples

```bash
# For applications
postgresql://username:password@host:port/database

# With SSL
postgresql://user:pass@host/db?sslmode=require

# Local connection
postgresql:///myproject?host=/var/run/postgresql
```

This covers the essential PostgreSQL operations you'll need for most web applications and data work.