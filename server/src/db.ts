import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '', 
  database: process.env.DB_NAME,
});

console.log('[DEBUG] DB_HOST:', process.env.DB_HOST);
console.log('[DEBUG] DB_USER:', process.env.DB_USER);
console.log('[DEBUG] DB_NAME:', process.env.DB_NAME);
// Test the connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('[DEBUG] Loaded DB:', process.env.DB_NAME);
    console.log('[DEBUG] Connected to MySQL ✅');
    connection.release();
  } catch (error) {
    console.error('[DEBUG] MySQL connection failed ❌:', error);
  }
})();
