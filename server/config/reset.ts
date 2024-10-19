import { pool } from './database';
import './dotenv';

const resetDatabase = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS CustomItem');

        await pool.query(`
            CREATE TABLE CustomItem (
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
            )
        `);

        console.log('Database reset successfully');
    } catch (error) {
        console.error('Error resetting database:', error);
    } finally {
        pool.end();
    }
};

resetDatabase();