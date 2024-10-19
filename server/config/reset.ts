import { pool } from './database';
import './dotenv';

const resetDatabase = async () => {
    try {
        await pool.query('DROP TABLE IF EXISTS CustomItem');

        await pool.query(`
            CREATE TABLE CustomItem (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                cpu VARCHAR(255),
                gpu VARCHAR(255),
                motherboard VARCHAR(255),
                ram VARCHAR(255),
                storage VARCHAR(255),
                psu VARCHAR(255),
                cooling VARCHAR(255),
                os VARCHAR(255),
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