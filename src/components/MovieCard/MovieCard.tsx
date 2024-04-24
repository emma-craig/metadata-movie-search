import React from 'react';

import {
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  Tooltip,
  IconButton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { IMovie } from '../../types/movies';

interface MovieCardProps {
  handleToggleFavourite: (isFav: boolean, id: string) => void;
  handleShowModal: (mov: IMovie) => void;
  isFavourite: boolean;
  mov: IMovie;
}

const MovieCard = ({
  handleToggleFavourite,
  handleShowModal,
  isFavourite,
  mov,
}: MovieCardProps) => {
  return (
    <Card sx={{ m: 2, width: '300px' }}>
      <CardMedia
        alt={`${mov.Title}`}
        aria-label="poster of the series or movie"
        component="img"
        height="200px"
        image={mov.Poster}
        onClick={() => {
          handleShowModal(mov);
        }}
      />
      <CardHeader title={mov.Title} />
      <CardActions>
        <Tooltip
          title={isFavourite ? 'remove from favourites' : 'add to favourites'}>
          <IconButton
            aria-label="button to add or remove from favourites"
            onClick={() => handleToggleFavourite(isFavourite, mov.imdbID)}>
            {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
