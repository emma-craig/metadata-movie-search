import React, { useMemo, useState } from 'react';

import MovieList from './MovieList';
import {
  SelectChangeEvent,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectFavourites, selectMovies } from '../slices/movieSlice';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const navigate = useNavigate();

  const favourites = useSelector(selectFavourites);
  const movies = useSelector(selectMovies);
  const [type, setType] = useState('movie');
  const handleChange = (e: SelectChangeEvent) => setType(e.target.value);
  let filteredMovies = useMemo(
    () => movies.filter((mov) => mov.Type === type),
    [movies, type]
  );
  const showFavouriteMoviesList = () => {
    navigate('./favourites');
  };

  return (
    <>
      {movies && (
        <Stack
          my={4}
          gap={1}
          flexDirection="row"
          justifyContent="space-between">
          <Stack>
            <Typography>Number of favourites: {favourites.length}</Typography>
            <Button onClick={showFavouriteMoviesList}>View Favourites</Button>
          </Stack>
          <Stack alignItems="flex-end">
            <FormControl>
              <InputLabel id="demo-simple-select-label">
                Filter by type
              </InputLabel>
              <Select
                labelId="filter-by-format-label"
                id="format-filter-select"
                value={type}
                label="Type"
                sx={{ width: '300px' }}
                onChange={handleChange}>
                <MenuItem value="movie">Movie</MenuItem>
                <MenuItem value="series">Series</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="caption">
              {' '}
              {type} count: {filteredMovies.length}
            </Typography>
          </Stack>
        </Stack>
      )}
      <MovieList movies={filteredMovies} />
    </>
  );
};

export default Movies;
