import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

async function checkSupabase() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || url.includes("placeholder")) return "unconfigured";
    const client = createClient(url, key);
    const { error } = await client.rpc("version");
    return error && error.code !== "PGRST202" ? "error" : "ok";
  } catch {
    return "error";
  }
}

async function checkGitHub() {
  try {
    const res = await fetch("https://api.github.com/repos/Nucleo-IA-SOITIC/hello-world-test", {
      headers: { Accept: "application/vnd.github.v3+json" },
      next: { revalidate: 0 },
    });
    return res.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}

function checkVercel() {
  return process.env.VERCEL === "1" ? "ok" : "local";
}

export async function GET() {
  const [supabase, github] = await Promise.all([checkSupabase(), checkGitHub()]);

  return NextResponse.json({
    nextjs: "ok",
    supabase,
    vercel: checkVercel(),
    github,
  });
}
