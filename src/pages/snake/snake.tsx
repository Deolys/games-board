import { useState, useEffect, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Paper, Snackbar, Alert } from '@mui/material';
import { Header } from '../../components/header';
import { GameArea, SnakeDot } from './snake.styled';

type Direction = 'RIGHT' | 'LEFT' | 'UP' | 'DOWN';

export function SnakeGame() {
  const [snakeDots, setSnakeDots] = useState<number[][]>([[10, 10]]);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [food, setFood] = useState<number[]>([4, 4]);
  const speed = 200;
  const [gameOver, setGameOver] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  
    const onGameOver = (): void => {
      setGameOver(true);
    };

    useEffect(() => {  
      if (gameOver) {
        setOpen(true);
        setMessage(`Игра окончена. Ваш счет: ${snakeDots.length}`);
        setSnakeDots([[10,10]]);
        setDirection('RIGHT');
        setFood([4,4]);
        setGameOver(false);
      }
    }, [gameOver, snakeDots.length])

    const checkIfEat = useCallback((head: number[], foodPosition: number[]): boolean => {

      if (head[0] === foodPosition[0] && head[1] === foodPosition[1]) {
        let newFoodPosition: number[];
        do {
          newFoodPosition = [Math.floor(Math.random() * (20)), Math.floor(Math.random() * (20))];
        } while (snakeDots.some(dot => dot[0] === newFoodPosition[0] && dot[1] === newFoodPosition[1]));
        setFood(newFoodPosition);
        return true;
      }
      return false;
    }, [snakeDots]);
  
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent): void  => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const moveSnake = useCallback(() => {
    const newSnakeDots = [...snakeDots];
    let head = newSnakeDots[newSnakeDots.length - 1];

    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 1, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 1, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 1];
        break;
      case 'UP':
        head = [head[0], head[1] - 1];
        break;
      default:
        return;
    }

    const snakeBody = newSnakeDots.slice(0, -1);
    snakeBody.forEach((dot) => {
        if (head[0] === dot[0] && head[1] === dot[1]) {
          onGameOver();
        }
      });

    if (head[0] >= 20 || head[1] >= 20 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
    
    newSnakeDots.push(head);
    newSnakeDots.shift();
    setSnakeDots(newSnakeDots);
    if (checkIfEat(head, food))
      setSnakeDots(prevSnake => [[], ...prevSnake]);

  }, [direction, food, snakeDots, checkIfEat]);

  useEffect(() => {
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  let touchStartX: number | null = null;
  let touchStartY: number | null = null;

const handleTouchStart = (e: React.TouchEvent): void  => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
};

const handleTouchMove = (e: React.TouchEvent): void  => {
  if (!touchStartX || !touchStartY) {
    return;
  }

  const touchEndX = e.changedTouches[0].screenX;
  const touchEndY = e.changedTouches[0].screenY;

  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (diffX > 0) {
      setDirection('LEFT');
    } else {
      setDirection('RIGHT');
    }
  } else {
    if (diffY > 0) {
      setDirection('UP');
    } else {
      setDirection('DOWN');
    }
  }

  e.preventDefault();
};
  
    return (
      <>
      <Header />
      <Paper onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} data-testid='game-zone'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Игра "Змейка" на React с Material-UI
            </Typography>
          </Toolbar>
        </AppBar>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <GameArea>
          {snakeDots.map((dot, index) => {
            const style = {
              left: `${dot[0]*20}px`,
              top: `${dot[1]*20}px`
            };

            return <SnakeDot key={index} style={style} data-testid="snake-dot"/>;
          })}
          <SnakeDot style={{ left: `${food[0]*20}px`, top: `${food[1]*20}px`, backgroundColor: 'red' }} />
        </GameArea>
      </Paper>
      </>
    );
  }
  
  export default SnakeGame;