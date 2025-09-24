// src/lib/supabase.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase configuration missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
