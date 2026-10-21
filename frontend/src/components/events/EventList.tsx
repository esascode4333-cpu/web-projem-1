import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard"; // Adım 5'teki kartımızı içeri aktardık

interface EventListProps {
  events: CampusEvent[];
  onShowDetail: (id: string) => void;
  emptyText?: string;
}

function EventList({ events, onShowDetail, emptyText = "Etkinlik bulunamadı." }: EventListProps) {
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
          onShowDetail={onShowDetail} 
        />
      ))}
    </div>
  );
}

export default EventList;