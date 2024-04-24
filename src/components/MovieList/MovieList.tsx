import { Grid, Dialog, Stack, Typography } from '@mui/material';

import React, { useState } from 'react';
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
import { Loading } from '../Loading/Loading';

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
        spacing={2}
        justifyContent="center">
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
