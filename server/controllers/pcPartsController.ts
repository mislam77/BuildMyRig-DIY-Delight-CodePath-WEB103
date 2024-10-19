import { Request, Response } from 'express';
import { getPcParts } from '../services/pcparts-api';

export const getAllPcParts = (req: Request, res: Response) => {
    try {
        const pcParts = getPcParts();
        res.status(200).json(pcParts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get PC parts' });
    }
};