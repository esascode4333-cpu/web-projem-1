import React from "react";

interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header className="site-header" style={{ textAlign: "center", padding: "20px", backgroundColor: "#8a1538", color: "white" }}>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;