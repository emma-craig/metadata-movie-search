import {
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectFavourites } from '../../slices/movieSlice';
import { IMovie } from '../../types/movies';

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
  const favourites = useAppSelector(selectFavourites);

  return (
    <Stack
      my={4}
      gap={1}
      flexDirection="row"
      justifyContent="space-between">
      <Stack>
        <Typography>Number of favourites: {favourites.length}</Typography>
        <Button onClick={handleShowModal}>View Favourites</Button>
      </Stack>
      <Stack alignItems="flex-end">
        <FormControl>
          <InputLabel id="demo-simple-select-label">Filter by type</InputLabel>
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
          {type} count: {filteredMovies.length}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default FunctionBar;
