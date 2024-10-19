import { pool } from './database.ts';

const createTableQuery = `
CREATE TABLE IF NOT EXISTS CustomItem (
    id SERIAL PRIMARY KEY,
    cpu JSONB NOT NULL,
    gpu JSONB NOT NULL,
    motherboard JSONB NOT NULL,
    ram JSONB NOT NULL,
    storage JSONB NOT NULL,
    psu JSONB NOT NULL,
    cooling JSONB NOT NULL,
    os JSONB NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL
);
`;

pool.query(createTableQuery)
    .then(() => console.log('CustomItem table created'))
    .catch(err => console.error('Error creating CustomItem table', err));