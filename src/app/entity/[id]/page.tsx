import { draftMode, headers } from 'next/headers'

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <h1> Entity {params.id}</h1>
      <p>Rendered at {new Date().toISOString()}</p>
      <p>Draft Mode: {draftMode().isEnabled ? 'enabled' : 'disabled'}</p>
    </>
  )
}
