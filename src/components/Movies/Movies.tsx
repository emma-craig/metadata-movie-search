import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { SelectChangeEvent } from '@mui/material';

import MovieList from '../MovieList/MovieList';
import { selectMovies } from '../../slices/movieSlice';
import FunctionBar from '../FunctionBar/FunctionBar';

const Movies = () => {
  const movies = useSelector(selectMovies);
  const [type, setType] = useState('all');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  let filteredMovies = useMemo(
    () => movies.filter((mov) => mov.Type === type),
    [movies, type]
  );

  const handleShowModal = () => {
    setIsVisible(true);
  };

  const handleChange = (e: SelectChangeEvent) => setType(e.target.value);

  const moviesToShow = filteredMovies.length === 0 ? movies : filteredMovies;

  return (
    <>
      <FunctionBar
        aria-label="component to contain the filter and sort buttons, plus show information about number of favourites and filters"
        handleChange={handleChange}
        handleShowModal={handleShowModal}
        type={type}
        filteredMovies={filteredMovies}
      />
      <MovieList movies={moviesToShow} />
    </>
  );
};

export default Movies;
