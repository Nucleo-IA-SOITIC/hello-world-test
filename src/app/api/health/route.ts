import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { error } = await supabase.from("_health").select("*").limit(1);
    return NextResponse.json({
      status: "ok",
      supabase: error ? "unreachable" : "connected",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({
      status: "ok",
      supabase: "not configured",
      timestamp: new Date().toISOString(),
    });
  }
}
