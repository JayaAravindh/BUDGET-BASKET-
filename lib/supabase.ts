
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Missing Supabase URL or publishable key. Check your .env.local file."
  );
}

// Create one shared browser client.
// The same browser session can be reused across the application.
export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);
