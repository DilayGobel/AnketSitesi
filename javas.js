document.addEventListener('DOMContentLoaded', function() {
    const anketForm = document.getElementById('anketForm');
    const anketListe = document.getElementById('anketListe');
    const kategoriSelect = document.getElementById('kategori');
    
    
    const anketler = [];
    const userVotes = {};  

    
    anketForm.addEventListener('submit', function(e) {
        e.preventDefault();

        
        const anketBaslik = document.getElementById('anketBaslik').value;
        const anketKategori = document.getElementById('anketKategori').value;
        const anketSoru = document.getElementById('anketSoru').value;
        const anketSecenekler = document.getElementById('anketSecenekler').value.split(',');

        
        const yeniAnket = {
            baslik: anketBaslik,
            kategori: anketKategori,
            soru: anketSoru,
            secenekler: anketSecenekler,
            oylar: new Array(anketSecenekler.length).fill(0), 
            oyVerenler: new Array(anketSecenekler.length).fill([]) 
        };

        
        anketler.push(yeniAnket);
        
        renderAnketler();

        anketForm.reset();
    });

    
    kategoriSelect.addEventListener('change', function() {
        renderAnketler(); 
    });

    
    function renderAnketler() {
        
        anketListe.innerHTML = '';

        
        const selectedCategory = kategoriSelect.value;

        const filteredAnketler = selectedCategory === 'tümü'
            ? anketler 
            : anketler.filter(anket => anket.kategori === selectedCategory); 

       
        filteredAnketler.forEach((anket, index) => {
            const anketItem = document.createElement('div');
            anketItem.classList.add('anket-item');
            anketItem.innerHTML = `
                <h3>${anket.baslik}</h3>
                <p><strong>Soru:</strong> ${anket.soru}</p>
                <p><strong>Kategori:</strong> ${anket.kategori}</p>
                <ul>
                    ${anket.secenekler.map((secenek, idx) => `
                        <li>
                            ${secenek} - ${anket.oylar[idx]} oy
                            <button onclick="oyVer(${index}, ${idx})" id="oyButton-${index}-${idx}">
                                Oy Ver
                            </button>
                        </li>
                    `).join('')}
                </ul>
            `;
            anketListe.appendChild(anketItem);
        });
    }

 
    window.oyVer = function(anketIndex, secenekIndex) {
        const currentAnket = anketler[anketIndex];


        if (userVotes[currentAnket.baslik]) {
            alert("Bu ankete yalnızca bir kez oy verebilirsiniz!");
            return;
        }


        currentAnket.oyVerenler[secenekIndex].push('user'); 


        currentAnket.oylar[secenekIndex]++;


        userVotes[currentAnket.baslik] = true;  

        renderAnketler();
    };
});
