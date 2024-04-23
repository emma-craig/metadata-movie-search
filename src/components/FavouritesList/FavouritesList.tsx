import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectFavourites, selectMovies } from '../../slices/movieSlice';
import { List, ListItem, Stack, Typography } from '@mui/material';
import EmptyState from '../EmptyState/EmptyState';

const FavouritesList = () => {
  const movies = useAppSelector(selectMovies);
  const favourites = useAppSelector(selectFavourites);
  const favouriteMoviesList = useMemo(
    () => movies.filter((movie) => favourites.includes(movie.imdbID)),
    [favourites, movies]
  );
  return (
    <Stack p={1}>
      {favouriteMoviesList && favouriteMoviesList.length === 0 ? (
        <EmptyState message="You do not have any favourites in the current search" />
      ) : (
        favouriteMoviesList.map((fav, index) => (
          <List key={index}>
            <ListItem>
              <Stack>
                <Typography>Title: {fav.Title}</Typography>
                <Typography>Year: {fav.Year}</Typography>
                <Typography>ID: {fav.imdbID}</Typography>
                <Typography>Type: {fav.Type}</Typography>
              </Stack>
            </ListItem>
          </List>
        ))
      )}
    </Stack>
  );
};

export default FavouritesList;
