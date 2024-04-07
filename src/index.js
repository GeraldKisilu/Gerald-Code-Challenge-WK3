// Your code here
// Your code here
document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000';

    const fetchMovieDetails = async (id) => {
        const response = await fetch(`${baseURL}/films/${id}`);
        return await response.json();
    };

    const fetchAllMovies = async () => {
        const response = await fetch(`${baseURL}/films`);
        return await response.json();
    };

    const buyTicket = async (movieId) => {
        const response = await fetch(`${baseURL}/films/${movieId}`);
        const movie = await response.json();
        if (movie.tickets_sold === movie.capacity) {
            alert('Sorry, this movie is sold out!');
            return;
        }
        await fetch(`${baseURL}/films/${movieId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tickets_sold: movie.tickets_sold + 1
            })
        });
        return movie;
    };

    const displayMovieDetails = async (id) => {
        const movie = await fetchMovieDetails(id);
        const movieDetailsContainer = document.getElementById('movie-details');
        movieDetailsContainer.innerHTML = `
            <h2>${movie.title}</h2>
            <p><strong>Description:</strong> ${movie.description}</p>
            <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
            <p><strong>Showtime:</strong> ${movie.showtime}</p>
            <p><strong>Available Tickets:</strong> ${movie.capacity - movie.tickets_sold}</p>
            <button id="buy-ticket">Buy Ticket</button>
        `;
        const buyTicketButton = document.getElementById('buy-ticket');
        buyTicketButton.addEventListener('click', async () => {
            const updatedMovie = await buyTicket(id);
            if (updatedMovie) {
                displayMovieDetails(id);
            }
        });
    };

    const displayMoviesMenu = async () => {
        const movies = await fetchAllMovies();
        const filmsList = document.getElementById('films');
        filmsList.innerHTML = movies.map(movie => {
            const listItem = document.createElement('li');
            listItem.textContent = movie.title;
            listItem.classList.add('film', 'item');
            listItem.addEventListener('click', () => displayMovieDetails(movie.id));
            return listItem.outerHTML;
        }).join('');
    };

    displayMoviesMenu();
});


// Your code here
const db = "http://localhost:3000/films"

document.addEventListener("DOMContentLoaded", () => {
    getMovies();
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});


