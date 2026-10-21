import { useState, useEffect } from "react";
import { events as initialEvents } from "./data/events";
import type { CampusEvent } from "./types/campus-event";
import "./App.css";
import type { PageName } from "./types/page";

// Parçaladığımız tüm bileşenler
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetails";
import EventForm from "./components/events/EventForm";

function App() {
  const [currentPage, setCurrentPage] = useState<PageName>("home");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Etkinlik listesini başlatırken tarayıcı hafızasına (localStorage) bakıyoruz
  const [eventsList, setEventsList] = useState<CampusEvent[]>(() => {
    const kayitliVeri = localStorage.getItem("kampusEtkinlikleri");
    if (kayitliVeri) {
      return JSON.parse(kayitliVeri);
    }
    return initialEvents;
  });

  // Filtreleme Stateleri
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("Tümü");
  const categories = ["Tümü", "Seminer", "Atölye", "Söyleşi", "Yarışma"];

  // Değişiklikleri otomatik kaydet (useEffect)
  useEffect(() => {
    localStorage.setItem("kampusEtkinlikleri", JSON.stringify(eventsList));
  }, [eventsList]);

  const selectedEvent = selectedEventId ? eventsList.find(e => e.id === selectedEventId) : undefined;

  // --- HOCANIN İSTEDİĞİ: TARAYICI SEKME (TAB) ADINI DİNAMİK YAPMA ---
  useEffect(() => {
    if (currentPage === "detail" && selectedEvent) {
      document.title = selectedEvent.title;
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [currentPage, selectedEvent]);

  // Sayfa değiştirme fonksiyonu
  const handleNavigate = (page: PageName) => {
    setCurrentPage(page);
    if (page !== "detail") {
      setSelectedEventId(null);
    }
  };

  // --- SAYFAYA GÖRE DİNAMİK BAŞLIK BELİRLEME ---
  let headerTitle = "Kampüs Etkinlikleri";
  if (currentPage === "home") {
    headerTitle = "Ana Sayfa - Yaklaşan Etkinlikler";
  } else if (currentPage === "events") {
    headerTitle = "Tüm Kampüs Etkinlikleri";
  } else if (currentPage === "detail" && selectedEvent) {
    headerTitle = selectedEvent.title;
  } else if (currentPage === "add") {
    headerTitle = "Yeni Etkinlik Oluştur";
  }

  // Filtreleme Matematiği
  const filteredEvents = eventsList.filter((event) => {
    const textMatch = event.title.toLowerCase().includes(searchText.toLowerCase()) || 
                      event.description.toLowerCase().includes(searchText.toLowerCase());
    const categoryMatch = category === "Tümü" || event.category === category;
    
    return textMatch && categoryMatch;
  });

  const upcomingEvents = eventsList.slice(0, 3);

  const handleDetailClick = (id: string) => {
    setSelectedEventId(id);
    setCurrentPage("detail");
  };

  return (
    <>
      {/* Üst başlık artık hangi sayfada olduğuna göre dinamik değişiyor */}
      <Header title={headerTitle} />

      {/* Navigasyon çubuğu ve seçilen etkinliğin adı */}
      <Navigation 
      current={currentPage} 
      onNavigate={handleNavigate} 
      selectedEventTitle={selectedEvent?.title}
      />
      
      <main>
        {/* ANA SAYFA */}
        {currentPage === "home" && (
          <section>
            <h2 style={{ color: "#333" }}>Yaklaşan Etkinlikler</h2>
            <EventList 
              events={upcomingEvents} 
              onShowDetail={handleDetailClick} 
            />
          </section>
        )}

        {/* ETKİNLİKLER SAYFASI */}
        {currentPage === "events" && (
          <section>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Tüm Etkinlikler</h2>
            
            <EventFilter 
              searchText={searchText} 
              category={category} 
              categories={categories} 
              onSearchChange={setSearchText} 
              onCategoryChange={setCategory} 
            />

            <EventList 
              events={filteredEvents} 
              onShowDetail={handleDetailClick} 
              emptyText="Aradığınız kritere uygun etkinlik bulunamadı." 
            />

            <div className="etkinlik-sayisi" style={{ marginTop: "15px", color: "#666" }}>
              {filteredEvents.length} etkinlik listeleniyor.
            </div>
          </section>
        )}

        {/* DETAY SAYFASI */}
        {currentPage === "detail" && selectedEvent && (
          <EventDetail 
            event={selectedEvent} 
            onBack={() => handleNavigate("events")} 
          />
        )}

        {/* EKLEME SAYFASI */}
        {currentPage === "add" && (
          <EventForm 
            onAdd={(newEvent) => {
              setEventsList([newEvent, ...eventsList]);
              alert("Etkinlik başarıyla eklendi!");
              setCurrentPage("events");
            }} 
          />
        )}
      </main>
      
      <Footer />
    </>
  );
}

export default App;