const API_KEY = '4d34f58c78053baea9663bc948f91c17';
const grid = document.getElementById('tvShowsGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let page = 1;

async function fetchTVShows() {
    // ვიყენებთ /tv/popular ენდფოინთს
    const URL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    
    try {
        const response = await fetch(URL);
        const data = await response.json();
        
        data.results.forEach(show => {
            const showCard = document.createElement('div');
            showCard.className = 'movie-card'; // ვიყენებთ შენს არსებულ სტილს
            
            const poster = show.poster_path 
                ? `https://image.tmdb.org/t/p/w500${show.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Poster';

            showCard.innerHTML = `
                <img src="${poster}" alt="${show.name}" style="width:100%; border-radius:10px;">
                <h3 style="font-size: 15px; margin-top: 10px; color: white;">${show.name}</h3>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px;">
                    <span style="color: #e50914; font-weight: bold;">★ ${show.vote_average.toFixed(1)}</span>
                    <span style="color: #888; font-size: 12px;">${show.first_air_date ? show.first_air_date.split('-')[0] : ''}</span>
                </div>
            `;
            grid.appendChild(showCard);
        });
    } catch (error) {
        console.error("Error fetching TV shows:", error);
    }
}

loadMoreBtn.addEventListener('click', () => {
    page++;
    fetchTVShows();
});

// საწყისი ჩატვირთვა
fetchTVShows();