import React, { useMemo, useState } from 'react';

import MovieList from '../MovieList/MovieList';
import { SelectChangeEvent } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectMovies } from '../../slices/movieSlice';
import FunctionBar from '../FunctionBar/FunctionBar';

const Movies = () => {
  const movies = useSelector(selectMovies);
  const [type, setType] = useState('all');
  const handleChange = (e: SelectChangeEvent) => setType(e.target.value);
  let filteredMovies = useMemo(
    () => movies.filter((mov) => mov.Type === type),
    [movies, type]
  );

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const handleShowModal = () => {
    setIsVisible(true);
  };
  const moviesToShow = filteredMovies.length === 0 ? movies : filteredMovies;
  return (
    <>
      <FunctionBar
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
