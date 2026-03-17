
let movies = JSON.parse(localStorage.getItem("movies")) || [
  { title: "Inception", year: 2010, director: "Christopher Nolan" },
  { title: "The Matrix", year: 1999, director: "The Wachowskis" },
  { title: "Interstellar", year: 2014, director: "Christopher Nolan" }
];

const movieList = document.getElementById("movieList");
const movieForm = document.getElementById("movieForm");
const titleInput = document.getElementById("title");
const yearInput = document.getElementById("year");
const directorInput = document.getElementById("director");

function saveMovies() {
    localStorage.setItem("movies", JSON.stringify(movies));
};


function addMovieToList (movie,index) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="title">${movie.title}</span> <br>
        <span class="year">(${movie.year})</span> <br>
        <span class="director">Director: ${movie.director}</span>
        <button class = "delete">❌</button>
    `;

    li.querySelector(".delete").addEventListener("click", () => {
        movies.splice(index,1);
        saveMovies();
        renderMovies();
    });

    movieList.appendChild(li);
};


function renderMovies(){
    movieList.innerHTML = "";
    movies.forEach((movie,index) => addMovieToList(movie,index));
};

movieForm.addEventListener("submit", function(event){
    event.preventDefault();

    const newMovie = {
        title: titleInput.value,
        year: yearInput.value,
        director: directorInput.value
    };

    movies.push(newMovie);
    saveMovies();
    renderMovies()

    titleInput.value = "";
    yearInput.value = "";
    directorInput.value = "";
});


