import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="etkinlik-karti">
      {event.image && (
        <img 
          src={event.image} 
          alt={event.title} 
          style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px", marginBottom: "15px" }}
        />
      )}
      <h3>{event.title}</h3>
      <p>{event.category}</p>
      {/* Adım 1'de oluşturduğumuz formatDate fonksiyonunu burada kullanıyoruz */}
      <p>Tarih: {formatDate(event.date)}, {event.time}</p>
      <p>Yer: {event.location}</p>
      <button onClick={() => onShowDetail(event.id)} className="detay-butonu">
        Detayları Gör
      </button>
    </article>
  );
}

export default EventCard;