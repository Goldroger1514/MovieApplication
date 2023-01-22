// const MOVIE_URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=fc1fef96`;
// const DETAILS_URL = `http://www.omdbapi.com/?i=${id}&apikey=fc1fef96`;
let searchInput = document.querySelector('.search');
let searchList = document.querySelector('.search-lists');
searchInput.addEventListener('input', function () {
  console.log(this.value)
  fetchMovies(this.value);
  searchList.style.display = 'block';
})
function fetchMovies(searchValue) {
  fetch(`https://omdbapi.com/?s=${searchValue}&page=1&apikey=fc1fef96`).then(
    (response) => {
      let promise = response.json();
      return promise;//data
    }
  ).then(
    (movies) => {
      let search = movies.Search;
      if (search != undefined) {
        showSearch(search);
        document.querySelectorAll('.search-lists > div').forEach((ele, index) => {
          ele.onclick = function (e) {
            e.stopPropagation();
            fetchMovieDetails(search[index].imdbID);
            searchList.style.display = 'none';
            searchInput.value = '';
          }
        })
      }
    }
  )
}
function showSearch(movies) {
  searchList.innerHTML = '';
  movies.forEach((movie,index) => {
    let movieCont = document.createElement('div');
    movieCont.className = 'movie flex';
    searchList.append(movieCont);
    let thumbnail = document.createElement('div');
    thumbnail.classList.add('thumbnail');
    movieCont.append(thumbnail);
    let img = document.createElement('img');
    img.src = movie.Poster;
    thumbnail.append(img);
    //movie title
    let movieTitle = document.createElement('div');
    movieTitle.classList.add('info');
    movieCont.append(movieTitle);
    movieTitle.textContent = movie.Title;
  })
}
let moviesArray = [];
if (localStorage.getItem('MoviesArray')) {
  moviesArray = JSON.parse(localStorage.getItem('MoviesArray'));
}
function showMovieDetails(movieInfo) {
  let resultsGrid = document.querySelector('.result-grid');
  resultsGrid.innerHTML = `
  <div class="movie-poster">
        <img src="${movieInfo.Poster}" alt="Movie poster">
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${movieInfo.Title}</h3>
        <ul class="movie-misc-info">
          <li class="year">Year: ${movieInfo.Year}</li>
          <li class="rated">Ratings: ${movieInfo.Rated}</li>
          <li class="released">Released: ${movieInfo.Released}</li>
        </ul>
        <p class="genre">
          <b>Genre: </b>${movieInfo.Genre}
        </p>
        <p class="writer">
          <b>Writer: </b>${movieInfo.Writer}
        </p>
        <p class="actors">
          <b>Actors: </b>${movieInfo.Actors}
        </p>
        <p class="plot">
          <b>Plot: </b>
          ${movieInfo.Plot}
        </p>
        <p class="language">
          <b>Language: </b>
          ${movieInfo.Language}
        </p>
        <p class="awards">
          <b> <i class="fa-solid fa-award"></i> </b>
          <b>${movieInfo.Awards}</b>
        </p>
      </div>
  `;
}
function fetchMovieDetails(id) {
  fetch(`http://www.omdbapi.com/?i=${id}&apikey=fc1fef96`).then(
    (response) => {
      let promise = response.json();//extract data
      return promise;//data
    }
  ).then(
    (movie) => {
      console.log(movie);
      showMovieDetails(movie);
      localStorage.setItem('movie', JSON.stringify(movie));
    }
  )
}
if (localStorage.getItem('movie'))
  showMovieDetails(JSON.parse(localStorage.movie));