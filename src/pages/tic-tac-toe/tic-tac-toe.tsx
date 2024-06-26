import { useState } from 'react';
import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import { Header } from '../../components/header';

interface SquareProps {
  value: 'X' | 'O' | null;
  onSquareClick: () => void;
}

interface BoardProps {
  xIsNext: boolean;
  squares: Array<'X' | 'O' | null>;
  onPlay: (squares: Array<'X' | 'O' | null>) => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <Button variant="outlined" sx={{ width: 70, height: 70, m: 0.5 }} onClick={onSquareClick}>
      {value}
    </Button>
  );
}

function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  if (!squares.includes(null)  &&  winner ===  null ){
    status = 'It\'s a tie';
  }

  return (
    <>
      <Header />
      <Typography sx={{textAlign: "center", my: 2}}>{status}</Typography>
      <Stack sx={{flexDirection: "row"}}>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </Stack>
      <Stack sx={{flexDirection: "row"}}>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </Stack>
      <Stack sx={{flexDirection: "row"}}>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </Stack>
    </>
  );
}

export default function TicTacToe() {
  const [history, setHistory] = useState<Array<Array<'X' | 'O' | null>>>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: Array<'X' | 'O' | null>) => {
    const nextHistory = history.slice(0, currentMove + 1).concat([nextSquares]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };


  const moves = history.map((_squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <ListItem divider key={move} sx={{display:  "flex", justifyContent: "center"}}>
        <Button variant="outlined" onClick={() => jumpTo(move)}>{description}</Button>
      </ListItem>
    );
  });

  return (
    <Box component="section" sx={{display:  "flex", flexDirection:  "column", alignItems:  "center"}}>
      <Box width="100">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </Box>
      <Box>
        <List>{moves}</List>
      </Box>
    </Box>
  );
}

function calculateWinner(squares: Array<'X' | 'O' | null>): 'X' | 'O' | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}