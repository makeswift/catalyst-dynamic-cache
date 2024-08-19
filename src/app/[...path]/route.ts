import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

async function getEntityId(request: NextRequest): Promise<string | null> {
  if (request.nextUrl.pathname === '/entity-foo') return 'foo'

  return null
}

export const dynamic = 'force-static'

export async function GET(request: NextRequest): Promise<Response> {
  console.log({
    draftModeIsEnabled: draftMode().isEnabled,
    requestHeaders: Object.fromEntries(request.headers.entries()),
  })

  const entityId = await getEntityId(request)

  if (entityId == null) return notFound()

  const url = request.nextUrl.clone()
  url.pathname = `/entity/${entityId}`

  const response = await fetch(url, { headers: request.headers })
  const headers = new Headers(response.headers)

  if (headers.has('content-encoding')) {
    headers.delete('content-encoding')
    headers.delete('content-length')
  }

  return new Response(response.body, { headers, status: response.status })
}
