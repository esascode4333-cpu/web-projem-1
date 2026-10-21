import type { CampusEvent } from "../../types/campus-event";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
}

function EventDetail({ event, onBack }: EventDetailProps) {
  return (
    <section className="form-kapsayici">
      <button 
        onClick={onBack} 
        className="detay-butonu"
        style={{ marginBottom: "20px", marginTop: "0" }}
      >
        ← Geri Dön
      </button>
      
      <h2 style={{ color: "#8a1538" }}>{event.title}</h2>
      
      {event.image && (
        <img 
          src={event.image} 
          alt={event.title} 
          style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" }}
        />
      )}
      
      <p><strong>Kategori:</strong> {event.category}</p>
      <p><strong>Tarih ve Saat:</strong> {event.date} - {event.time}</p>
      <p><strong>Konum:</strong> {event.location}</p>
      
      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f4f5f7", borderRadius: "5px" }}>
        <h4>Etkinlik Hakkında</h4>
        <p>{event.description}</p>
      </div>
    </section>
  );
}

export default EventDetail;