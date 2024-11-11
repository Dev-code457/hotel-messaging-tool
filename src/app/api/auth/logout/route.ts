import { NextResponse } from 'next/server';  // Correct import for App Router
import { serialize } from 'cookie';


export async function POST() {
    try {


        // Clear the session cookie by setting an expiration date in the past
        const headers = new Headers();
        headers.set('Set-Cookie', serialize('__session', '', {
            path: '/',
            expires: new Date(0), // Expire the cookie immediately
            httpOnly: true, // Prevent client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Ensure it's secure in production
            sameSite: 'strict', // Prevent CSRF attacks
        }));

        // Respond with a success message
        return NextResponse.json({ message: 'Logged out successfully' }, { status: 200, headers });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ message: 'An error occurred while logging out' }, { status: 500 });
    }
}
