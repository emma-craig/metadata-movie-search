import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';
import React from 'react';
import {Stack} from '@mui/material'

const App = () => {
  return (
    <Stack>
      <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/movie/:movieId"
          element={<Movie />}
        />
      </Routes></Router>
    </Stack>
  );
};

export default App;
