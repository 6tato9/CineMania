const API_KEY = '4d34f58c78053baea9663bc948f91c17';
const grid = document.getElementById('horrorMoviesGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let page = 1;

async function fetchHorrorMovies() {
    // ჟანრი 27 არის Horror
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27&page=${page}&language=en-US`;
    
    try {
        const response = await fetch(URL);
        const data = await response.json();
        
        data.results.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card'; 
            
            // ვიყენებთ TMDB-ის სურათის გზას
            const poster = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Poster';

            movieCard.innerHTML = `
                <img src="${poster}" alt="${movie.title}" style="width:100%; border-radius:10px;">
                <h3 style="font-size: 15px; margin-top: 10px; color: white;">${movie.title}</h3>
                <span style="color: #e50914;">★ ${movie.vote_average.toFixed(1)}</span>
            `;
            grid.appendChild(movieCard);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

loadMoreBtn.addEventListener('click', () => {
    page++;
    fetchHorrorMovies();
});

// ჩატვირთვა გვერდის გახსნისას
fetchHorrorMovies();