import { Grid, Dialog, Stack, Typography, Button } from '@mui/material';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  addFavourite,
  removeFavourite,
  selectFavourites,
  sortMovies,
} from '../slices/movieSlice';
import { IMovie } from '../types/movies';
import MovieCard from './MovieCard';
import EmptyState from './EmptyState';

const MovieList = ({ movies }: { movies: IMovie[] }) => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const handleShowModal = (mov: IMovie) => {
    setSelectedMovie(mov);
    setIsVisible(true);
  };
  const handleCloseModal = () => setIsVisible(false);

  const handleToggleFavourite = (fav: boolean, id: string) => {
    fav ? dispatch(removeFavourite(id)) : dispatch(addFavourite(id));
  };
  const favourites = useAppSelector(selectFavourites);
  const handleSort = () => {
    dispatch(sortMovies());
  };
  return (
    <>
      <Button
        onClick={handleSort}
        style={{ display: movies.length === 0 ? 'none' : undefined }}>
        Click to sort alphabetically
      </Button>

      <Dialog
        open={isVisible}
        onClose={handleCloseModal}>
        {selectedMovie && (
          <Stack
            width="70vw"
            p={8}>
            <Typography>Title: {selectedMovie.Title}</Typography>
            <Typography>Year: {selectedMovie.Year}</Typography>
            <Typography>ID: {selectedMovie.imdbID}</Typography>
            <Typography>Type: {selectedMovie.Type}</Typography>
          </Stack>
        )}
      </Dialog>
      <Grid
        container
        spacing={2}>
        {movies && movies.length === 0 ? (
          <EmptyState message="No series or movies found for this search. Please try again with a new search term" />
        ) : (
          movies.map((mov: IMovie, index: number) => {
            const isFavourite = favourites.includes(mov.imdbID);
            return (
              <MovieCard
                handleToggleFavourite={handleToggleFavourite}
                handleShowModal={handleShowModal}
                mov={mov}
                isFavourite={isFavourite}
                key={index}
              />
            );
          })
        )}
      </Grid>
    </>
  );
};
export default MovieList;
