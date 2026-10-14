import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    capacity: 200,
    image: "/afis.jpg" // public klasöründeki afis.jpg buraya bağlandı
  },
  {
    id: "2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
    capacity: 30,
    image: "/atolye.jpg" // public klasöründeki atolye.jpg buraya bağlandı
  },
  {
    id: "3",
    title: "Yapay Zeka Söyleşisi",
    category: "Söyleşi",
    date: "2026-11-15",
    time: "13:30",
    location: "Kütüphane Seminer Odası",
    description: "Yapay zekanın geleceği ve etik tartışmalar.",
    capacity: 50,
    image: "" 
  },
  {
    id: "4",
    title: "Kodlama Yarışması",
    category: "Yarışma",
    date: "2026-12-01",
    time: "09:00",
    location: "İnovasyon Merkezi",
    description: "48 saatlik hackathon. Ödüllü algoritmik programlama yarışması.",
    capacity: 100,
    image: "" 
  },
  {
    id: "5",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "2026-11-03",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML, CSS ve React ile modern web arayüzleri geliştirme.",
    capacity: 40,
    image: "" 
  },
  {
    id: "6",
    title: "Siber Güvenlik 101",
    category: "Seminer",
    date: "2026-12-10",
    time: "10:30",
    location: "C Blok Amfi",
    description: "Ağ güvenliğine giriş ve temel siber savunma yöntemleri.",
    capacity: 150,
    image: "" 
  }
];