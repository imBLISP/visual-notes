import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from '@supabase/ssr'

export default async function AppMiddleware(request: NextRequest) {
  // if there's no session and the path isn't /login or /register, redirect to /login

  let supabaseResponse = NextResponse.next({
    request,
  })

  const path = request.nextUrl.pathname;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (
    !user &&
    !path.startsWith("/login") &&
    !path.startsWith("/register") &&
    !path.startsWith("/auth/saml")
  ) {
    console.log('user does not exist');
    return NextResponse.redirect(
      new URL(
        '/login', request.url
      ),
    );

    // if there's a session
  } else if (user) {
    /* Onboarding redirects

      - User was created less than a day ago
      - User is not invited to a workspace (redirect straight to the workspace)
      - The path does not start with /onboarding
      - The user has not completed the onboarding step
    */
    console.log('inside user exist block in appmiddleware');
    if (new Date(user.created_at).getTime() > Date.now() - 60 * 60 * 24 * 1000) {

      // todo: Create default workspace for user if it is not already created.
      // default workspace will not have id only default key in url.
      // once the user saves the workspace then an id will be generated.
      // then everytime appmiddleware runs we check if the user has workspace
      // this can be checked by keeping a key in the user table that will have state whether the user has workspace or not.

      // if the path is / or /login or /register, redirect to the default workspace
    } else if (
      [
        "/",
        "/login",
        "/register",
        // "/analytics",
        // "/events",
        // "/settings",
        // "/upgrade",
      ].includes(path)
    ) {
      console.log('redirecting to user dashboard');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // otherwise, rewrite the path to /app
  console.log('redirecting to homepage');
  return NextResponse.rewrite(new URL(path, request.url));
}
