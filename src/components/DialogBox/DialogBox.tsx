import React, { ReactNode } from 'react';

import { Dialog } from '@mui/material';

import { IMovie } from '../../types/movies';

interface IDialogBox {
  isVisible: boolean;
  handleCloseModal: () => void;
  selectedMovie: IMovie | null;
  children: ReactNode;
}
export default function DialogBox({
  isVisible,
  handleCloseModal,
  selectedMovie,
  children,
}: IDialogBox) {
  return (
    <Dialog
      open={isVisible}
      onClose={handleCloseModal}>
      {children}
    </Dialog>
  );
}
