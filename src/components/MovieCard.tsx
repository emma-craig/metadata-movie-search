import {
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  Tooltip,
  IconButton,
} from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IMovie } from '../types/movies';

interface MovieCardProps {
  handleToggleFavourite: (isFav: boolean, id: string) => void;
  handleShowModal: (mov: IMovie) => void;
  index: number;
  mov: IMovie;
  isFavourite: boolean;
}
const MovieCard = ({
  handleToggleFavourite,
  handleShowModal,
  index,
  mov,
  isFavourite,
}: MovieCardProps) => {
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
          title={isFavourite ? 'remove from favourites' : 'add to favourites'}>
          <IconButton
            onClick={() => handleToggleFavourite(isFavourite, mov.imdbID)}>
            {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
