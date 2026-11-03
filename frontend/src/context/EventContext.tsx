import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type { CampusEvent } from "../types/campus-event";

interface EventContextType {
  eventsList: CampusEvent[];
  setEventsList: React.Dispatch<React.SetStateAction<CampusEvent[]>>;
  searchText: string;
  setSearchText: (text: string) => void;
  category: string;
  setCategory: (cat: string) => void;
  categories: string[];
  selectedEventId: string | null;
  setSelectedEventId: (id: string | null) => void;
  filteredEvents: CampusEvent[];
  upcomingEvents: CampusEvent[];
  selectedEvent: CampusEvent | undefined;
  deleteEvent: (id: string) => void;
  updateEvent: (updatedEvent: CampusEvent) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [eventsList, setEventsList] = useState<CampusEvent[]>(() => {
    try {
      const kayitliVeri = localStorage.getItem("kampusEtkinlikleri");
      return kayitliVeri ? JSON.parse(kayitliVeri) : initialEvents;
    } catch (error) {
      return initialEvents;
    }
  });

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("Tümü");
  const categories = ["Tümü", "Seminer", "Atölye", "Söyleşi", "Yarışma"];
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("kampusEtkinlikleri", JSON.stringify(eventsList));
  }, [eventsList]);

  // SİLME VE ONAY MATIĞI
  const deleteEvent = (id: string) => {
    const isConfirmed = window.confirm("Bu etkinliği silmek istediğinize emin misiniz?");
    if (isConfirmed) {
      setEventsList(eventsList.filter(event => event.id !== id));
    }
  };

  // GÜNCELLEME MANTIĞI
  const updateEvent = (updatedEvent: CampusEvent) => {
    setEventsList(eventsList.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const selectedEvent = selectedEventId ? eventsList.find(e => e.id === selectedEventId) : undefined;
  const filteredEvents = eventsList.filter((event) => {
    const textMatch = event.title.toLowerCase().includes(searchText.toLowerCase());
    const categoryMatch = category === "Tümü" || event.category === category;
    return textMatch && categoryMatch;
  });
  const upcomingEvents = eventsList.slice(0, 3);

  return (
    <EventContext.Provider
      value={{
        eventsList, setEventsList, searchText, setSearchText, category, setCategory,
        categories, selectedEventId, setSelectedEventId, filteredEvents, upcomingEvents,
        selectedEvent, deleteEvent, updateEvent
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEvents must be used within an EventProvider");
  return context;
};