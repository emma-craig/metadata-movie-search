import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Movie from './components/Movie';

const App = () => {
  return (
    <div>
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
      </Routes>
    </div>
  );
};

export default App;
