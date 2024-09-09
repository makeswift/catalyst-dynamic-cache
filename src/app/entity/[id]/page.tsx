import { draftModeCookies, draftModeHeaders } from '@/app/draft-mode-headers'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return []
}

export default function Page({ params }: { params: { id: string } }) {
  if (params.id === 'not-found') notFound()

  const cookies = draftModeCookies()?.getAll() ?? []
  const headers = Array.from(draftModeHeaders() ?? [])

  return (
    <>
      <h1>Entity {params.id}</h1>
      <p>Rendered at {new Date().toISOString()}</p>
      <h2>Cookies</h2>
      <pre>{JSON.stringify(cookies, null, 2)}</pre>
      <h2>Headers</h2>
      <pre>{JSON.stringify(headers, null, 2)}</pre>
    </>
  )
}
