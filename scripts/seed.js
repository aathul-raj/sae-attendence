import { Pool } from 'pg';
import { config } from 'dotenv';

// Load environment variables from .env.local
config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function createTable() {
  const client = await pool.connect();
  try {
    // The IF NOT EXISTS clause prevents an error if the table already exists.
    await client.query(`
      CREATE TABLE IF NOT EXISTS attendance (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Table "attendance" created or already exists.');
  } catch (err) {
    console.error('❌ Error creating table:', err);
  } finally {
    await client.end();
    await pool.end();
  }
}

createTable();
