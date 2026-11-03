import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";

interface Props {
  event: CampusEvent;
}

export default function EventCard({ event }: Props) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: "8px", marginBottom: "15px", background: "#fff", overflow: "hidden", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
      {/* Etkinlik görseli (Eğer veri içinde image alanı varsa gösterir, yoksa varsayılan bir görsel / kutu koyar) */}
      <div style={{ width: "100%", height: "140px", background: "#eee", display: "flex", alignItems: "center", justifyContent: "center", color: "#888" }}>
        {event.image ? (
          <img src={event.image} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span>Etkinlik Görseli</span>
        )}
      </div>

      <div style={{ padding: "15px" }}>
        <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem" }}>{event.title}</h3>
        <p style={{ margin: "5px 0", color: "#666", fontSize: "0.9rem" }}><strong>Tarih:</strong> {event.date}</p>
        <p style={{ margin: "5px 0", color: "#666", fontSize: "0.9rem" }}><strong>Kategori:</strong> {event.category}</p>
        
        <Link 
          to={`/events/${event.id}`} 
          style={{ display: "inline-block", marginTop: "10px", padding: "8px 12px", background: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "4px", fontSize: "0.9rem", fontWeight: "bold" }}
        >
          Detayları Gör
        </Link>
      </div>
    </div>
  );
}