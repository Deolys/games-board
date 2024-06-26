import { Routes, Route } from 'react-router-dom';
import { TicTacToe } from './pages/tic-tac-toe';
import { SimonSaysGame } from './pages/simon-says';
import { SnakeGame } from './pages/snake';
import { RockPaperScissors } from './pages/rock-paper-scissors';
import { MainPage } from './pages/main';
import { ErrorBoundary } from './components/error-boundary';

export const PageRoutes = () => (
  <ErrorBoundary>
    <Routes>
      <Route path="/" element={<MainPage />}  />
      <Route path="/tic-tac-toe" element={<TicTacToe />}  />
      <Route path="/simon-says" element={<SimonSaysGame />}  />
      <Route path="/snake" element={<SnakeGame />}  />
      <Route path="/rock-paper-scissors" element={<RockPaperScissors  />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  </ErrorBoundary>
)
