document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '3d82d368'; // Ваш ключ до OMDb API
    const BASE_URL = 'https://www.omdbapi.com/';
    const FILMS_PER_PAGE = 10; // Кількість фільмів на сторінку
    const filmContainer = document.getElementById('filmContainer');
    const paginationContainer = document.getElementById('paginationContainer');
    const filmImage = document.getElementById('filmImage');
    const filmTitle = document.getElementById('filmTitle');
    const filmSubtitle = document.getElementById('filmSubtitle');
    const filmReleased = document.getElementById('filmReleased');
    const filmBudget = document.getElementById('filmBudget');
    const filmDescription = document.getElementById('filmDescription');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    let currentPage = 1;
    let totalPages = 1;
    let currentSearchQuery = '';

    const fetchFilmsByPage = async (query, page) => {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
        const data = await response.json();
        totalPages = Math.ceil((data.totalResults || 0) / FILMS_PER_PAGE);
        return data.Search || [];
    };

    const fetchFilmDetails = async (id) => {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
        const data = await response.json();
        return data;
    };

    const displayFilms = async (page) => {
        filmContainer.innerHTML = ''; 
        const films = await fetchFilmsByPage(currentSearchQuery, page);

        if (films.length > 0) {
            // Оновлюємо правий блок першим фільмом
            const firstFilmDetails = await fetchFilmDetails(films[0].imdbID);
            updateFilmDetails(firstFilmDetails);
        }

        for (const film of films) {
            const details = await fetchFilmDetails(film.imdbID);

            const filmDiv = document.createElement('div');
            filmDiv.className = 'film';

            const filmImg = document.createElement('img');
            filmImg.src = details.Poster !== 'N/A' ? details.Poster : './image/default.jpg';
            filmImg.alt = details.Title;

            filmDiv.appendChild(filmImg);
            filmContainer.appendChild(filmDiv);

            filmDiv.addEventListener('mouseover', () => {
                updateFilmDetails(details);
            });
        }

        updatePagination();
    };

    const updateFilmDetails = (details) => {
        filmImage.src = details.Poster !== 'N/A' ? details.Poster : './image/default.jpg';
        filmTitle.textContent = details.Title;
        filmSubtitle.textContent = details.Genre || '—';
        filmReleased.textContent = `Released: ${details.Released}`;
        filmBudget.textContent = `Rating: ${details.imdbRating || 'N/A'}`;
        filmDescription.textContent = details.Plot || 'No description available.';
    };

    const updatePagination = () => {
        paginationContainer.innerHTML = '';
        const maxButtons = 5;
        const startPage = Math.floor((currentPage - 1) / maxButtons) * maxButtons + 1;
        const endPage = Math.min(startPage + maxButtons - 1, totalPages);

        const firstButton = document.createElement('button');
        firstButton.textContent = 'First';
        firstButton.disabled = currentPage === 1;
        firstButton.addEventListener('click', () => {
            currentPage = 1;
            displayFilms(currentPage);
        });

        const lastButton = document.createElement('button');
        lastButton.textContent = 'Last';
        lastButton.disabled = currentPage === totalPages;
        lastButton.addEventListener('click', () => {
            currentPage = totalPages;
            displayFilms(currentPage);
        });

        paginationContainer.appendChild(firstButton);

        if (startPage > 1) {
            const prevDots = document.createElement('button');
            prevDots.textContent = '...';
            prevDots.addEventListener('click', () => {
                currentPage = startPage - 1;
                displayFilms(currentPage);
            });
            paginationContainer.appendChild(prevDots);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = currentPage === i ? 'active' : '';
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayFilms(currentPage);
            });
            paginationContainer.appendChild(pageButton);
        }

        if (endPage < totalPages) {
            const nextDots = document.createElement('button');
            nextDots.textContent = '...';
            nextDots.addEventListener('click', () => {
                currentPage = endPage + 1;
                displayFilms(currentPage);
            });
            paginationContainer.appendChild(nextDots);
        }

        paginationContainer.appendChild(lastButton);
    };

    const searchFilms = () => {
        const query = searchInput.value.trim();
        if (query) {
            currentSearchQuery = query;
            currentPage = 1;
            displayFilms(currentPage);
        }
    };

    searchButton.addEventListener('click', searchFilms);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchFilms();
        }
    });

    // Ініціалізація з початковим запитом
    currentSearchQuery = 'Wars'; // Початковий запит
    displayFilms(currentPage);
});
