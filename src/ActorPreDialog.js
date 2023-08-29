import {
  Typography,
  Dialog,
  Button,
  Toolbar,
  IconButton,
  Box,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

const ActorPreDialog = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Box className="dialogBox">
          <ul>
            <li>name that actor in 5 guesses</li>
            <li>any matching letters will be revealed</li>
            <li>hints can be used for 1 guess each</li>
          </ul>
          <Button variant="outlined" color="secondary" onClick={setOpen(false)}>
            play
          </Button>
        </Box>
      </Dialog>
    </div>
  );
};

export default ActorPreDialog;
