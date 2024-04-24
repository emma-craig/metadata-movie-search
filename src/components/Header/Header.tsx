import React, { FormEvent, useState } from 'react';

import { InputAdornment, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { listMovies } from '../../slices/movieSlice';
import { useAppDispatch } from '../../hooks/hooks';

const Header = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm === '') return alert('Please enter search term!');
    dispatch(listMovies(searchTerm));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack flexDirection="row">
        <TextField
          aria-label="search field to search database for movies and series"
          fullWidth
          id="search-bar"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          label="Enter the title of a movie or series"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          size="small"
          value={searchTerm}
          variant="outlined"
        />
      </Stack>
    </form>
  );
};

export default Header;
