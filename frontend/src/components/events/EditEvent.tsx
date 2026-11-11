import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEvents } from "../../context/EventContext";
import type { CampusEvent } from "../../types/campus-event";

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { eventsList, updateEvent } = useEvents();
  
  const [formData, setFormData] = useState<CampusEvent | null>(null);

  useEffect(() => {
    const eventToEdit = eventsList.find(e => e.id === id);
    if (eventToEdit) setFormData(eventToEdit);
    else navigate("/events");
  }, [id, eventsList, navigate]);

  if (!formData) return <div style={{textAlign: "center", padding: "50px"}}>Yükleniyor...</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEvent(formData);
    alert("Etkinlik başarıyla güncellendi!");
    navigate("/events");
  };

  return (
    <section style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#333", marginBottom: "20px" }}>Etkinlik Güncelle</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input 
          type="text" value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})} required 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <select 
          value={formData.category} 
          onChange={e => setFormData({...formData, category: e.target.value as any})}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        >
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
        <input 
          type="date" value={formData.date} 
          onChange={e => setFormData({...formData, date: e.target.value})} required 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <textarea 
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value})} required 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "100px" }}
        />
        <button type="submit" style={{ padding: "12px", background: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
          Değişiklikleri Kaydet
        </button>
      </form>
    </section>
  );
}