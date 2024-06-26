import { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import rockIcon from "../../assets/icons/rock.svg";
import paperIcon from "../../assets/icons/paper.svg";
import scissorsIcon from "../../assets/icons/scissors.svg";
import { Header } from "../../components/header";

interface Choice {
  name: string;
  image: string;
}

const choices: Choice[] = [
  { name: "камень", image: rockIcon },
  { name: "ножницы", image: scissorsIcon}, 
  { name: "бумага", image: paperIcon},
];

export function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [userScore, setUserScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [result, setResult] = useState<string>("");

  const play = (choice: Choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setUserChoice(choice);
    setComputerChoice(computerChoice);
    determineWinner(choice.name, computerChoice.name);
  };

  const determineWinner = (user: string, computer: string) => {
    if (user === computer) {
      setResult("Ничья!");
    } else if (
      (user === "камень" && computer === "ножницы") ||
      (user === "ножницы" && computer === "бумага") ||
      (user === "бумага" && computer === "камень")
    ) {
      setResult("Вы выиграли!");
      setUserScore((prev) => prev + 1);
    } else {
      setResult("Вы проиграли!");
      setComputerScore((prev) => prev + 1);
    }
  };

  return (
    <>
      <Header />
    <Paper style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <Typography variant="h4" align="center">
        Камень, Ножницы, Бумага
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", minHeight: "180px", mt: 3}}>
      <Box sx={{display: "flex", flexDirection: "column"}}>
        <Typography variant="h5" align="center">
          Ваш выбор:
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", my: 3}}>
        {userChoice && <img src={userChoice.image} alt={userChoice.name}/>}
        </Box>
      </Box>
      <Box sx={{display: "flex", flexDirection: "column"}}>
      <Typography variant="h5" align="center">
        Выбор ИИ:
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", my: 3}}>
      {computerChoice && <img src={computerChoice.image} alt={computerChoice.name}/>}
      </Box>
      </Box>
      </Box>
      <Typography
        variant="h5"
        align="center"
        style={{ color: result.includes("выиграли") ? "green" : "red" }}
      >
        Результат: {result}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h6" align="center">
          Ваш счёт: {userScore}
        </Typography>
        <Typography variant="h6" align="center">
          Счёт ИИ: {computerScore}
        </Typography>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        {choices.map((choice) => (
            <Button
            variant="contained"
            onClick={() => play(choice)}
            style={{ margin: "0 10px" }}
            key={choice.name}
          >
            {choice.name}
          </Button>
        ))}
      </Box>
    </Paper>
    </>
  );
}

export default RockPaperScissors;
