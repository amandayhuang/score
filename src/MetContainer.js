import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import BlockIcon from "@material-ui/icons/Block";
import Footer from "./Footer";
import { artObjects } from "./constants";
import axios from "axios";

const MetContainer = () => {
  const [objectData, setObjectData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [num, setNum] = useState(0);

  const fetchObject = async () => {
    const randNum = Math.floor(Math.random() * (artObjects.length + 1));

    try {
      const data = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artObjects[randNum]}`
      );
      setObjectData([data]);
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const skipHandler = () => {
    setShowDetails(false);
    setNum(num + 1);
  };

  const revealHandler = () => {
    setShowDetails(true);
  };

  useEffect(() => {
    fetchObject();
  }, [num]);

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
          learn about some art from The Met
        </p>
        {/* <p variant="outlined" className="title sub">
          {" "}
          Inspired by that scene from{" "}
          <a href="https://www.imdb.com/title/tt5024912/" target="_blank">
            Insecure
          </a>
          , Season 4 Episode 9.
        </p> */}
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {objectData.map((ele) => {
            return (
              <Box
                display="flex"
                flexDirection="column"
                margin="0 auto"
                alignItems="flex-start"
              >
                <h4 className="artTitle">{ele.data.title}</h4>
                <img
                  src={ele.data.primaryImage}
                  width="300"
                  alt={ele.data.title}
                  onError={(e) => {
                    setNum(num + 1);
                  }}
                />

                {showDetails ? (
                  <Box width="300">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      className="heightButton"
                    >{`${ele.data.artistDisplayName} (${ele.data.objectDate})`}</Box>
                    <Box
                      onClick={skipHandler}
                      display="flex"
                      justifyContent="space-between"
                      className="heightButton"
                    >
                      <div>Next</div>
                      <ArrowForwardIcon />
                    </Box>
                  </Box>
                ) : (
                  <Box width="300px">
                    <Box
                      onClick={revealHandler}
                      display="flex"
                      justifyContent="space-between"
                      className="heightButton"
                    >
                      <div>Reveal Artist</div>
                      <ArrowForwardIcon />
                    </Box>
                    <Box
                      onClick={skipHandler}
                      display="flex"
                      justifyContent="space-between"
                      className="heightButton"
                    >
                      <div>Skip</div>
                      <BlockIcon />
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </div>
      </Box>
      <Footer text={"Art is for everyone."} />
    </>
  );
};

export default MetContainer;
