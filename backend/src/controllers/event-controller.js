import { events } from "../data/events.js";

// GET /events (Tüm listeyi getirir, ?category=... varsa filtreler)
export function getEvents(req, res) {
  const { category } = req.query;
  const list = category
    ? events.filter(e => e.category === category)
    : events;
  res.json(list);
}

// GET /events/:id (Tek etkinliği getirir, bulamazsa 404 döner)
export function getEventById(req, res) {
  const event = events.find(e => e.id === req.params.id);
  
  if (!event) {
    return res.status(404).json({ error: { message: "Event not found" } });
  }
  
  res.json(event);
}


// POST /events (Yeni etkinlik ekle; başarılıysa 201, eksikse 400)
export function createEvent(req, res) {
  const { title, category, capacity, date, time, location, description } = req.body ?? {};

  // Hoca kuralı: title, category ve date zorunlu!
  if (!title || !category || !date) {
    return res.status(400).json({ 
      error: { message: "title, category and date are required" } 
    });
  }

  const newEvent = {
    id: `event-${Date.now()}`, // Benzersiz bir ID uyduruyoruz
    title,
    category,
    capacity: Number(capacity) || 0,
    date,
    time: time ?? "",
    location: location ?? "",
    description: description ?? ""
  };

  events.push(newEvent); // Bellekteki listeye ekle
  res.status(201).json(newEvent); // 201 Created koduyla geri döndür
}