const API_KEY = '4d34f58c78053baea9663bc948f91c17';
const container = document.getElementById('popular-grid-full');
const loadMoreBtn = document.getElementById('loadMore');
let page = 1;

async function loadMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
    const data = await response.json();
    
    data.results.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card'; // შენი არსებული CSS კლასი
        card.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" style="width: 100%; border-radius: 8px;">
            <h3 style="font-size: 14px; margin-top: 10px;">${movie.title}</h3>
        `;
        container.appendChild(card);
    });
}

loadMoreBtn.addEventListener('click', () => {
    page++;
    loadMovies();
});

// ჩატვირთვა პირველად
loadMovies();