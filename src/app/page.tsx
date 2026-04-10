"use client";

import { useEffect, useState } from "react";

type Status = "ok" | "error" | "unconfigured" | "local" | "loading";

interface Health {
  nextjs: Status;
  supabase: Status;
  vercel: Status;
  github: Status;
}

const INTEGRATIONS: { key: keyof Health; name: string; icon: string }[] = [
  { key: "nextjs", name: "Next.js 15", icon: "▲" },
  { key: "supabase", name: "Supabase", icon: "⚡" },
  { key: "vercel", name: "Vercel", icon: "◆" },
  { key: "github", name: "GitHub", icon: "◎" },
];

const STATUS_ICON: Record<Status, string> = {
  ok: "✓",
  error: "✗",
  unconfigured: "—",
  local: "~",
  loading: "…",
};

export default function Home() {
  const [health, setHealth] = useState<Health>({
    nextjs: "loading",
    supabase: "loading",
    vercel: "loading",
    github: "loading",
  });

  const [checkedAt, setCheckedAt] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then((data) => {
        setHealth(data);
        setCheckedAt(
          new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            dateStyle: "short",
            timeStyle: "short",
          })
        );
      });
  }, []);

  return (
    <main className="container">
      <div className="badge">Nucleo IA · SOITIC</div>

      <h1>Hello, World!</h1>

      <p className="subtitle">
        Projeto de teste de integração.
        <br />
        Status verificado em tempo real.
      </p>

      <div className="integrations">
        {INTEGRATIONS.map(({ key, name, icon }) => {
          const status = health[key];
          return (
            <div key={key} className={`chip ${status}`}>
              <span>{icon}</span>
              <span>{name}</span>
              <span>{STATUS_ICON[status]}</span>
            </div>
          );
        })}
      </div>

      <div className="footer">
        Deploy automático via GitHub → Vercel &nbsp;·&nbsp; Dados via Supabase
        {checkedAt && (
          <>
            <br />
            <span style={{ opacity: 0.5 }}>Verificado em: {checkedAt}</span>
          </>
        )}
      </div>
    </main>
  );
}
