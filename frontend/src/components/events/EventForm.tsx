import React, { useState } from "react";
import type { Category, CampusEvent } from "../../types/campus-event";

interface EventFormProps {
  onAdd: (newEvent: CampusEvent) => void;
}

function EventForm({ onAdd }: EventFormProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<Category>("Seminer");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    onAdd(newEvent);

    setNewTitle("");
    setNewCategory("Seminer");
    setNewDate("");
    setNewTime("");
    setNewLocation("");
    setNewDescription("");
    setIsSubmitted(false); 
  };

  return (
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
  );
}

export default EventForm;