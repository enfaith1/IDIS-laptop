import express from 'express';
import { db } from '../db';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
