import { events } from "./data.js";

const container = document.querySelector("#detay");
const id = new URLSearchParams(location.search).get("id");
const event = events.find(e => e.id === id);

if (!event) {
    container.innerHTML = `
        <div style="border: 2px solid red; background-color: #ffe6e6; padding: 1rem; color: red; border-radius: var(--kose);">
            <p>"${id || 'Bilinmeyen'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
        </div>
        <br>
        <a href="etkinlikler.html" style="background: var(--renk-ana); color: white; padding: 0.75rem 1.5rem; border-radius: var(--kose); text-decoration: none; font-weight:bold;">← Listeye dön</a>
    `;
} else {
    document.title = event.title;
    const dateObj = new Date(event.date);
    const dateStr = dateObj.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

    container.innerHTML = `
        <h2>${event.title}</h2>
        <section class="detay-grid">
            <div>
                <img src="robotik-afis.jpg" alt="${event.title} Afişi" style="border: 1px solid #ccc; max-width: 100%; border-radius: var(--kose);">
                <p><em>Şekil: ${event.title} afişi</em></p>
            </div>
            <div>
                <div style="background: white; padding: 1.5rem; border: 1px solid #ccc; border-radius: var(--kose);">
                    <h3 style="margin-top:0; color: var(--renk-ana);">Etkinlik Künyesi</h3>
                    <p><strong>Tarih:</strong> ${dateStr}, ${event.time}</p>
                    <p><strong>Yer:</strong> ${event.location}</p>
                    <p><strong>Kategori:</strong> ${event.category}</p>
                    <p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>
                </div>
                <br>
                <h3 style="color: var(--renk-ana);">Açıklama</h3>
                <p>${event.description}</p>
                <br><br>
                <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                    <a href="etkinlikler.html" style="background: var(--renk-ana); color: white; padding: 0.75rem 1.5rem; border-radius: var(--kose); text-decoration: none; font-weight:bold;">← Listeye dön</a>
                    <a href="etkinlik-guncelle.html?id=${event.id}" style="background: var(--renk-ana); color: white; padding: 0.75rem 1.5rem; border-radius: var(--kose); text-decoration: none; font-weight:bold;">Bu etkinliği güncelle</a>
                </div>
            </div>
        </section>
    `;
}