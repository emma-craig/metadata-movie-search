import React, { useMemo, useState } from 'react';

import MovieList from './MovieList';
import { SelectChangeEvent, Dialog } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectMovies } from '../slices/movieSlice';
import FavouritesList from './FavouritesList';
import FunctionBar from './FunctionBar';

const Movies = () => {
  // const favourites = useSelector(selectFavourites);
  const movies = useSelector(selectMovies);
  const [type, setType] = useState('movie');
  const handleChange = (e: SelectChangeEvent) => setType(e.target.value);
  let filteredMovies = useMemo(
    () => movies.filter((mov) => mov.Type === type),
    [movies, type]
  );

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const handleShowModal = () => {
    setIsVisible(true);
  };
  const handleCloseModal = () => setIsVisible(false);

  return (
    <>
      <Dialog
        open={isVisible}
        onClose={handleCloseModal}>
        <FavouritesList />
      </Dialog>
      <FunctionBar
        handleChange={handleChange}
        handleShowModal={handleShowModal}
        type={type}
        filteredMovies={filteredMovies}
      />

      <MovieList movies={filteredMovies} />
    </>
  );
};

export default Movies;
