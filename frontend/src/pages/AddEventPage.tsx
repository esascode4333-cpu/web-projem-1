import { useNavigate } from "react-router-dom";
import { useEvents } from "../context/EventContext";
import EventForm from "../components/events/EventForm";

export default function AddEventPage() {
  const { eventsList, setEventsList } = useEvents();
  const navigate = useNavigate();

  return (
    <section style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Yeni Etkinlik Ekle</h2>
      <EventForm onAdd={(newEvent) => {
        setEventsList([newEvent, ...eventsList]);
        alert("Etkinlik başarıyla eklendi!");
        navigate("/admin");
      }} />
    </section>
  );
}