document.addEventListener('DOMContentLoaded', function () {
    const anketListe = document.getElementById('anketListe');
    const sonAnketContainer = document.getElementById('sonAnket');

    let anketler = JSON.parse(localStorage.getItem('anketler')) || [];
    let oylananAnketler = JSON.parse(localStorage.getItem('oylananAnketler')) || {}; // Oy bilgileri

    // Tüm Anketleri Göster
    function renderTumu() {
        if (!anketListe) return;

        if (anketler.length === 0) {
            anketListe.innerHTML = '<p>Hiç anket bulunamadı.</p>';
            return;
        }

        anketListe.innerHTML = '';
        anketler.forEach((anket, index) => {
            const anketItem = document.createElement('div');
            anketItem.className = 'anket-item';

            anketItem.innerHTML = `
                <h3>${anket.baslik}</h3>
                <p><strong>Soru:</strong> ${anket.soru}</p>
                <p><strong>Kategori:</strong> ${anket.kategori}</p>
                <ul>
                    ${anket.secenekler
                        .map(
                            (secenek, idx) => `
                        <li>
                            ${secenek} - ${anket.oylar[idx]} oy
                        </li>
                    `
                        )
                        .join('')}
                </ul>
            `;

            anketListe.appendChild(anketItem);
        });
    }


   

    // Anketleri sıfırlama fonksiyonu
    window.resetAnketler = function () {
        if (confirm('Tüm anketleri silmek istediğinize emin misiniz?')) {
            localStorage.removeItem('anketler');
            localStorage.removeItem('oylananAnketler');
            anketler = [];
            oylananAnketler = {};
            renderTumu();
            alert('Tüm anketler başarıyla sıfırlandı.');
        }
    };

    // Sayfaya Göre Fonksiyonları Çağır
    if (anketListe) renderTumu();
    if (sonAnketContainer) renderSonAnket();
});
