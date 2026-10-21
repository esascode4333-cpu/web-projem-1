interface EventFilterProps {
  searchText: string;
  category: string;
  categories: string[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: string) => void;
}

function EventFilter({ searchText, category, categories, onSearchChange, onCategoryChange }: EventFilterProps) {
  return (
    <div className="filtreler" style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
      {/* Arama Kutusu */}
      <input
        type="text"
        placeholder="Örn: atölye, kariyer..."
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
      />
      
      {/* Kategori Seçimi */}
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{ padding: "8px" }}
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EventFilter;