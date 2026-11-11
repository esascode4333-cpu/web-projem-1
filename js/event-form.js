import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

if (form) {
    const isGuncelleMode = form.dataset.mode === "guncelle";
    const urlId = new URLSearchParams(location.search).get("id");

    if (isGuncelleMode) {
        const etkinlik = events.find(e => e.id === urlId);
        if (etkinlik) {
            form.elements.ad.value = etkinlik.title || "";
            form.elements.kategori.value = etkinlik.category || "";
            form.elements.tarih.value = etkinlik.date || "";
            form.elements.saat.value = etkinlik.time || "";
            form.elements.yer.value = etkinlik.location || "";
            form.elements.kontenjan.value = etkinlik.capacity || "";
            form.elements.aciklama.value = etkinlik.description || "";
        } else {
            form.outerHTML = `
                <div style="border: 2px solid red; background-color: #ffe6e6; padding: 1.5rem; color: red; border-radius: var(--kose);">
                    <p style="margin:0; font-weight:bold;">Güncellenecek etkinlik seçilmedi.</p>
                </div>
                <br>
                <a href="etkinlikler.html" style="background: var(--renk-ana); color: white; padding: 0.75rem 1.5rem; border-radius: var(--kose); text-decoration: none; font-weight:bold; display:inline-block;">Etkinliklere git</a>
            `;
        }
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const fd = new FormData(form);
        const data = {
            id: isGuncelleMode ? urlId : `event-${Math.floor(Math.random() * 1000)}`,
            title: (fd.get("ad") || "").trim(),
            category: fd.get("kategori") || "",
            date: fd.get("tarih") || "",
            time: fd.get("saat") || "",
            location: (fd.get("yer") || "").trim(),
            capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : null,
            description: (fd.get("aciklama") || "").trim()
        };

        const errors = {};
        if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
        if (!data.category) errors.kategori = "Bir kategori seçin.";
        if (!data.date) errors.tarih = "Tarih seçin.";
        if (!data.time) errors.saat = "Saat seçin.";
        if (!data.location) errors.yer = "Yer bilgisini yazın.";

        // Önceki hata durumlarını temizle (Kırmızı çerçeveleri kaldır)
        form.querySelectorAll("input, select, textarea").forEach(el => {
            el.removeAttribute("aria-invalid");
            el.style.borderColor = "#ccc"; // Varsayılan sınır rengi
            const errSpan = document.getElementById(`${el.name}-hata`);
            if (errSpan) errSpan.textContent = "";
        });

        // Hata varsa alanları kırmızı yap ve mesajları yazdır
        if (Object.keys(errors).length > 0) {
            for (const key in errors) {
                const alan = form.elements[key];
                if (alan) {
                    alan.setAttribute("aria-invalid", "true");
                    alan.style.borderColor = "red"; // Kutucukların kırmızı olması
                    const errSpan = document.getElementById(`${key}-hata`);
                    if (errSpan) errSpan.textContent = errors[key];
                }
            }
            if (mesajKutusu) mesajKutusu.innerHTML = "";
            return;
        }

        // Başarılı olduğunda yeşil bildirim kutusu ve JSON çıktısı
        if (mesajKutusu) {
            const islemTuru = isGuncelleMode ? "güncellendi" : "oluşturuldu";
            mesajKutusu.innerHTML = `
                <div style="border: 1px solid #15803d; background-color: #f0fdf4; padding: 1.5rem; color: #15803d; border-radius: var(--kose);">
                    <p style="font-weight:bold; margin-top:0;">Etkinlik başarıyla ${islemTuru} (Bu sprintte veri tabanına kaydedilmez):</p>
                    <pre style="color:black; white-space:pre-wrap; margin:0; font-family:monospace; background:white; padding:1rem; border-radius:4px; border:1px solid #d1d5db;">${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;
        }
    });
}