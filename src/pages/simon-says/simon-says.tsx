import { useState, useEffect, useCallback } from 'react';
import { Box, Button, Snackbar, Alert } from '@mui/material';
import { Header } from '../../components/header';
import { ColorButton, GameBoard } from './simon-says.styled';

const colors = ['green', 'red', 'yellow', 'blue'];

export function SimonSaysGame() {
  const [sequence, setSequence] = useState<string[]>([colors[Math.floor(Math.random() * colors.length)]]);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [activeColor, setActiveColor] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const flashSequence = (sequence: string[]): void => {
    sequence.forEach((color, index) => {
      setTimeout(() => {
        setActiveColor(color);
        setTimeout(() => setActiveColor(''), 500);
      }, (index + 1) * 1000);
    });
  };

  const nextLevel = useCallback(() => {
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence([...sequence, nextColor]);
    setUserSequence([]);
    flashSequence([...sequence, nextColor]);
  }, [sequence]);

  const checkSequence = useCallback(() => {
    if (userSequence.length === 0) return;

    const isCorrect: boolean = userSequence.every((val, index) => val === sequence[index]);
    if (userSequence.length === sequence.length && isCorrect) {
      setMessage('Вы правильно повторили последовательность!');
      setOpen(true);
      nextLevel();
    } 
    else if (!isCorrect) {
      setMessage('Неправильно, попробуйте еще раз!');
      setOpen(true);
      setUserSequence([]);
    }
  }, [sequence, userSequence, nextLevel]);

  useEffect(() => {
    if (sequence.length === 0) {
      nextLevel()
      return;
    }
    checkSequence();
  }, [checkSequence, sequence, nextLevel]);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleColorClick = (color: string): void => {
    setUserSequence([...userSequence, color]);
    setActiveColor(color);
    setTimeout(() => setActiveColor(''), 500);
  };

  const startGame = (): void => {
    setSequence([]);
    setUserSequence([]);
  };

  return (
   <>
   <Header />
   <Box component="section" sx={{ display: 'flex', justifyContent: 'center', flexDirection: "column", height: '88vh' }}>
      <GameBoard elevation={3}>
        {colors.map(color => (
          <ColorButton
            data-testid={color}
            key={color}
            style={{ backgroundColor: activeColor === color ? color : 'grey' }}
            onClick={() => handleColorClick(color)}
          />
        ))}
      </GameBoard>
      <Box sx={{ mt: 2, textAlign: 'center'}}>
        <Button variant="contained" color="primary" onClick={startGame}>
          Начать игру
        </Button>
      </Box>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
   </>
  );
}

export default SimonSaysGame;
