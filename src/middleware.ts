import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const dynamic = request.nextUrl.searchParams.has('dynamic')

  if (!dynamic) return NextResponse.next()

  const draftModeResponse = await fetch(new URL('/api/draft', request.nextUrl.origin))
  const prerenderBypass = draftModeResponse.headers
    .getSetCookie()
    .map((cookie) => cookie.split(';').at(0))
    .filter((cookie) => cookie != null)
    .map((cookie) => cookie.trim().split('='))
    .find(([key, value]) => key === '__prerender_bypass')
    ?.at(1)

  if (prerenderBypass == null) throw new Error('Prerender bypass cookie not found')

  const headers = new Headers(request.headers)
  const cookie =
    headers
      .get('cookie')
      ?.split(';')
      .map((cookie) => cookie.trim()) ?? []

  headers.set('cookie', [...cookie, `__prerender_bypass=${prerenderBypass}`].join('; '))

  return NextResponse.next({ request: { headers } })
}
