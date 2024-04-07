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

}