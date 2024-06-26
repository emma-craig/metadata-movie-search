import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Stack } from '@mui/material';

import Header from './components/Header/Header';
import { useAppDispatch } from './hooks/hooks';
import { listMovies } from './slices/movieSlice';
import Movies from './components/Movies/Movies';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(listMovies('batman'));
  }, [dispatch]);

  return (
    <Stack>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Movies />}
          />
        </Routes>
      </Router>
    </Stack>
  );
};

export default App;
