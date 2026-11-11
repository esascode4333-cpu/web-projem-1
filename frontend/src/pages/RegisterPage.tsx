import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errors, setErrors] = useState<{name?: string, email?: string, password?: string, passwordConfirm?: string}>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found: any = {};
    if (name.trim().length < 3) found.name = "Ad Soyad en az 3 karakter olmalı.";
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password !== passwordConfirm) found.passwordConfirm = "Şifreler aynı değil.";

    setErrors(found);
    if (Object.keys(found).length === 0) setSent(true);
  };

  return (
    <section style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Kayıt Ol</h2>
      {sent ? (
        <div style={{ padding: "15px", background: "#d4edda", color: "#155724", borderRadius: "5px" }}>Kayıt başarılı!</div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }} noValidate>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Ad Soyad</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: errors.name ? "1px solid red" : "1px solid #ccc", boxSizing: "border-box" }} />
            {errors.name && <span style={{ color: "red", fontSize: "0.85em" }}>{errors.name}</span>}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>E-posta</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: errors.email ? "1px solid red" : "1px solid #ccc", boxSizing: "border-box" }} />
            {errors.email && <span style={{ color: "red", fontSize: "0.85em" }}>{errors.email}</span>}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Şifre</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: errors.password ? "1px solid red" : "1px solid #ccc", boxSizing: "border-box" }} />
            {errors.password && <span style={{ color: "red", fontSize: "0.85em" }}>{errors.password}</span>}
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>Şifre (Tekrar)</label>
            <input type="password" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: errors.passwordConfirm ? "1px solid red" : "1px solid #ccc", boxSizing: "border-box" }} />
            {errors.passwordConfirm && <span style={{ color: "red", fontSize: "0.85em" }}>{errors.passwordConfirm}</span>}
          </div>
          <button type="submit" style={{ padding: "12px", background: "#673ab7", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>Kayıt Ol</button>
        </form>
      )}
      <div style={{ marginTop: "15px", textAlign: "center", fontSize: "0.9em" }}>
        <Link to="/login" style={{ color: "#2196F3", textDecoration: "none" }}>Zaten hesabın var mı? Giriş yap</Link>
      </div>
    </section>
  );
}