// src/lib/supabase.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Validate environment variables
if (
  !supabaseUrl ||
  !supabaseAnonKey ||
  supabaseUrl === "https://example.supabase.co"
) {
  console.warn("Supabase configuration missing or using placeholder values");
}

export const supabase =
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://example.supabase.co"
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;
