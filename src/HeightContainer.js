import React, { useEffect, useState } from "react";
import { useEasybase } from "easybase-react";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import BlockIcon from "@material-ui/icons/Block";
import Footer from "./Footer";

const HeightContainer = () => {
  const [easybaseData, setEasybaseData] = useState([]);
  const [showHeight, setShowHeight] = useState(false);
  const [numPeople, setNumPeople] = useState(0);
  const { db } = useEasybase();

  const fetchPerson = async () => {
    const randNum = Math.floor(Math.random() * (640 + 1));
    const ebData = await db("PEOPLE").return().limit(1).offset(randNum).all();
    setEasybaseData(ebData);
  };

  const skipHandler = () => {
    setShowHeight(false);
    setNumPeople(numPeople + 1);
  };

  const revealHandler = () => {
    setShowHeight(true);
  };

  useEffect(() => {
    fetchPerson();
  }, [numPeople]);

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
          guess the famous person's height
        </p>
        <p variant="outlined" className="title sub">
          {" "}
          Inspired by that scene from{" "}
          <a href="https://www.imdb.com/title/tt5024912/" target="_blank">
            Insecure
          </a>
          , Season 4 Episode 9.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {easybaseData.map((ele) => {
            return (
              <Box
                display="flex"
                flexDirection="column"
                margin="0 auto"
                alignItems="flex-start"
              >
                <h4>{ele.name}</h4>
                <img
                  src={ele.imglink}
                  width="200"
                  alt={ele.name}
                  onError={(e) => {
                    setNumPeople(numPeople + 1);
                  }}
                />

                {showHeight ? (
                  <Box width="200">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      className="heightButton"
                    >{`${ele.heightfeet}' ${ele.heightinches}"`}</Box>
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
                  <Box width="200px">
                    <Box
                      onClick={revealHandler}
                      display="flex"
                      justifyContent="space-between"
                      className="heightButton"
                    >
                      <div>Reveal Height</div>
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
      <Footer
        text={"Height data provided by IMDb, you can blame them if it's wrong."}
      />
    </>
  );
};

export default HeightContainer;
