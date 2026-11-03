import { useNavigate } from "react-router-dom";
import { useEvents } from "../../context/EventContext";
import type { CampusEvent } from "../../types/campus-event";

interface Props {
  event: CampusEvent;
  onBack: () => void;
}

export default function EventDetail({ event, onBack }: Props) {
  const { deleteEvent } = useEvents();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate("/events");
  };

  return (
    <section style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={onBack} style={{ marginBottom: "20px", padding: "8px 12px", cursor: "pointer" }}>
        ← Listeye Dön
      </button>
      
      <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", border: "1px solid #ddd" }}>
        <h2 style={{ marginTop: 0 }}>{event.title}</h2>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Tarih:</strong> {event.date}</p>
        <p><strong>Açıklama:</strong> {event.description}</p>
        
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button 
            onClick={() => navigate(`/edit/${event.id}`)}
            style={{ padding: "10px 15px", background: "#2196F3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            ✏️ Düzenle
          </button>
          <button 
            onClick={handleDelete}
            style={{ padding: "10px 15px", background: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
          >
            🗑️ Sil
          </button>
        </div>
      </div>
    </section>
  );
}