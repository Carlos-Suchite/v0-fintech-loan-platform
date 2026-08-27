import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let cached: SupabaseClient | null | undefined

// Server-side client using the SERVICE ROLE key — full access, bypasses RLS.
// Never import this from a "use client" component or expose SUPABASE_SERVICE_KEY to the browser.
export function getSupabaseClient(): SupabaseClient | null {
  if (cached !== undefined) return cached

  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_KEY
  if (!url || !serviceKey) {
    cached = null
    return cached
  }

  cached = createClient(url, serviceKey, {
    auth: { persistSession: false },
  })
  return cached
}
