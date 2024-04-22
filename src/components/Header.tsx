import React, { FormEvent, useState } from 'react';
import { listMovies } from '../slices/movieSlice';
import { IconButton, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../hooks/hooks';
const Header = () => {
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm === '') return alert('Please enter search term!');

    dispatch(listMovies(searchTerm));
  };
  return (<Stack alignItems='center' >
    <form onSubmit={handleSubmit}>
      <Stack flexDirection='row'>
      <TextField
        id="search-bar"
        className="text"
        label="Enter a movie or series"
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        size="small"
      />
      <IconButton
        type="submit"
        aria-label="search">
        <SearchIcon style={{ fill: 'blue' }} />
      </IconButton></Stack>
    </form></Stack>
  );
};

export default Header;
