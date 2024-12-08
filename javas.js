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
                            <button onclick="oyVer(${index}, ${idx})" id="oyButton-${index}-${idx}" ${
                                oylananAnketler[index] !== undefined
                                    ? 'disabled'
                                    : ''
                            }>
                                Oy Ver
                            </button>
                        </li>
                    `
                        )
                        .join('')}
                </ul>
            `;

            anketListe.appendChild(anketItem);
        });
    }

    // Son Anketi Göster
    function renderSonAnket() {
        if (!sonAnketContainer || anketler.length === 0) return;

        const sonAnket = anketler[anketler.length - 1];
        sonAnketContainer.innerHTML = `
            <div class="anket-item">
                <h3>${sonAnket.baslik}</h3>
                <p><strong>Soru:</strong> ${sonAnket.soru}</p>
                <p><strong>Kategori:</strong> ${sonAnket.kategori}</p>
                <ul>
                    ${sonAnket.secenekler
                        .map(
                            (secenek, idx) => `
                        <li>
                            ${secenek} - ${sonAnket.oylar[idx]} oy
                            <button onclick="oyVer(${anketler.length - 1}, ${idx})" id="oyButton-${anketler.length - 1}-${idx}" ${
                                oylananAnketler[anketler.length - 1] !== undefined
                                    ? 'disabled'
                                    : ''
                            }>
                                Oy Ver
                            </button>
                        </li>
                    `
                        )
                        .join('')}
                </ul>
            </div>
        `;
    }

    // Oy Kullanma
    window.oyVer = function (anketIndex, secenekIndex) {
        // Oy verme kontrolü
        if (oylananAnketler[anketIndex] !== undefined) {
            showToast('Hata: Bu ankete yalnızca bir kez oy verebilirsiniz!');
            return;
        }

        // Oy verme işlemi
        const currentAnket = anketler[anketIndex];
        currentAnket.oylar[secenekIndex]++;
        oylananAnketler[anketIndex] = secenekIndex; // Kullanıcının oyu kaydediliyor

        localStorage.setItem('anketler', JSON.stringify(anketler));
        localStorage.setItem('oylananAnketler', JSON.stringify(oylananAnketler));

        renderTumu(); // Listeyi güncelle
        renderSonAnket(); // Son anketi güncelle
    };



    // Sayfaya Göre Fonksiyonları Çağır
    if (anketListe) renderTumu();
    if (sonAnketContainer) renderSonAnket();
});
