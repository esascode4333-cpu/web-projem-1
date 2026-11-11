import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

function EventList({ events, emptyText = "Etkinlik bulunamadı." }: EventListProps) {
  // Eğer liste boşsa sadece mesaj döndür
  if (events.length === 0) {
    return <p>{emptyText}</p>;
  }

  // Liste doluysa kartları grid içine yerleştir
  return (
    <div className="etkinlik-listesi">
      {events.map((event) => (
        <EventCard 
          key={event.id} 
          event={event} 
        />
      ))}
    </div>
  );
}

export default EventList;