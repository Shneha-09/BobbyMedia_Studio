import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  const { username, password } = await req.json();

  const inputUsername = String(username || '').trim();
  const inputPassword = String(password || '').trim();

  const adminUsername = String(process.env.ADMIN_USERNAME || '').trim();
  const adminPassword = String(process.env.ADMIN_PASSWORD || '').trim();

  if (inputUsername !== adminUsername || inputPassword !== adminPassword) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }

  const token = signToken({ username: inputUsername, role: 'admin' });

  const res = NextResponse.json({ success: true });

  res.cookies.set('admin_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return res;
}