import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import EventDetail from "../components/events/EventDetails";
import NotFoundPage from "../pages/NotFoundPage";

export default function EventDetailPage() {
  const { id } = useParams(); // URL'den ID'yi alıyoruz (Adım 4)
  const navigate = useNavigate();
  const { eventsList } = useEvents();
  
  const event = eventsList.find(e => e.id === id);

  if (!event) return <NotFoundPage />;

  return (
    <section style={{ padding: "20px" }}>
      <EventDetail event={event} onBack={() => navigate("/events")} />
    </section>
  );
}