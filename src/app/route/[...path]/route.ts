import { NextRequest } from 'next/server'

export const dynamic = 'force-static'

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } },
): Promise<Response> {
  const entityId = params.path.join('/') // get entity ID asynchronously here

  const response = await fetch(new URL(`/entity/${entityId}`, request.nextUrl.origin), {
    headers: new Headers(request.headers),
  })
  const headers = new Headers(response.headers)

  if (headers.has('content-encoding')) {
    headers.delete('content-encoding')
    headers.delete('content-length')
  }

  return new Response(response.body, { headers, status: response.status })
}
