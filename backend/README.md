# Kampüs Etkinlikleri API - Sprint 7

## REST Sözleşmesi

| Method | Endpoint      | Amaç            | Başarılı | Hata     | Durum     |
|--------|---------------|-----------------|----------|----------|-----------|
| GET    | /events       | Listeyi getir   | 200      | -        | Bu sprint |
| GET    | /events/:id   | Tek etkinlik    | 200      | 404      | Bu sprint |
| POST   | /events       | Yeni etkinlik   | 201      | 400      | Bu sprint |
| PATCH  | /events/:id   | Güncelle        | 200      | 400, 404 | Sprint 9  |
| DELETE | /events/:id   | Sil             | 204      | 404      | Sprint 9  |

Bütün hatalar aynı biçimde döndürülür:
`{ "error": { "message": "Event not found" } }`
```[cite: 12]

---

### Adım 6: Bellek İçi Veri (`events.js`)
Frontend'de (React tarafında) kullandığımız 6 sahte etkinliği artık backend'e, yani kendi veritabanımıza (şimdilik bellek/RAM) taşıyoruz. Teslim kurallarına göre **başlık, yer ve açıklamaları kendine göre uydurmalısın**. İd'ler ise `event-1`, `event-2` şeklinde kalacak.

**`src/data/events.js`** dosyasını aç ve içine şu şablonu yapıştır (istersen başlık ve açıklamaları kendi zevkine göre değiştirebilirsin):

```javascript
export const events = [
  {
    id: "event-1",
    title: "Geleceğin Yazılımcıları Zirvesi",
    category: "Seminer",
    capacity: 100,
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Yapay zeka ve web teknolojileri üzerine uzman konuşmacıların yer alacağı kapsamlı zirve."
  },
  {
    id: "event-2",
    title: "Robotik ve Otonom Sistemler",
    category: "Atölye",
    capacity: 30,
    date: "2026-10-15",
    time: "10:00",
    location: "Mekatronik Laboratuvarı",
    description: "Otonom araçlar üzerine uygulamalı atölye çalışması."
  },
  {
    id: "event-3",
    title: "Kariyer Söyleşileri: Teknoloji Sektörü",
    category: "Söyleşi",
    capacity: 50,
    date: "2026-10-20",
    time: "15:30",
    location: "Öğrenci Merkezi",
    description: "Mezun öğrencilerimizle sektör tecrübeleri üzerine samimi bir söyleşi."
  },
  {
    id: "event-4",
    title: "Hackathon: Kampüs Sorunlarına Çözüm",
    category: "Yarışma",
    capacity: 60,
    date: "2026-11-05",
    time: "09:00",
    location: "Merkezi Kütüphane",
    description: "Kampüs hayatını kolaylaştıracak fikirlerin yarışacağı 24 saatlik hackathon."
  },
  {
    id: "event-5",
    title: "Girişimcilik 101 Semineri",
    category: "Seminer",
    capacity: 150,
    date: "2026-11-12",
    time: "13:00",
    location: "B Blok Amfi 2",
    description: "Kendi start-up'ını kurmak isteyen öğrenciler için temel adımlar."
  },
  {
    id: "event-6",
    title: "React ve Modern Web Geliştirme",
    category: "Atölye",
    capacity: 40,
    date: "2026-11-18",
    time: "16:00",
    location: "Bilgisayar Lab 3",
    description: "Sıfırdan ileri seviye React hook'ları ve komponent yapısı üzerine atölye."
  }
];
```[cite: 12]

