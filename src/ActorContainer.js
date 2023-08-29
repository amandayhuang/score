import React, { useEffect, useState } from "react";
import { useEasybase } from "easybase-react";
import {
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  LinearProgress,
  InputAdornment,
  BottomNavigation,
  Chip,
} from "@material-ui/core";
import Footer from "./Footer";
import "./Actor.css";
import moment from "moment";
import ActorPostDialog from "./ActorPostDialog";
import ActorPreDialog from "./ActorPreDialog";
import axios from "axios";

const ActorContainer = () => {
  const GUESSES = 5;
  const [easybaseData, setEasybaseData] = useState([]);
  const [firstNameAnswer, setFirstNameAnswer] = useState([]);
  const [lastNameAnswer, setLastNameAnswer] = useState([]);
  const [firstNameGuess, setFirstNameGuess] = useState([]);
  const [lastNameGuess, setLastNameGuess] = useState([]);
  const [hints, setHints] = useState([]);
  const [guessesLeft, setGuessesLeft] = useState(GUESSES);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [firstNameInput, setFirstNameInput] = useState([]);
  const [lastNameInput, setLastNameInput] = useState([]);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isWinner, setIsWinner] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [openPre, setOpenPre] = useState(true);

  const { db } = useEasybase();

  const fetchPerson = async () => {
    const randNum = Math.floor(Math.random() * (471 + 1));
    const ebData = await db("CELEB").return().limit(1).offset(randNum).all();
    if (ebData.length) {
      console.log("EB", ebData);
      const data = ebData[0];
      setEasybaseData(data);
      setFirstNameAnswer(data.firstname.toUpperCase().split(""));
      setLastNameAnswer(data.lastname.toUpperCase().split(""));
      setFirstNameGuess(
        data.firstname
          .toUpperCase()
          .split("")
          .map((l, i) => (i === 0 ? l : "-"))
      );
      setLastNameGuess(
        data.lastname
          .toUpperCase()
          .split("")
          .map((l, i) => (i === 0 ? l : "-"))
      );
      const years = moment().diff(data.dob, "years");
      setHints([
        {
          title: "reveal date of birth",
          hint: `${moment(data.dob).format("MMMM Do, YYYY")} (${years} years)`,
          revealed: false,
        },
        {
          title: "reveal acting credit",
          hint: `${data.firsttitle} (${data.firstyear})`,
          revealed: false,
        },
        {
          title: "reveal acting credit",
          hint: `${data.lasttitle} (${data.lastyear})`,
          revealed: false,
        },
      ]);
    }
  };

  const checkName = (answer, input, guess, type) => {
    const newGuess = [...guess];
    let matches = 0;
    answer.forEach((letter, i) => {
      if (letter === input[i]) {
        newGuess[i] = letter;
        matches = matches + 1;
      }
    });
    if (type === "first") {
      setFirstNameGuess(newGuess);
    } else {
      setLastNameGuess(newGuess);
    }

    return matches === answer.length ? true : false;
  };

  const checkGuess = () => {
    const checkFirst = checkName(
      firstNameAnswer,
      firstNameInput,
      firstNameGuess,
      "first"
    );
    const checkLast = checkName(
      lastNameAnswer,
      lastNameInput,
      lastNameGuess,
      "last"
    );

    if (checkFirst && checkLast) setIsWinner(true);
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  useEffect(() => {
    const insertResult = async () => {
      const geo = await axios.get("https://geolocation-db.com/json/");
      db("RESULTS")
        .insert({
          ip: geo.data.IPv4,
          dateCreated: new Date(),
          isWinner,
          numGuesses: GUESSES - guessesLeft - hintsUsed,
          numHints: hintsUsed,
          actorName: `${easybaseData.firstname} ${easybaseData.lastname}`,
          city: geo.data.city,
          countryCode: geo.data.country_code,
          countryName: geo.data.country_name,
          postal: geo.data.postal,
          state: geo.data.state,
          latitude: geo.data.latitude,
          longitude: geo.data.longitude,
        })
        .one();
    };
    if (guessesLeft === 0 || isWinner) {
      setOpenPost(true);
      insertResult();
    }
  }, [guessesLeft, isWinner]);

  useEffect(() => {
    if (firstNameAnswer.length > 1) checkGuess();
  }, [firstNameInput, lastNameInput]);

  const revealHandler = (index) => {
    if (guessesLeft > 0) setGuessesLeft(guessesLeft - 1);
    const newHints = [...hints];
    newHints[index].revealed = true;
    setHints(newHints);
    setHintsUsed(hintsUsed + 1);
  };

  const guessHandler = (e) => {
    e.preventDefault();
    const guess = e.target.guess.value;
    const parts = guess.split(" ");
    if (parts.length !== 2) {
      setError(true);
      setErrorText("submit a first and last name please");
    } else {
      setError(false);
      setErrorText("");
      setFirstNameInput(parts[0].toUpperCase());
      setLastNameInput(parts[1].toUpperCase());
      if (guessesLeft > 0) setGuessesLeft(guessesLeft - 1);
    }
    const guessInput = document.getElementById("guess");
    guessInput.value = "";
  };

  return (
    <>
      <AppBar position="sticky" className="appBar">
        <Toolbar>
          <Box
            display="flex"
            justifyContent={"space-between"}
            alignItems={"center"}
            width="100%"
          >
            <Box className="guessTitle">{"name that actor"}</Box>
            <Box>
              <Chip
                label={guessesLeft}
                color="secondary"
                className="guessChip"
              />
              {`guesses`}
            </Box>
          </Box>
        </Toolbar>
        {!easybaseData.firstname && <LinearProgress />}
      </AppBar>
      {easybaseData.firstname && (
        <Box display="flex" justifyContent="center" alignItems={"center"}>
          <Box maxWidth={"700px"}>
            <Box display="flex" flexDirection="column">
              <Chip
                className="hintChip"
                label="hints (cost 1 guess)"
                color="primary"
              />
              {hints.map((hint, index) =>
                hint.revealed ? (
                  <Chip
                    className="hintChip"
                    label={hint.hint}
                    color="primary"
                  />
                ) : guessesLeft > 0 ? (
                  <Chip
                    onClick={() => revealHandler(index)}
                    className="hintChip"
                    color="secondary"
                    label={hint.title}
                  />
                ) : (
                  <Chip
                    className="hintChip"
                    label={hint.title}
                    disabled
                    color="secondary"
                  />
                )
              )}
            </Box>
            <Box mt={4}>
              <Box display="flex">
                {firstNameGuess.map((letter) => (
                  <Box className="letter">{letter}</Box>
                ))}
              </Box>
              <Box display="flex">
                {lastNameGuess.map((letter) => (
                  <Box className="letter">{letter}</Box>
                ))}
              </Box>
            </Box>
            {guessesLeft > 0 && !isWinner && (
              <Box width="100%">
                <form onSubmit={(e) => guessHandler(e)} className="form">
                  <TextField
                    fullWidth
                    label="enter guess"
                    variant="outlined"
                    name="guess"
                    error={error}
                    helperText={errorText}
                    id="guess"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button type="submit" color="primary">
                            submit
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </form>
              </Box>
            )}
          </Box>
          <ActorPostDialog
            open={openPost}
            setOpen={setOpenPost}
            isWinner={isWinner}
            hintsUsed={hintsUsed}
            guessesUsed={GUESSES - guessesLeft}
            name={`${easybaseData.firstname} ${easybaseData.lastname}`}
            url={easybaseData.url}
          />
        </Box>
      )}

      {!easybaseData.firstname && (
        <Footer text={"Just as fun as wordle right?"} />
      )}
    </>
  );
};

export default ActorContainer;
