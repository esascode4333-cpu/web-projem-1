import { Link, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";

export default function AdminPage() {
  const { eventsList, deleteEvent } = useEvents();
  const navigate = useNavigate();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`"${title}" silinsin mi?`)) {
      deleteEvent(id);
    }
  };

  return (
    <section style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Etkinlik Yönetimi</h2>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/admin/new" style={{ padding: "10px 15px", background: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "5px", fontWeight: "bold" }}>
          + Yeni Etkinlik
        </Link>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <thead>
          <tr style={{ background: "#689f38", color: "white" }}>
            <th style={{ padding: "12px" }}>Etkinlik Adı</th>
            <th style={{ padding: "12px" }}>Tarih</th>
            <th style={{ padding: "12px" }}>Kategori</th>
            <th style={{ padding: "12px" }}>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {eventsList.map(event => (
            <tr key={event.id} style={{ borderBottom: "1px solid #eee", background: "white" }}>
              <td style={{ padding: "12px" }}>{event.title}</td>
              <td style={{ padding: "12px" }}>{event.date}</td>
              <td style={{ padding: "12px" }}>{event.category}</td>
              <td style={{ padding: "12px", display: "flex", gap: "10px" }}>
                <button onClick={() => navigate(`/admin/${event.id}/edit`)} style={{ padding: "6px 12px", background: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Düzenle
                </button>
                <button onClick={() => handleDelete(event.id, event.title)} style={{ padding: "6px 12px", background: "#f44336", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {eventsList.length === 0 && <p style={{ marginTop: "20px", color: "#666" }}>Henüz etkinlik yok.</p>}
    </section>
  );
}