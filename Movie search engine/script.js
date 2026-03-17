const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");

const API_KEY = "thewdb"; 

async function searchMovies() {
  const query = searchInput.value.trim();
  if (!query) {
    results.innerHTML = "<p>⚠️ Escribe algo para buscar.</p>";
    return;
  }

  results.innerHTML = "<p>⏳ Buscando...</p>";

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();

    if (data.Response === "False") {
      results.innerHTML = `<p>❌ No se encontró nada con "${query}".</p>`;
      return;
    }

    results.innerHTML = "";
    data.Search.forEach(movie => {
      const div = document.createElement("div");
      div.classList.add("movie");

      div.innerHTML = `
        <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/180x250"}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>📅 ${movie.Year}</p>
      `;

      results.appendChild(div);
    });

  } catch (error) {
    results.innerHTML = "<p>⚠️ Error al cargar resultados.</p>";
    console.error(error);
  }
}

searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});
