import React from 'react';
import {  useAppSelector } from '../hooks/hooks';
import { selectMovies } from '../slices/movieSlice';
import { Box, Button, Card, CardActions, CardHeader, CardMedia } from '@mui/material';
import { IMovie } from '../types/movies';

const Movies = () => {
  const movies = useAppSelector(selectMovies);

  return <Box>
    {movies && movies.map((mov: IMovie, index: number) => (
      <Card>
        <CardMedia
        component="img"
        alt={`${mov.Title}`}
        height='200px'
        image={mov.Poster} />
        <CardHeader title={mov.Title} />
        <CardActions>
          <Button onClick={() => {}}>Add / remove favourite</Button>
        </CardActions>
      </Card>
    ))}
  </Box>;
};

export default Movies;
