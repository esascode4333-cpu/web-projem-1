import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const filtreFormu = document.querySelector("#filtre-formu");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

function createCard(event) {
    // Sadece event.image tanımlı olan etkinliklerde (ilk 2 etkinlikte) resim gösterir
    const imageTag = event.image 
        ? `<img src="${event.image}" alt="${event.title}" style="width: 100%; height: 140px; object-fit: cover; border-radius: 4px; margin-bottom: 0.75rem;">` 
        : "";

    return `
    <article style="margin-bottom: 1rem;">
        ${imageTag}
        <h3 style="margin-top: 0; margin-bottom: 0.5rem;">${event.title}</h3>
        <p style="margin-bottom: 0.5rem; color: #555;">${event.category} - ${event.date}</p>
        <p style="margin-bottom: 1rem; color: #555;">${event.location}</p>
        <a href="etkinlik-detay.html?id=${event.id}" style="color: var(--renk-ana); text-decoration: none;">Detayları gör →</a>
    </article>
    `;
}

function render(dizi) {
    if (!list) return;
    if (dizi.length === 0) {
        list.innerHTML = `<p style="color: red; grid-column: 1 / -1;">Aramanıza uygun etkinlik bulunamadı.</p>`;
    } else {
        list.innerHTML = dizi.map(createCard).join("");
    }
    if (sonucSatiri) {
        sonucSatiri.textContent = `${dizi.length} etkinlik listeleniyor.`;
    }
}

if (list && list.dataset.limit) {
    // Ana sayfa için limitli gösterim
    const yaklasan = [...events]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, Number(list.dataset.limit));
    render(yaklasan);
} else if (list) {
    // Etkinlikler sayfası için tüm liste
    render(events);

    if (kategoriSelect && aramaInput) {
        const kategoriler = [...new Set(events.map(e => e.category))];
        kategoriler.forEach(kat => {
            const option = document.createElement("option");
            option.value = kat;
            option.textContent = kat;
            kategoriSelect.appendChild(option);
        });

        function filtrele() {
            const aranan = aramaInput.value.toLocaleLowerCase("tr-TR");
            const secilenKategori = kategoriSelect.value;

            const sonuc = events.filter(e => {
                const titleText = (e.title || "").toLocaleLowerCase("tr-TR");
                const descText = (e.description || "").toLocaleLowerCase("tr-TR");
                
                const metinUyuyor = titleText.includes(aranan) || descText.includes(aranan);
                const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
                return metinUyuyor && kategoriUyuyor;
            });
            render(sonuc);
        }

        aramaInput.addEventListener("input", filtrele);
        kategoriSelect.addEventListener("change", filtrele);
        
        if (filtreFormu) {
            filtreFormu.addEventListener("submit", (e) => e.preventDefault());
        }
    }
}