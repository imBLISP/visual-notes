import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies, type UnsafeUnwrappedCookies } from 'next/headers';

export function createClient() {
  const cookieStore = (cookies() as unknown as UnsafeUnwrappedCookies)

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch(error: any) {
            console.error('Error while creating supabase client', error.message);
          }
        },
      },
    }
  )
}