import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

export type AppSnackbarType = 'warning' | 'error' | 'success' | 'info';

type Props = {
  type: AppSnackbarType;
  message: string;
  open: boolean;
};

const AppSnackbar = ({ type, message, open }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
      style={{ marginTop: '50px' }}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
};

export default AppSnackbar;
