import React, { useMemo } from 'react';
import { useAppSelector } from '../hooks/hooks';
import { selectFavourites, selectMovies } from '../slices/movieSlice';
import { List, ListItem, Stack } from '@mui/material';

const FavouritesList = () => {
  const movies = useAppSelector(selectMovies);
  const favourites = useAppSelector(selectFavourites);
  const favouriteMoviesList = useMemo(
    () => movies.filter(movie => favourites.includes(movie.imdbID)),
    [favourites, movies]
  );
  return (
    <Stack p={8}>
      {favouriteMoviesList &&
        favouriteMoviesList.map((fav, index) => (
          <List key={index}>
            <ListItem>{fav.Title}</ListItem>
          </List>
        ))}
    </Stack>
  );
};

export default FavouritesList;
