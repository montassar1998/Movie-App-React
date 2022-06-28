import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import AddFavourites from "./components/AddFavourites";
import React, { useEffect, useState } from 'react'
import MovieList from './components/MovieList';
import RemoveFavourites from "./components/RemoveFavourites";
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBar';
function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [favourite, setFavourites] = useState([])
  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=3f6caf37`
    const response = await fetch(url)
    const responseJson = await response.json()
    console.log(responseJson)
    if (responseJson.Search) {
      setMovies(responseJson.Search)

    }
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites'))
    setFavourites(movieFavourites)
  }, [])
  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  }
  const addFavouriteMovie = (movie) => {
    const newFavourite = [...favourite, movie]
    setFavourites(newFavourite)
    saveToLocalStorage(newFavourite)
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourite.filter((fav) => fav.imdbID !== movie.imdbID)
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }
  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList handleFavouritesClick={addFavouriteMovie} movies={movies} favouriteComponent={AddFavourites} />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading="Favourites" />
      </div>
      <div className='row'>
        <MovieList handleFavouritesClick={removeFavouriteMovie}
          movies={favourite}
          favouriteComponent={RemoveFavourites} />
      </div>
    </div>
  );
}

export default App;
