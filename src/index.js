// Your code here
// document.addEventListener('DOMContentLoaded', () => {
//     const baseURL = 'http://localhost:3000';

//     const fetchMovieDetails = async (id) => {
//         const response = await fetch(`${baseURL}/films/${id}`);
//         return await response.json();
//     };

//     const fetchAllMovies = async () => {
//         const response = await fetch(`${baseURL}/films`);
//         return await response.json();
//     };

//     const buyTicket = async (movieId) => {
//         const response = await fetch(`${baseURL}/films/${movieId}`);
//         const movie = await response.json();
//         if (movie.tickets_sold === movie.capacity) {
//             alert('Sorry, this movie is sold out!');
//             return;
//         }
//         await fetch(`${baseURL}/films/${movieId}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 tickets_sold: movie.tickets_sold + 1
//             })
//         });
//         return movie;
//     };

//     const displayMovieDetails = async (id) => {
//         const movie = await fetchMovieDetails(id);
//         const movieDetailsContainer = document.getElementById('movie-details');
//         movieDetailsContainer.innerHTML = `
//             <h2>${movie.title}</h2>
//             <p><strong>Description:</strong> ${movie.description}</p>
//             <p><strong>Runtime:</strong> ${movie.runtime} minutes</p>
//             <p><strong>Showtime:</strong> ${movie.showtime}</p>
//             <p><strong>Available Tickets:</strong> ${movie.capacity - movie.tickets_sold}</p>
//             <button id="buy-ticket">Buy Ticket</button>
//         `;
//         const buyTicketButton = document.getElementById('buy-ticket');
//         buyTicketButton.addEventListener('click', async () => {
//             const updatedMovie = await buyTicket(id);
//             if (updatedMovie) {
//                 displayMovieDetails(id);
//             }
//         });
//     };

//     const displayMoviesMenu = async () => {
//         const movies = await fetchAllMovies();
//         const filmsList = document.getElementById('films');
//         filmsList.innerHTML = movies.map(movie => {
//             const listItem = document.createElement('li');
//             listItem.textContent = movie.title;
//             listItem.classList.add('film', 'item');
//             listItem.addEventListener('click', () => displayMovieDetails(movie.id));
//             return listItem.outerHTML;
//         }).join('');
//     };

//     displayMoviesMenu();
// });


//Your code here
//Declare your function(filmEndpoints) for accessing the films data
const filmEndpoints = "http://localhost:3000/films";

// 
document.addEventListener("DOMContentLoaded", () => {
  //Fetch Movies from the server using the given url
    getMovies();

    // Attach event listener to the "Buy Ticket" button
    document.querySelector("#buy-ticket").addEventListener("click", handleBuyTicket);
});

// Declare a function to fetch movies from the server
function getMovies() {
    fetch(filmEndpoints)
    .then(res => res.json())
    .then(movies => {
      // For each movie received from the server, render it in the User Interface
        movies.forEach(movie => {
            renderMovieList(movie);
        });

        // Add a click event on the first movie to display its details
        const firstMovie = document.querySelector("#id1");
        firstMovie.dispatchEvent(new Event("click"));
    });
};
console.log(getMovies);

// Declare function to render a movie in the list
function renderMovieList(movie) {
    const li = document.createElement("li");
    li.textContent = `${movie.title}`;
    li.id = "id" + movie.id;
    
    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", (event) => {
      // Stop event propagation to avoid triggering handleMovieClick
        event.stopPropagation(); 
      // Call the function to handle movie deletion when the delete button is clicked
        handleDeleteMovie(movie.id);
    });
    li.appendChild(deleteButton);
    
    // Append(add details) the movie list item to the films list
    const ul = document.querySelector("#films");
    ul.appendChild(li);
    li.classList.add("film");
    li.classList.add('item');

    // Attach event listener to the movie list item to handle click events
    li.addEventListener("click", () => {handleMovieClick(movie)});
};
console.log(renderMovieList);

// Declare a function to handle click events on a movie in the list
function handleMovieClick(movie) {
  // Update the movie details displayed in the User Interface
    const poster = document.querySelector("img#poster");
    poster.src = movie.poster;
    poster.alt = movie.title;
    const info = document.querySelector("#showing");
    info.querySelector("#title").textContent = movie.title;
    info.querySelector("#runtime").textContent = movie.runtime+" minutes";
    info.querySelector("#film-info").textContent = movie.description;
    info.querySelector("#showtime").textContent = movie.showtime;
    info.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold + " remaining tickets";
};
console.log(handleMovieClick);

// Declare a function to handle buying tickets events on a movie in the list
function handleBuyTicket(e) {
  // Get the number of remaining tickets
    const ticketDiv = document.querySelector("#ticket-num");
    // Get the number of remaining tickets
    const tickets = ticketDiv.textContent.split(" ")[0];

    // Get the movie ID
    const movieId = document.querySelector("li.film.active").id.slice(2);
    // If there are available tickets, decrement the count
    if (tickets > 0) {
        ticketDiv.textContent = tickets - 1 + " remaining tickets";
        // If no tickets are available, display an alert
    } else if (tickets == 0) {
        alert("Tickets Sold Out!");
        e.target.classList.add("sold-out");
        e.target.classList.remove("orange");
    }
};
console.log(handleBuyTicket);

// Declare a function to update the tickets sold
function updateTicketsSold(movieId, ticketsSold) {
    fetch(`${filmEndpoints}/${movieId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "tickets_sold": ticketsSold
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update tickets sold');
        }
    })
    .catch(error => {
        console.error('Error updating tickets sold:', error);
    });

};
console.log(updateTicketsSold);

// Declare a function to handle deleting a movie from the server
function handleDeleteMovie(movieId) {
    // Send DELETE request to server to delete the film
    fetch(`${filmEndpoints}/${movieId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // Remove the film from the list in the frontend
            const movieElement = document.getElementById("id" + movieId);
            if (movieElement) {
                movieElement.remove();
            }
        // If deletion fails, log an error message
        } else {
            console.error('Failed to delete movie');
        }
    })
    .catch(error => {
        console.error('Error deleting movie:', error);
    });
};
console.log(handleDeleteMovie);





// document.addEventListener('DOMContentLoaded', function() {
//   const filmList = document.getElementById('films');

  // Event delegation to handle clicks on delete buttons
  // filmList.addEventListener('click', function(event) {
  //   if (event.target.classList.contains('delete-btn')) {
  //     const filmItem = event.target.closest('li');
  //     const filmId = filmItem.dataset.filmId; // Assuming you have a data attribute for film id

  //     // Send DELETE request to server
  //     deleteFilm(filmId)
  //       .then(() => {
  //         // Remove film from the list in the frontend
  //         filmItem.remove();
  //       })
  //       .catch(error => {
  //         console.error('Error deleting film:', error);
  //       });
  //   }
  // });



// Function to handle buying a ticket
// function buyTicket(filmId) {
//     // Send PATCH request to update tickets_sold count
//     $.ajax({
//       url: `/films/${filmId}`,
//       type: 'PATCH',
//       contentType: 'application/json',
//       data: JSON.stringify({ tickets_sold: currentTicketsSold + 1 }), // Assuming you're adding one ticket
//       success: function(updatedFilm) {
//         // Update UI with new ticket count
//         updateTicketCount(updatedFilm.tickets_sold);
//       },
//       error: function(error) {
//         console.error('Error buying ticket:', error);
//       }
//     });
//   }





  

//   document.addEventListener('DOMContentLoaded', function() {
//     const buyTicketButton = document.getElementById('buy-ticket-btn');
//     const ticketCountElement = document.getElementById('ticket-count');
    
//     // Event listener for Buy Ticket button
//     buyTicketButton.addEventListener('click', function() {
//       // Send request to backend to purchase ticket
//       purchaseTicket()
//         .then(updatedTicketCount => {
//           // Update frontend with updated ticket count
//           ticketCountElement.textContent = updatedTicketCount;
//         })
//         .catch(error => {
//           console.error('Error purchasing ticket:', error);
//         });
//     });
    
//     // Function to simulate purchasing a ticket
//     function purchaseTicket() {
//       // Simulate sending request to backend (replace with actual AJAX request)
//       return new Promise((resolve, reject) => {
//         // In this example, we'll just decrement the ticket count by 1
//         let currentTicketCount = parseInt(ticketCountElement.textContent);
//         if (currentTicketCount > 0) {
//           currentTicketCount--;
//           resolve(currentTicketCount);
//         } else {
//           reject('No available tickets');
//         }
//       });
//     }
//   });
  


  
//   // Function to update ticket count in UI
//   function updateTicketCount(newCount) {
//     // Update UI with new ticket count
//     $('#ticket-count').text(newCount);
//   }
  
//   // Event listener for Buy Ticket button
//   $('#buy-ticket-btn').click(function() {
//     // Check if tickets are available
//     if (currentTicketsSold < filmCapacity) {
//       // Buy ticket
//       buyTicket(filmId);
//     } else {
//       alert('Sorry, tickets are sold out!');
//     }
//   });
