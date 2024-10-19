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
    const { name, cpu, gpu, motherboard, ram, storage, psu, cooling, os, total_price } = req.body;
    const query = `
        INSERT INTO CustomItem (name, cpu, gpu, motherboard, ram, storage, psu, cooling, os, total_price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
    `;
    const values = [
        name,
        cpu || null,
        gpu || null,
        motherboard || null,
        ram || null,
        storage || null,
        psu || null,
        cooling || null,
        os || null,
        total_price
    ];

    try {
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating custom item:', error); // Log the error
        res.status(500).json({ error: 'Failed to create custom item' });
    }
};

export const deletePartFromCustomItem = async (req: Request, res: Response) => {
    const { id, partType } = req.params;
    const query = `
        UPDATE CustomItem
        SET ${partType} = NULL
        WHERE id = $1
        RETURNING *;
    `;
    const values = [id];

    try {
        const result = await pool.query(query, values);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error deleting part from custom item:', error); // Log the error
        res.status(500).json({ error: 'Failed to delete part from custom item' });
    }
};

export const updatePartInCustomItem = async (req: Request, res: Response) => {
    const { id, partType } = req.params;
    const { newPart } = req.body;
    const query = `
        UPDATE CustomItem
        SET ${partType} = $1
        WHERE id = $2
        RETURNING *;
    `;
    const values = [newPart, id];

    try {
        const result = await pool.query(query, values);
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error updating part in custom item:', error); // Log the error
        res.status(500).json({ error: 'Failed to update part in custom item' });
    }
};