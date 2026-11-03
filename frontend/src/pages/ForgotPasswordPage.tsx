import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Geçerli bir e-posta girin.");
      setSent(false);
    } else {
      setError("");
      setSent(true);
    }
  };

  return (
    <section style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ color: "#333", marginBottom: "10px" }}>Şifremi Unuttum</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      
      {sent ? (
        <div style={{ padding: "15px", background: "#d4edda", color: "#155724", borderRadius: "5px", marginBottom: "15px" }}>
          Bağlantı <strong>{email}</strong> adresine gönderildi (demo).
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }} noValidate>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>E-posta</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: error ? "1px solid red" : "1px solid #ccc", boxSizing: "border-box" }} />
            {error && <span style={{ color: "red", fontSize: "0.85em" }}>{error}</span>}
          </div>
          <button type="submit" style={{ padding: "12px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Bağlantı Gönder</button>
        </form>
      )}
      <div style={{ marginTop: "15px", fontSize: "0.9em" }}>
        <Link to="/login" style={{ color: "#2196F3", textDecoration: "none" }}>← Girişe dön</Link>
      </div>
    </section>
  );
}