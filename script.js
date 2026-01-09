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


// --- 1. ნავიგაციის განახლების ლოგიკა ---
function updateNavbar() {
    const navAuth = document.querySelector('.nav-auth');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');

    if (isLoggedIn === 'true' && navAuth) {
        navAuth.innerHTML = `
            <div class="user-profile-nav">
                <span>Hi, <strong>${userName}</strong></span>
                <a href="#" id="logout-btn" class="logout-link">Log Out</a>
            </div>
        `;

        document.getElementById('logout-btn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = 'index.html';
        });
    }
}

// --- 2. ავტორიზაციის ფორმის ლოგიკა ---
const authForm = document.getElementById('auth-form');
if (authForm) {
    const switchAuth = document.getElementById('switch-auth');
    const authTitle = document.getElementById('auth-title');
    const authSubmit = document.getElementById('auth-submit');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePass = document.getElementById('toggle-password');

    let isLoginMode = false;

    // რეჟიმების გადართვა (Login / Sign Up)
    switchAuth.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = !isLoginMode;
        authTitle.textContent = isLoginMode ? "Log In" : "Sign Up";
        authSubmit.textContent = isLoginMode ? "Sign In" : "Create Account";
        switchAuth.textContent = isLoginMode ? "Sign Up now." : "Log In now.";
    });

    // პაროლის ჩვენება/დამალვა
    togglePass.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePass.textContent = type === 'password' ? '👁️' : '🔒';
    });

    // ფორმის გაგზავნა
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("Please enter a valid email!");
            return;
        }

        if (passwordInput.value.length < 6) {
            alert("Password must be at least 6 characters!");
            return;
        }

        // მომხმარებლის სახელის ამოღება მეილიდან
        const name = email.split('@')[0];
        localStorage.setItem('userName', name);
        localStorage.setItem('isLoggedIn', 'true');

        alert(isLoginMode ? "Welcome back!" : "Account created!");
        window.location.href = 'index.html';
    });
}

// ფუნქციის გამოძახება გვერდის ჩატვირთვისას
document.addEventListener('DOMContentLoaded', updateNavbar);




const burger = document.getElementById('burger');
const nav = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
}



window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        navbar.style.padding = '10px 50px'; // ცოტათი დაპატარავდება სქროლისას
    } else {
        navbar.style.backgroundColor = '#000';
        navbar.style.padding = '20px 50px';
    }
});


// თუ უკვე დაეთანხმა, არ გამოაჩინო
if (!localStorage.getItem('cookiesAccepted')) {
    // შექმენი ბანერი დინამიურად
    const banner = document.createElement('div');
    banner.innerHTML = `
        <div id="cookie-wrap" style="position:fixed; bottom:20px; right:20px; background:#FF0000; color:white; padding:15px; z-index:9999; border-radius:10px;">
            <span>Accept Cookies?</span>
            <button id="accept-cookies" style="margin-left:10px; cursor:pointer; border:none; padding:5px; border-radius:5px;">Yes</button>
        </div>
    `;
    document.body.appendChild(banner);

    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        document.getElementById('cookie-wrap').remove();
    });
}