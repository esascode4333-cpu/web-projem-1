
import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="ana-menu">
      <button 
        className={current === "home" ? "menu-butonu aktif" : "menu-butonu"} 
        onClick={() => onNavigate("home")}
      >
        Ana Sayfa
      </button>
      <button 
        className={current === "events" ? "menu-butonu aktif" : "menu-butonu"} 
        onClick={() => onNavigate("events")}
      >
        Tüm Etkinlikler
      </button>
      <button 
        className={current === "add" ? "menu-butonu aktif" : "menu-butonu"} 
        onClick={() => onNavigate("add")}
      >
        Yeni Etkinlik Ekle
      </button>
    </nav>
  );
}

export default Navigation;