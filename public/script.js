const tmdbKey = "79baf01e8c278602535bd6d8f74dbc48";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

const getGenres = async () => {
  let genreRequestEndpoint = "/genre/movie/list";
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      let genres = jsonResponse.genres;
      return genres;
    }
  } catch (err) {
    console.log("something went wrong", err);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  let discoverMovieEndpoint = '/discover/movie'
  let requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
  let urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      let jsonResponse = await response.json();
      let movies = jsonResponse.results
      return movies;
    }
  } catch (err) {
    console.log("something went wrong", err);
  }
};

const getMovieInfo = async(movie) => {
  let movieId = movie.id
  let movieEndpoint = `/movie/${movieId}`
  let requestParams = `?api_key=${tmdbKey}`
  let urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    let response = await fetch(urlToFetch)
    if (response.ok) {
      let movieInfo = await response.json()
      return movieInfo
    }
  } catch(err) {
    console.log(err)
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async() => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  let movies = await getMovies()
  console.log(movies)
  let randomMovie = getRandomMovie(movies)
  console.log(randomMovie)
  let info = await getMovieInfo(randomMovie)
  displayMovie(info)
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
