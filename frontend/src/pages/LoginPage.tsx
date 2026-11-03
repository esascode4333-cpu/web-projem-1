import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{email?: string, password?: string}>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found: any = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    
    setErrors(found);
    if (Object.keys(found).length === 0) setSent(true);
  };

  return (
    <section style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Giriş Yap</h2>
      {sent ? (
        <div style={{ padding: "15px", background: "#d4edda", color: "#155724", borderRadius: "5px" }}>Geçerli giriş Sprint 10'da</div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }} noValidate>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>E-posta</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: errors.email ? "1px solid red" : "1px solid #ccc", boxSizing: "border-box" }} />
            {errors.email && <span style={{ color: "red", fontSize: "0.85em" }}>{errors.email}</span>}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Şifre</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: errors.password ? "1px solid red" : "1px solid #ccc", boxSizing: "border-box" }} />
            {errors.password && <span style={{ color: "red", fontSize: "0.85em" }}>{errors.password}</span>}
          </div>
          <button type="submit" style={{ padding: "12px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Giriş Yap</button>
        </form>
      )}
      <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between", fontSize: "0.9em" }}>
        <Link to="/forgot-password" style={{ color: "#2196F3", textDecoration: "none" }}>Şifremi unuttum</Link>
        <Link to="/register" style={{ color: "#2196F3", textDecoration: "none" }}>Hesabın yok mu? Kayıt ol</Link>
      </div>
    </section>
  );
}