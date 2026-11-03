import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2 style={{ color: "#333", fontSize: "2rem" }}>Sayfa bulunamadı</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>Aradığınız sayfa ya da etkinlik yok.</p>
      <Link to="/" style={{ padding: "10px 20px", background: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "5px", fontWeight: "bold" }}>
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}