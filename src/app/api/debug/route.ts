import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Configurada" : "❌ No configurada",
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Configurada" : "❌ No configurada",
    urlValue: process.env.NEXT_PUBLIC_SUPABASE_URL || "Sin valor",
    keyValue: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Existe (oculta)" : "Sin valor",
  });
}
