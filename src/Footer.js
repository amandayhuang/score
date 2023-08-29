import React from "react";
import { Box } from "@material-ui/core";

const Footer = ({ text }) => {
  return (
    <Box className="footer" margin="30px auto">
      {text}
    </Box>
  );
};

export default Footer;
