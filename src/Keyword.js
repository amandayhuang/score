import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import BlockIcon from "@material-ui/icons/Block";
import Footer from "./Footer";
import { keywords } from "./constants";

const HeightContainer = () => {
  const [keyword, setKeyword] = useState(null);

  const fetchKeyword = () => {
    const word = keywords[Math.floor(Math.random() * keywords.length)];
    setKeyword(word);
  };

  const nextHandler = () => {
    fetchKeyword();
  };

  if (!keyword) {
    fetchKeyword();
  }

  return (
    <>
      <Link to="/">
        <Box display="absolute" display="flex" alignItems="center">
          {" "}
          <ArrowBackIcon />
          <div> more games</div>
        </Box>
      </Link>
      <Box>
        <p variant="outlined" className="title game">
          {" "}
          text message keyword search
        </p>
        <p variant="outlined" className="title sub">
          Instructions: Each player searches their text messages for the keyword
          and reads aloud their favorite. Then the group votes on the winner.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Box
            display="flex"
            flexDirection="column"
            margin="0 auto"
            alignItems="flex-start"
          >
            <h4>Keyword</h4>
            <Box
              bgcolor="#0f08d1"
              borderRadius={6}
              color="white"
              padding={2}
              width="200px"
              textAlign="center"
              fontWeight="600"
              fontSize="30px"
            >
              {keyword}
            </Box>
            <Box
              onClick={nextHandler}
              display="flex"
              justifyContent="space-between"
              className="heightButton"
              marginTop="20px"
              alignItems="center"
            >
              <div>Next</div>
              <ArrowForwardIcon />
            </Box>
          </Box>
        </div>
      </Box>
      <Footer text={"Hope you're having fun."} />
    </>
  );
};

export default HeightContainer;
