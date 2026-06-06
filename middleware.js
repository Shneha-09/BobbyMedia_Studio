import {NextResponse} from 'next/server';
export function middleware(req){const token=req.cookies.get('admin_token')?.value;if(req.nextUrl.pathname.startsWith('/admin/dashboard')&&!token){return NextResponse.redirect(new URL('/admin/login',req.url))}return NextResponse.next()}
export const config={matcher:['/admin/dashboard/:path*']};
