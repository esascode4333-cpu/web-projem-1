import React, { useState } from "react";
import { events as initialEvents } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { Category, CampusEvent } from "./types/campus-event";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
  const [eventsList, setEventsList] = useState<CampusEvent[]>(initialEvents);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("Seminer");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const upcomingEvents = eventsList.slice(0, 3);
  const filteredEvents = searchEvents(filterByCategory(eventsList, selectedCategory), searchTerm);
  const selectedEvent = selectedEventId ? findEventById(eventsList, selectedEventId) : undefined;

  const handleDetailClick = (id: string) => {
    setSelectedEventId(id);
    setCurrentPage("detail");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsSubmitted(true); 

    if (!newTitle || !newCategory || !newDate || !newTime || !newLocation || !newDescription) {
      return; 
    }

    const newEvent: CampusEvent = {
      id: Date.now().toString(), 
      title: newTitle,
      category: newCategory,
      date: newDate,
      time: newTime,
      location: newLocation,
      description: newDescription,
      capacity: 0, 
      image: "", 
    };

    setEventsList([newEvent, ...eventsList]);

    setNewTitle("");
    setNewCategory("Seminer");
    setNewDate("");
    setNewTime("");
    setNewLocation("");
    setNewDescription("");
    setIsSubmitted(false); 

    alert("Etkinlik başarıyla eklendi!");
    setCurrentPage("events");
  };

  return (
    <>
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
        <nav className="menu">
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); }}>Ana Sayfa</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("events"); }}>Etkinlikler</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("add"); }}>Ekle</a>
        </nav>
      </header>

      <main>
        {currentPage === "home" && (
          <section>
            <h2 style={{ color: "#333" }}>Yaklaşan Etkinlikler</h2>
            <div className="etkinlik-listesi">
              {upcomingEvents.map((etkinlik) => (
                <article key={etkinlik.id} className="etkinlik-karti">
                  {/* RESİM GÖSTERME KODU EKLENDİ */}
                  {etkinlik.image && (
                    <img 
                      src={etkinlik.image} 
                      alt={etkinlik.title} 
                      style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px", marginBottom: "15px" }}
                    />
                  )}
                  <h3>{etkinlik.title}</h3>
                  <p>{etkinlik.category}</p>
                  <p>Tarih: {etkinlik.date}, {etkinlik.time}</p>
                  <p>Yer: {etkinlik.location}</p>
                  <button onClick={() => handleDetailClick(etkinlik.id)} className="detay-butonu">
                    Detayları Gör
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {currentPage === "events" && (
          <section>
            <h2 style={{ color: "#333", marginBottom: "20px" }}>Tüm Etkinlikler</h2>
            
            <div className="filtre-alani">
              <input 
                type="text" 
                placeholder="Etkinlik ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value as Category | "")}
              >
                <option value="">Tüm Kategoriler</option>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>
            </div>

            <div className="etkinlik-sayisi">
              {filteredEvents.length} etkinlik listeleniyor.
            </div>

            <div className="etkinlik-listesi">
              {filteredEvents.length === 0 ? (
                <p>Aradığınız kritere uygun etkinlik bulunamadı.</p>
              ) : (
                filteredEvents.map((etkinlik) => (
                  <article key={etkinlik.id} className="etkinlik-karti">
                    {/* RESİM GÖSTERME KODU EKLENDİ */}
                    {etkinlik.image && (
                      <img 
                        src={etkinlik.image} 
                        alt={etkinlik.title} 
                        style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px", marginBottom: "15px" }}
                      />
                    )}
                    <h3>{etkinlik.title}</h3>
                    <p>{etkinlik.category}</p>
                    <p>Tarih: {etkinlik.date}, {etkinlik.time}</p>
                    <p>Yer: {etkinlik.location}</p>
                    <button onClick={() => handleDetailClick(etkinlik.id)} className="detay-butonu">
                      Detayları Gör
                    </button>
                  </article>
                ))
              )}
            </div>
          </section>
        )}

        {currentPage === "detail" && selectedEvent && (
          <section className="form-kapsayici">
            <button 
              onClick={() => setCurrentPage("events")} 
              className="detay-butonu"
              style={{ marginBottom: "20px", marginTop: "0" }}
            >
              ← Geri Dön
            </button>
            <h2 style={{ color: "#8a1538" }}>{selectedEvent.title}</h2>
            {selectedEvent.image && (
              <img 
                src={selectedEvent.image} 
                alt={selectedEvent.title} 
                style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" }}
              />
            )}
            <p><strong>Kategori:</strong> {selectedEvent.category}</p>
            <p><strong>Tarih ve Saat:</strong> {selectedEvent.date} - {selectedEvent.time}</p>
            <p><strong>Konum:</strong> {selectedEvent.location}</p>
            <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#f4f5f7", borderRadius: "5px" }}>
              <h4>Etkinlik Hakkında</h4>
              <p>{selectedEvent.description}</p>
            </div>
          </section>
        )}

        {currentPage === "add" && (
          <section className="form-kapsayici">
            <h2 style={{ color: "#8a1538", borderBottom: "2px solid #f4f5f7", paddingBottom: "10px", marginBottom: "20px" }}>
              Yeni Etkinlik Ekle
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-satiri">
                <label>Başlık:</label>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className={isSubmitted && !newTitle ? "input-hatali" : ""} />
                {isSubmitted && !newTitle && <span className="hata-mesaji">Bu alana bilgi girilmeli</span>}
              </div>

              <div className="form-satiri">
                <label>Kategori:</label>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as Category)} className={isSubmitted && !newCategory ? "input-hatali" : ""}>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
                {isSubmitted && !newCategory && <span className="hata-mesaji">Bu alana bilgi girilmeli</span>}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <div className="form-satiri" style={{ flex: 1 }}>
                  <label>Tarih:</label>
                  <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className={isSubmitted && !newDate ? "input-hatali" : ""} />
                  {isSubmitted && !newDate && <span className="hata-mesaji">Bu alana bilgi girilmeli</span>}
                </div>
                <div className="form-satiri" style={{ flex: 1 }}>
                  <label>Saat:</label>
                  <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} className={isSubmitted && !newTime ? "input-hatali" : ""} />
                  {isSubmitted && !newTime && <span className="hata-mesaji">Bu alana bilgi girilmeli</span>}
                </div>
              </div>

              <div className="form-satiri">
                <label>Konum:</label>
                <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className={isSubmitted && !newLocation ? "input-hatali" : ""} />
                {isSubmitted && !newLocation && <span className="hata-mesaji">Bu alana bilgi girilmeli</span>}
              </div>

              <div className="form-satiri">
                <label>Açıklama:</label>
                <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} rows={4} style={{ resize: "vertical" }} className={isSubmitted && !newDescription ? "input-hatali" : ""} />
                {isSubmitted && !newDescription && <span className="hata-mesaji">Bu alana bilgi girilmeli</span>}
              </div>

              <button type="submit" className="detay-butonu" style={{ width: "100%", marginTop: "10px", padding: "12px" }}>
                Etkinliği Kaydet
              </button>
            </form>
          </section>
        )}
      </main>
    </>
  );
}

export default App;