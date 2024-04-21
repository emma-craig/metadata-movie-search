import React, { FormEvent, useState } from 'react';
import { listMovies } from '../slices/movieSlice';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../hooks/hooks';
const Header = () => {
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm === '') return alert('Please enter search term!');

    dispatch(listMovies(searchTerm));
    setSearchTerm('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="search-bar"
        className="text"
        label="Enter a movie or series"
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
      </IconButton>
    </form>
  );
};

export default Header;
