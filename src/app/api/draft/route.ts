import { draftMode } from 'next/headers'

export async function GET(): Promise<Response> {
  draftMode().enable()

  return new Response('Draft mode is enabled')
}
