import { draftModeCookies } from '@/app/draftModeCookies'

export default function Page({ params }: { params: { id: string } }) {
  const cookies = draftModeCookies()?.getAll() ?? []

  return (
    <>
      <h1>Entity {params.id}</h1>
      <p>Rendered at {new Date().toISOString()}</p>
      <h2>Cookies</h2>
      <pre>{JSON.stringify(cookies, null, 2)}</pre>
    </>
  )
}
