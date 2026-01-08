const API_KEY = "4d34f58c78053baea9663bc948f91c17";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/original";


function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ""; 

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        
        movieCard.innerHTML = `
            <img src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
            <h4>${movie.title}</h4>
        `;
        
        container.appendChild(movieCard);
    });
}

// 2. მთავარი ფუნქციები
async function initApp() {
    try {
        
        const resPopular = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        const dataPopular = await resPopular.json();
        const popularMovies = dataPopular.results;

        // --- HERO SECTION ---
        if (popularMovies.length > 0) {
            const heroMovie = popularMovies[0];
            document.getElementById('movie-title').innerText = heroMovie.title;
            document.getElementById('movie-desc').innerText = heroMovie.overview;
            document.getElementById('movie-rating').innerText = "⭐ " + heroMovie.vote_average.toFixed(1);
            document.getElementById('movie-poster').src = IMG_PATH + heroMovie.poster_path;
            document.getElementById('hero-section').style.backgroundImage = 
                `linear-gradient(to right, rgba(0,0,0,0.9) 20%, transparent 100%), url(${IMG_PATH + heroMovie.backdrop_path})`;
        }

        // --- POPULAR SLIDER ---
        
        displayMovies(popularMovies.slice(1), 'popular-grid');

        // --- HORROR SLIDER ---
        const resHorror = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`);
        const dataHorror = await resHorror.json();
        displayMovies(dataHorror.results, 'horror-grid');

        //---series---
        const resTV = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
        const dataTV = await resTV.json();
        displayMovies(dataTV.results, 'tv-grid');

    } catch (error) {
        console.error("Error loading movies:", error);
    }
}


initApp();