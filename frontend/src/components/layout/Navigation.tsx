import { NavLink } from "react-router-dom";


export default function Navigation() {
  return (
    <nav style={{ background: "#f4f4f4", padding: "10px 20px", borderBottom: "1px solid #ddd" }}>
      <ul style={{ display: "flex", listStyle: "none", gap: "20px", margin: 0, padding: 0 }}>
        <li>
          <NavLink 
            to="/" 
            end 
            style={({ isActive }) => ({ color: isActive ? "#4CAF50" : "#333", fontWeight: isActive ? "bold" : "normal", textDecoration: "none" })}
          >
            Ana Sayfa
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/events" 
            style={({ isActive }) => ({ color: isActive ? "#4CAF50" : "#333", fontWeight: isActive ? "bold" : "normal", textDecoration: "none" })}
          >
            Etkinlikler
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin" 
            style={({ isActive }) => ({ color: isActive ? "#4CAF50" : "#333", fontWeight: isActive ? "bold" : "normal", textDecoration: "none" })}
          >
            Yönetim
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/login" 
            style={({ isActive }) => ({ color: isActive ? "#4CAF50" : "#333", fontWeight: isActive ? "bold" : "normal", textDecoration: "none" })}
          >
            Giriş
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}