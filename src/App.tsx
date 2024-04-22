import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Movie from './components/Movies';
import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { useAppDispatch } from './hooks/hooks';
import { listMovies } from './slices/movieSlice';
import Movies from './components/Movies';

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
          <Route
            path="/movie/:movieId"
            element={<Movie />}
          />
        </Routes>
      </Router>
    </Stack>
  );
};

export default App;
