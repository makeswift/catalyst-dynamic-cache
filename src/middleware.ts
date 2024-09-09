import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest): Promise<Response> {
  const dynamic = request.nextUrl.searchParams.has('dynamic')

  if (!dynamic) return NextResponse.next()

  const to = new URL(request.nextUrl.pathname + request.nextUrl.search, request.nextUrl.origin)
  to.searchParams.delete('dynamic')
  const proxyUrl = new URL('/api/draft/proxy', request.nextUrl.origin)
  proxyUrl.searchParams.set('to', to.href)
  const proxyHeaders = new Headers(request.headers)
  proxyHeaders.delete('connection')

  return fetch(proxyUrl, { headers: proxyHeaders })
}
