import {
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  Button,
  Grid,
  Dialog,
} from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {
  addFavourite,
  removeFavourite,
  selectFavourites,
} from '../slices/movieSlice';
import { IMovie } from '../types/movies';

const MovieList = ({ movies }: { movies: IMovie[] }) => {
  const dispatch = useAppDispatch();
  const handleToggleFavourite = (fav: boolean, id: string) => {
    fav ? dispatch(removeFavourite(id)) : dispatch(addFavourite(id));
  };
  const favourites = useAppSelector(selectFavourites);
  return (
    <Grid
      container
      spacing={2}>
      {movies &&
        movies.map((mov: IMovie, index: number) => {
          const isFavourite = favourites.includes(mov.imdbID);
          const buttonText = isFavourite ? 'Remove favourite' : 'Add favourite';
          return (
            <Card
              key={index}
              sx={{ m: 2, width: '300px' }}>
              <CardMedia
                component="img"
                alt={`${mov.Title}`}
                height="200px"
                image={mov.Poster}></CardMedia>
              <CardHeader title={mov.Title} />
              <CardActions>
                <Button
                  onClick={() =>
                    handleToggleFavourite(isFavourite, mov.imdbID)
                  }>
                  {buttonText}
                </Button>
              </CardActions>
            </Card>
          );
        })}
    </Grid>
  );
};
export default MovieList;
