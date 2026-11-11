import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import { useEffect } from "react";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { eventsList } = useEvents();
useEffect(() => {
    document.title = "Etkinlik Detay| Kampüs Etkinlikleri";
  }, []);
  const event = eventsList.find((e) => String(e.id) === String(id));

  if (!event) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "white" }}>
        <h2>Etkinlik bulunamadı!</h2>
        <button onClick={() => navigate("/events")} style={{ marginTop: "15px", padding: "8px 16px", cursor: "pointer" }}>
          ← Listeye Dön
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto", color: "#333" }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: "20px", padding: "8px 15px", background: "#666", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
      >
        ← Listeye Dön
      </button>

      <div style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h2 style={{ marginTop: 0, color: "#222" }}>{event.title}</h2>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Tarih:</strong> {event.date}</p>
        <p style={{ marginTop: "20px", lineHeight: "1.6" }}><strong>Açıklama:</strong> {event.description}</p>
      </div>
    </div>
  );
}
