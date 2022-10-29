import { Box, Modal, CircularProgress } from '@mui/material';
import './LoadingSpinner.scss';

type Props = {
  isOpen: boolean;
};

const LoadingSpinner = ({ isOpen }: Props) => {
  return (
    <Modal open={isOpen}>
      <Box className="loading-spinner-container">
        <CircularProgress />
      </Box>
    </Modal>
  );
};

export default LoadingSpinner;
