import React, { useState } from 'react';

import { Grid, Stack, Typography } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  addFavourite,
  removeFavourite,
  selectFavourites,
  selectStatus,
} from '../../slices/movieSlice';
import { IMovie } from '../../types/movies';

import MovieCard from '../MovieCard/MovieCard';
import EmptyState from '../EmptyState/EmptyState';
import Loading from '../Loading/Loading';
import DialogBox from '../DialogBox/DialogBox';

const MovieList = ({ movies }: { movies: IMovie[] }) => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectFavourites);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const status = useAppSelector(selectStatus);

  if (status === 'loading') {
    return <Loading />;
  }

  const handleShowModal = (mov: IMovie) => {
    setSelectedMovie(mov);
    setIsVisible(true);
  };

  const handleCloseModal = () => setIsVisible(false);

  const handleToggleFavourite = (fav: boolean, id: string) => {
    fav ? dispatch(removeFavourite(id)) : dispatch(addFavourite(id));
  };

  return (
    <>
      <DialogBox
        aria-label="component to show additional details of the movie or series"
        handleCloseModal={handleCloseModal}
        isVisible={isVisible}
        selectedMovie={selectedMovie}>
        {selectedMovie && (
          <Stack
            flexDirection="row"
            p={2}>
            <Stack
              alignContent="center"
              p={8}>
              <Typography>Title: {selectedMovie.Title}</Typography>
              <Typography>Year: {selectedMovie.Year}</Typography>
              <Typography>ID: {selectedMovie.imdbID}</Typography>
              <Typography>Type: {selectedMovie.Type}</Typography>
            </Stack>
            <img
              alt={selectedMovie.Title}
              src={selectedMovie.Poster}
              width="150px"
            />
          </Stack>
        )}
      </DialogBox>
      <Grid
        container
        justifyContent="center"
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
                isFavourite={isFavourite}
                key={index}
                mov={mov}
              />
            );
          })
        )}
      </Grid>
    </>
  );
};
export default MovieList;
