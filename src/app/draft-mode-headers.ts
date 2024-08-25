import { cookies, draftMode, headers } from 'next/headers'

export function draftModeCookies(): ReturnType<typeof cookies> | null {
  const draft = draftMode().isEnabled

  if (draft) return cookies()

  return null
}

export function draftModeHeaders(): ReturnType<typeof headers> | null {
  const draft = draftMode().isEnabled

  if (draft) return headers()

  return null
}
