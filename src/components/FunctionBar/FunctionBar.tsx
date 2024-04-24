import React from 'react';
import { useSelector } from 'react-redux';

import {
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  selectFavourites,
  selectMovies,
  sortMovies,
} from '../../slices/movieSlice';
import { IMovie } from '../../types/movies';

interface IFunctionBar {
  handleChange: (e: SelectChangeEvent) => void;
  handleShowModal: () => void;
  filteredMovies: IMovie[];
  type: string;
}

const FunctionBar = ({ handleChange, filteredMovies, type }: IFunctionBar) => {
  const dispatch = useAppDispatch();
  const movies = useSelector(selectMovies);
  const favourites = useAppSelector(selectFavourites);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen size is small

  const handleSort = () => {
    dispatch(sortMovies());
  };

  return (
    <Stack
      alignItems="center"
      borderRadius="5px"
      flexDirection={isSmallScreen ? 'column' : 'row'} // Set flexDirection to column for small screens
      gap={1}
      justifyContent="space-around"
      my={4}
      padding={2}>
      <Stack alignItems="center">
        <Typography aria-label="count of the favourited movies and series">
          Number of favourites: {favourites.length}
        </Typography>
        <Button
          aria-label="button to sort movies and series titles alphabetically"
          onClick={handleSort}
          style={{ display: movies.length <= 1 ? 'none' : undefined }}>
          Sort titles A-Z
        </Button>
      </Stack>
      <Stack alignItems="flex-end">
        <FormControl>
          <Select
            aria-label="selct box for applying filters to search results"
            id="format-filter-select"
            labelId="filter-by-format-label"
            label="Filter by Type"
            onChange={handleChange}
            sx={{ width: '300px' }}
            value={type}>
            <MenuItem value="all">Show all</MenuItem>
            <MenuItem value="movie">Show only Movies</MenuItem>
            <MenuItem value="series">Show only Series</MenuItem>
          </Select>
        </FormControl>
        {filteredMovies.length > 0 && (
          <Typography
            aria-label="count of the movies or series in current filter"
            variant="caption">
            {type} count: {filteredMovies.length}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default FunctionBar;
