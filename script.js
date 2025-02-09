const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const artistContainer = document.querySelector(".grid-container"); // Container para os cards dos artistas

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then(response => response.json())
        .then(result => displayResults(result, searchTerm));
}

function displayResults(result, searchTerm) {
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove("hidden");
    artistContainer.innerHTML = ""; // Limpa os resultados anteriores

    // Filtra os artistas que contêm o termo pesquisado (case insensitive)
    const filteredArtists = result.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredArtists.length === 0) {
        artistContainer.innerHTML = "<p>Nenhum artista encontrado.</p>";
        return;
    }

    filteredArtists.forEach(element => {
        const artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");

        artistCard.innerHTML = `
            <div class="card-img">
                <img src="${element.urlImg}" class="artist-img" alt="${element.name}" />
                <div class="play">
                    <span class="fa fa-solid fa-play"></span>
                </div>
            </div>
            <div class="card-text">
                <a title="${element.name}" class="vst" href=""></a>
                <span class="artist-name">${element.name}</span>
                <span class="artist-categorie">Artista</span>
            </div>
        `;

        artistContainer.appendChild(artistCard);
    });
}

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === "") {
        resultArtist.classList.add('hidden');
        resultPlaylist.classList.remove('hidden');
        return;
    }

    requestApi(searchTerm);
});

