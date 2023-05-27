// This API is for the most popular movies
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
// Searched movie
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const mainbox = document.querySelector("#movie-box");

// Function to get movies
const getMovies = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    showMovies(data.results);
};

const showMovies = (data) => {
    // this empty the movie box first
    mainbox.innerHTML=""

    data.forEach((item) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
      <img src="${IMGPATH + item.poster_path}" alt="" />
      <div class="overlay">
        <div class="title">
          <h2>${item.title}</h2>
          <span>${item.vote_average}</span>
        </div>
        <h3>Overview:</h3>
        <p>${item.overview}</p>
      </div>
    `;
        mainbox.appendChild(box);
    });
};

// SEARCH-BOX-FUNCTIONALITY
const searchBox = document.querySelector("#search");
searchBox.addEventListener("keyup", search);

function search(event) {
    // console.log(event.target.value);

    if (event.target.value != "") {

        getMovies(SEARCHAPI + event.target.value)
    }
    else {
        getMovies(APIURL);

    }
}


// Initial Call
getMovies(APIURL);
