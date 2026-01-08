const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=4d34f58c78053baea9663bc948f91c17";
const IMG_PATH = "https://image.tmdb.org/t/p/original";

async function fetchHero() {
    const res = await fetch(API_URL);
    const data = await res.json();
    
    
    const movie = data.results[0];

    
    document.getElementById('movie-title').innerText = movie.title;
    document.getElementById('movie-desc').innerText = movie.overview;
    document.getElementById('movie-rating').innerText = "⭐ " + movie.vote_average;
    document.getElementById('movie-poster').src = IMG_PATH + movie.poster_path;
    
    
    document.getElementById('hero-section').style.backgroundImage = `url(${IMG_PATH + movie.backdrop_path})`;
}

fetchHero();