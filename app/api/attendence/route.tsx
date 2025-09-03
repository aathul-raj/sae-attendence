import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    // Server-side validation
    if (!name || !email || typeof name !== 'string' || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid data format provided.' }, { status: 400 });
    }

    // Sanitize the email to use as a key
    const userKey = `user:${email.toLowerCase().trim()}`;
    
    // Create a data object to store
    const userData = {
      name: name,
      email: email,
      lastSeenAt: new Date().toISOString(),
    };

    // Use `kv.set` to store the user data.
    // This will create a new entry or overwrite an existing one for the same email.
    await kv.set(userKey, JSON.stringify(userData));

    return NextResponse.json({ 
      message: 'Attendance recorded successfully.', 
      data: userData
    }, { status: 201 });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

