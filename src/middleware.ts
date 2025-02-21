import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let verify = request.cookies.get('token')

    if (verify) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}