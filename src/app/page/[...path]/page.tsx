import EntityPage from '@/app/entity/[id]/page'

export function generateStaticParams() {
  return []
}

export default async function Page() {
  const entityId = 'foo' // get entity ID asynchronously here

  return <EntityPage params={{ id: entityId }} />
}
