import { useEvents } from "../context/EventContext";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

export default function EventsPage() {
  const { 
    filteredEvents, searchText, setSearchText, 
    category, setCategory, categories 
  } = useEvents();

  return (
    <section style={{ padding: "20px" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Tüm Etkinlikler</h2>
      <EventFilter 
        searchText={searchText} category={category} categories={categories} 
        onSearchChange={setSearchText} onCategoryChange={setCategory} 
      />
      <EventList 
        events={filteredEvents} onShowDetail={() => {}} 
        emptyText="Aradığınız kritere uygun etkinlik bulunamadı." 
      />
      <div style={{ marginTop: "15px", color: "#666", fontWeight: "bold" }}>
        {filteredEvents.length} etkinlik listeleniyor.
      </div>
    </section>
  );
}