import Link from "next/link"

export default function Index() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "2rem",
        background: "#020617",
        color: "#e5e7eb",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-orbitron)",
          fontSize: "1.75rem",
          marginBottom: "1rem",
          background: "linear-gradient(90deg,#F2C14E,#00A676,#00B4D8)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        OpsVantage Digital
      </h1>

      <p style={{ maxWidth: 480, marginBottom: "1.5rem", opacity: 0.85 }}>
        Welcome to the OpsVantage AI Explainer Engine.  
        Click below to enter the application.
      </p>

      <Link
        href="/app"
        style={{
          padding: "0.6rem 1.4rem",
          borderRadius: "999px",
          background:
            "linear-gradient(90deg,#003B73,#00A676,#F2C14E)",
          color: "#020617",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Open App
      </Link>
    </main>
  )
}
