import { useState } from "react";
import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
  selectedEventTitle?: string;
}

// Butonların üzerine gelme ve aktiflik (tıklanma) efektini yönetecek özel yapı
function NavItem({ 
  title, 
  isActive, 
  onClick 
}: { 
  title: string; 
  isActive: boolean; 
  onClick: () => void; 
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onClick}
      style={{
        backgroundColor: isActive || isHover ? "#8a1538" : "transparent", // Aktifken veya üstündeyken bordo, yoksa şeffaf
        color: "white", // Yazı her zaman beyaz
        border: "1px solid",
        borderColor: isActive || isHover ? "#8a1538" : "transparent",
        padding: "10px 20px",
        borderRadius: "5px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s ease" // Renk geçişinin yumuşak olması için
      }}
    >
      {title}
    </button>
  );
}

function Navigation({ current, onNavigate, selectedEventTitle }: NavigationProps) {
  return (
    <nav className="site-navigation" style={{ 
      display: "flex", 
      justifyContent: "center", // Menüyü ortada tutar
      gap: "15px", 
      padding: "15px 0" 
    }}>
      <NavItem 
        title="Ana Sayfa" 
        isActive={current === "home"} 
        onClick={() => onNavigate("home")} 
      />
      <NavItem 
        title="Tüm Etkinlikler" 
        isActive={current === "events"} 
        onClick={() => onNavigate("events")} 
      />
      <NavItem 
        title="Yeni Etkinlik Ekle" 
        isActive={current === "add"} 
        onClick={() => onNavigate("add")} 
      />

      {/* HOCANIN İSTEDİĞİ: Seçilen etkinliğin adı da navigasyon çubuğunda vurgulu görünsün */}
      {current === "detail" && selectedEventTitle && (
        <div style={{
          backgroundColor: "#8a1538", // Bordo arka plan
          color: "white", // Beyaz yazı
          padding: "10px 20px",
          borderRadius: "5px",
          fontWeight: "bold",
          border: "1px solid #8a1538",
          display: "flex",
          alignItems: "center"
        }}>
          {selectedEventTitle}
        </div>
      )}
    </nav>
  );
}

export default Navigation;