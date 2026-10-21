import React, { useState, useEffect } from "react";
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
  // --- 1. SÜREKLİ DEĞİŞEN VERİLER (STATE) ---
  const [currentPage, setCurrentPage] = useState<PageName>("home");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Adım 11: Etkinlik listesini başlatırken önce tarayıcı hafızasına (localStorage) bakıyoruz
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

  // --- 2. VERİLERİ KALICI YAPMA (USEEFFECT) ---
  // eventsList her değiştiğinde (yeni etkinlik eklendiğinde) tarayıcıya kaydet
  useEffect(() => {
    localStorage.setItem("kampusEtkinlikleri", JSON.stringify(eventsList));
  }, [eventsList]);

  // --- 3. FİLTRELEME MATEMATİĞİ ---
  const filteredEvents = eventsList.filter((event) => {
    const textMatch = event.title.toLowerCase().includes(searchText.toLowerCase()) || 
                      event.description.toLowerCase().includes(searchText.toLowerCase());
    const categoryMatch = category === "Tümü" || event.category === category;
    
    return textMatch && categoryMatch;
  });

  const upcomingEvents = eventsList.slice(0, 3);
  const selectedEvent = selectedEventId ? eventsList.find(e => e.id === selectedEventId) : undefined;

  // --- 4. FONKSİYONLAR ---
  const handleDetailClick = (id: string) => {
    setSelectedEventId(id);
    setCurrentPage("detail");
  };

  // --- 5. GÖRÜNÜM (JSX) ---
  return (
    <>
      <Header title="Kampüs Etkinlikleri" />

      <Navigation 
        current={currentPage as any} 
        onNavigate={setCurrentPage} 
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
            onBack={() => setCurrentPage("events")} 
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