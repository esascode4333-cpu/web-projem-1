interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header style={{ 
      backgroundColor: "#8a1538", 
      color: "white", 
      padding: "20px", 
      textAlign: "center",
      margin: 0
    }}>
      <h1 style={{ margin: 0 }}>{title}</h1>
    </header>
  );
}

export default Header;