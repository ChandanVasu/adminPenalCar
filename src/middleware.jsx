import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; 

const SECRET_KEY = new TextEncoder().encode('chendanvasu');

export async function middleware(request) {
  console.log("Middleware is working");

  // Retrieve the auth token from cookies
  const authToken = request.cookies.get('auth_token')?.value;
  console.log("Auth Token:", authToken);

  const url = request.nextUrl.clone();

  if (authToken) {
    try {
      const { payload } = await jwtVerify(authToken, SECRET_KEY);
      console.log("Decoded Token:", payload);

      // If token is valid, proceed
      return NextResponse.next();
    } catch (err) {
      console.error("Token verification failed:", err);

      // If token is invalid, redirect to login page
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  } else {
    console.log("No auth token found");

    // If no token, redirect to login page
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: '//:path*',
};
