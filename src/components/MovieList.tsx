import {
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  Grid,
  Dialog,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const handleShowModal = (mov: any) => {
    setSelectedMovie(mov);
    setIsVisible(true);
  };
  const handleCloseModal = () => setIsVisible(false);

  const handleToggleFavourite = (fav: boolean, id: string) => {
    fav ? dispatch(removeFavourite(id)) : dispatch(addFavourite(id));
  };
  const favourites = useAppSelector(selectFavourites);
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
        spacing={2}>
        {movies && movies.length === 0 ? (
          <Typography>nothing to show</Typography>
        ) : (
          movies.map((mov: IMovie, index: number) => {
            const isFavourite = favourites.includes(mov.imdbID);

            return (
              <Card
                key={index}
                sx={{ m: 2, width: '300px' }}>
                <CardMedia
                  component="img"
                  alt={`${mov.Title}`}
                  height="200px"
                  image={mov.Poster}
                  onClick={() => {
                    handleShowModal(mov);
                  }}
                />
                <CardHeader title={mov.Title} />
                <CardActions>
                  <Tooltip
                    title={
                      isFavourite
                        ? 'remove from favourites'
                        : 'add to favourites'
                    }>
                    <IconButton
                      onClick={() =>
                        handleToggleFavourite(isFavourite, mov.imdbID)
                      }>
                      {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            );
          })
        )}
      </Grid>
    </>
  );
};
export default MovieList;
