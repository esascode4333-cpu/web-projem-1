// Adım 4'te yazdığımız kuralları (tipleri) içeri aktarıyoruz
import type { CampusEvent, Category } from "../types/campus-event";

// 1. Arama Fonksiyonu: Başlık veya açıklamada metin arar
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  // Eğer başlıkta veya açıklamada aranan kelime varsa o etkinliği listeye dahil et
  return list.filter((e) => 
    e.title.toLocaleLowerCase("tr-TR").includes(q) || 
    e.description.toLocaleLowerCase("tr-TR").includes(q)
  );
}

// 2. Kategori Filtreleme Fonksiyonu: "" (boş) ise hepsini, değilse sadece eşleşenleri döndürür
export function filterByCategory(list: CampusEvent[], category: Category | ""): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

// 3. ID'ye Göre Etkinlik Bulma: Seçilen tek bir etkinliği ya da undefined (bulunamadı) döndürür
export function findEventById(list: CampusEvent[], id: string): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}