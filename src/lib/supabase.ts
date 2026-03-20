// import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// function getSupabaseEnv() {
//   const url =
//     process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL ?? "";
//   const anonKey =
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
//     process.env.SUPABASE_ANON_KEY ??
//     "";

//   return { url, anonKey };
// }

// let client: SupabaseClient | null = null;

// export function getSupabase() {
//   const { url, anonKey } = getSupabaseEnv();

//   if (!url || !anonKey) {
//     return null;
//   }

//   if (!client) {
//     client = createClient(url, anonKey);
//   }

//   return client;
// }
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error("❌ Missing Supabase env variables", {
      hasUrl: !!url,
      hasAnonKey: !!anonKey,
    });
    return null;
  }

  return createClient(url, anonKey);
}