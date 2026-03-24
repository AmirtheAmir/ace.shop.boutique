import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient | null = null;

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  return { url, anonKey };
}

export function getSupabase(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseEnv();

  if (!url || !anonKey) {
    console.error("Missing Supabase env variables", {
      hasUrl: !!url,
      hasAnonKey: !!anonKey,
    });
    return null;
  }

  if (typeof window !== "undefined") {
    if (!browserClient) {
      browserClient = createClient(url, anonKey);
    }

    return browserClient;
  }

  return createClient(url, anonKey);
}
