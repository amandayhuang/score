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

const ActorPostDialog = ({
  open,
  setOpen,
  isWinner,
  guessesUsed,
  hintsUsed,
  url,
  name,
}) => {
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
          {isWinner ? (
            <Typography>
              Congrats! You found the answer in {guessesUsed - hintsUsed}{" "}
              {guessesUsed - hintsUsed === 1 ? "guess" : "guesses"} with{" "}
              {hintsUsed} {hintsUsed === 1 ? "hint" : "hints"}. Come back
              tomorrow for another round.{" "}
            </Typography>
          ) : (
            <Typography>
              Sorry, you didn't get it this time. Come back tomorrow for another
              round.
            </Typography>
          )}
          <Box>
            <h4>{name}</h4>
            <img src={url} width="200" alt={name} />
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default ActorPostDialog;
