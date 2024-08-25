import { draftModeCookies, draftModeHeaders } from '@/app/draft-mode-headers'

export default function Page() {
  const cookies = draftModeCookies()?.getAll() ?? []
  const headers = Array.from(draftModeHeaders() ?? [])

  return (
    <>
      <h1>Home</h1>
      <p>Rendered at: {new Date().toISOString()}</p>
      <h2>Cookies</h2>
      <pre>{JSON.stringify(cookies, null, 2)}</pre>
      <h2>Headers</h2>
      <pre>{JSON.stringify(headers, null, 2)}</pre>
    </>
  )
}
