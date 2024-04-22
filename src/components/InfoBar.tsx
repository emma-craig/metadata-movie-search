import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFavourites, selectMovies } from '../slices/movieSlice';

const InfoBar = () => {
  const favourites = useSelector(selectFavourites);
  const movies = useSelector(selectMovies);
  const [type, setType] = useState('movie');
  const handleChange = (e: SelectChangeEvent) => setType(e.target.value);
  const filteredMovies = useMemo(() => {
    return movies.filter((mov) => mov.Type === type);
  }, [movies, type]);
  return (
    <>
      {movies && (
        <Stack
          gap={1}
          flexDirection="row"
          justifyContent="space-between">
          <Stack>Number of favourites: {favourites.length}</Stack>
          <FormControl>
            <InputLabel id="demo-simple-select-label">
              Filter by type
            </InputLabel>
            <Select
              labelId="filter-by-format-label"
              id="format-filter-select"
              value={type}
              label="Type"
              onChange={handleChange}>
              <MenuItem value="movie">Movie</MenuItem>
              <MenuItem value="series">Series</MenuItem>
            </Select>
          </FormControl>
          {type}: {filteredMovies.length}
        </Stack>
      )}
    </>
  );
};

export default InfoBar;
