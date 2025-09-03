import { Pool } from 'pg';
import { NextResponse } from 'next/server';

// Initialize the connection pool from the environment variable
// Vercel will automatically provide the POSTGRES_URL environment variable
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false // Required for Vercel Postgres
  }
});

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    // Server-side validation
    if (!name || !email || typeof name !== 'string' || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid data format provided.' }, { status: 400 });
    }

    const client = await pool.connect();
    try {
      // Use INSERT with ON CONFLICT to prevent duplicate emails.
      // If an email already exists, it updates the name and timestamp.
      await client.query(
        `
        INSERT INTO attendance (name, email)
        VALUES ($1, $2)
        ON CONFLICT (email)
        DO UPDATE SET name = EXCLUDED.name, created_at = CURRENT_TIMESTAMP;
        `,
        [name, email]
      );

      return NextResponse.json({ 
        message: 'Attendance recorded successfully.'
      }, { status: 201 });

    } finally {
      client.release();
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

