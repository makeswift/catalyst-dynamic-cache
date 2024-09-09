import { cookies, draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest): Promise<Response> {
  draftMode().enable()
  const prerenderBypass = cookies().get('__prerender_bypass')?.value
  // TODO(miguel): While we're disabling Draft Mode, this will still send a `Set-Cookie` header
  // clearing the cookie, something that might be undersirable if we were purposefully in Draft
  // Mode.
  draftMode().disable()

  if (prerenderBypass == null) throw new Error('Prerender bypass cookie not found')

  const to = request.nextUrl.searchParams.get('to')

  if (to == null) throw new Error('Missing "to" query parameter')

  const proxyUrl = new URL(to)
  const proxyRequest = new NextRequest(proxyUrl)
  proxyRequest.cookies.set('__prerender_bypass', prerenderBypass)

  const proxyResponse = await fetch(proxyRequest, proxyRequest)
  const proxyResponseHeaders = new Headers(proxyResponse.headers)

  if (proxyResponseHeaders.has('content-encoding')) {
    proxyResponseHeaders.delete('content-encoding')
    proxyResponseHeaders.delete('content-length')
  }

  return new Response(proxyResponse.body, { headers: proxyResponseHeaders })
}
