import { cookies, draftMode } from 'next/headers'

export function draftModeCookies(): ReturnType<typeof cookies> | null {
  const draft = draftMode().isEnabled

  if (draft) return cookies()

  return null
}
