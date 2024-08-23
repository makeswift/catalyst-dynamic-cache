import { draftModeCookies } from './draftModeCookies'

export default function Page() {
  const cookies = draftModeCookies()?.getAll() ?? []

  return (
    <>
      <h1>Home</h1>
      <p>Rendered at: {new Date().toISOString()}</p>
      <h2>Cookies</h2>
      <pre>{JSON.stringify(cookies, null, 2)}</pre>
    </>
  )
}
