export default function Home() {
  const integrations = [
    { name: "Next.js 15", status: "ok", icon: "▲" },
    { name: "Supabase", status: "ok", icon: "⚡" },
    { name: "Vercel", status: "ok", icon: "◆" },
    { name: "GitHub", status: "ok", icon: "◎" },
  ];

  return (
    <main className="container">
      <div className="badge">Nucleo IA · SOITIC</div>

      <h1>Hello, World!</h1>

      <p className="subtitle">
        Projeto de teste de integração.<br />
        Todas as integrações estão operacionais.
      </p>

      <div className="integrations">
        {integrations.map((item) => (
          <div key={item.name} className={`chip ${item.status}`}>
            <span>{item.icon}</span>
            <span>{item.name}</span>
            <span>{item.status === "ok" ? "✓" : "…"}</span>
          </div>
        ))}
      </div>

      <div className="footer">
        Deploy automático via GitHub → Vercel &nbsp;·&nbsp; Dados via Supabase
      </div>
    </main>
  );
}
