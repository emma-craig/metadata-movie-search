import React, { useMemo } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { selectFavourites, selectMovies } from '../slices/movieSlice';
import MovieList from './MovieList';

const FavouritesList = () => {
  const movies = useAppSelector(selectMovies);
  const favourites = useAppSelector(selectFavourites);
  const favouriteMoviesList = useMemo(
    () => movies.filter((movie) => favourites.includes(movie.imdbID)),
    [favourites, movies]
  );

  return <MovieList movies={favouriteMoviesList} />;
};
export default FavouritesList;
