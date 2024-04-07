// Your code here
// Your code here
document.addEventListener('DOMContentLoaded'), () => {
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

};