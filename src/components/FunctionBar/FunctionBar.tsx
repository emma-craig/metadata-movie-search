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
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectFavourites, selectMovies, sortMovies } from '../../slices/movieSlice';
import { IMovie } from '../../types/movies';
import { useSelector } from 'react-redux';

interface IFunctionBar {
  handleChange: (e: SelectChangeEvent) => void;
  handleShowModal: () => void;
  filteredMovies: IMovie[];
  type: string;
}

const FunctionBar = ({
  handleChange,
  handleShowModal,
  filteredMovies,
  type,
}: IFunctionBar) => {
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
      my={4}
      gap={1}
      flexDirection={isSmallScreen ? 'column' : 'row'} // Set flexDirection to column for small screens
      justifyContent='space-around'
      alignItems='center'
      borderRadius="5px"
      padding={2}>
      <Stack alignItems='center'>
        <Typography>Number of favourites: {favourites.length}</Typography>
        <Button
        onClick={handleSort}
        style={{ display: movies.length <= 1 ? 'none' : undefined }}>
        Sort titles A-Z</Button>
      </Stack>
      <Stack alignItems="flex-end">
        <FormControl>
          <Select
            labelId="filter-by-format-label"
            id="format-filter-select"
            value={type}
            label="Filter by Type"
            sx={{ width: '300px' }}
            onChange={handleChange}>
            <MenuItem value="all">Show all</MenuItem>
            <MenuItem value="movie">Show only Movies</MenuItem>
            <MenuItem value="series">Show only Series</MenuItem>
          </Select>
        </FormControl>
        {filteredMovies.length > 0 && (
          <Typography variant="caption">
            {type} count: {filteredMovies.length}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default FunctionBar;
