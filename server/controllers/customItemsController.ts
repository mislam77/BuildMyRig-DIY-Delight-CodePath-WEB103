import { pool } from '../config/database';
import { Request, Response } from 'express';

export const getCustomItems = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM CustomItem');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get custom items' });
    }
};

export const createCustomItem = async (req: Request, res: Response) => {
    const { cpu, gpu, motherboard, ram, storage, psu, cooling, os, total_price } = req.body;
    const query = `
        INSERT INTO CustomItem (cpu, gpu, motherboard, ram, storage, psu, cooling, os, total_price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
    `;
    const values = [cpu, gpu, motherboard, ram, storage, psu, cooling, os, total_price];

    try {
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create custom item' });
    }
};

export const updateCustomItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { cpu, gpu, motherboard, ram, storage, psu, cooling, os, total_price } = req.body;
    const query = `
        UPDATE CustomItem
        SET cpu = $1, gpu = $2, motherboard = $3, ram = $4, storage = $5, psu = $6, cooling = $7, os = $8, total_price = $9
        WHERE id = $10
        RETURNING *;
    `;
    const values = [cpu, gpu, motherboard, ram, storage, psu, cooling, os, total_price, id];

    try {
        const result = await pool.query(query, values);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update custom item' });
    }
};

export const deleteCustomItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = 'DELETE FROM CustomItem WHERE id = $1 RETURNING *;';
    const values = [id];

    try {
        const result = await pool.query(query, values);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete custom item' });
    }
};