import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { upcomingEvents } = useEvents();

  return (
    <section style={{ padding: "20px" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Yaklaşan Etkinlikler</h2>
      {/* EventList bileşenimiz eski prop'ları (onShowDetail) istiyorsa diye boş fonksiyon gönderiyoruz */}
      <EventList events={upcomingEvents} onShowDetail={() => {}} />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Link to="/events" style={{ padding: "10px 20px", background: "#4CAF50", color: "white", textDecoration: "none", borderRadius: "5px", fontWeight: "bold" }}>
          Tüm Etkinlikleri Gör
        </Link>
      </div>
    </section>
  );
}