import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SnakeGame } from "../pages/snake";
import '@testing-library/jest-dom';

describe('SnakeGame', () => {
  it('SnakeGame mounts properly', () => {
    const { container } = render(<SnakeGame />);
    expect(container).toMatchSnapshot();
  })

  beforeEach(() => {
    render(<SnakeGame />);
  })

  it('The snake moves up, when the ArrowUp key is pressed', async () => {
    const snakeDot = screen.getByTestId('snake-dot');

    // Симулируем нажатие клавиши "ArrowUp"
    fireEvent.keyDown(document, { key: 'ArrowUp', code: 'ArrowUp' });

    // Проверяем, что голова змеи переместилась вверх
     await waitFor(() => {
      expect(snakeDot.style.top).toBe('180px');
    });
  });

  it('The snake moves down, when the ArrowDown key is pressed', async () => {
    const snakeDot = screen.getByTestId('snake-dot');

    // Симулируем нажатие клавиши "ArrowDown"
    fireEvent.keyDown(document, { key: 'ArrowDown', code: 'ArrowDown' });

    // Проверяем, что голова змеи переместилась вниз
     await waitFor(() => {
      expect(snakeDot.style.top).toBe('220px');
    });
  });

  it('The snake moves left, when the ArrowLeft key is pressed', async () => {
    const snakeDot = screen.getByTestId('snake-dot');

    // Симулируем нажатие клавиши "ArrowLeft"
    fireEvent.keyDown(document, { key: 'ArrowLeft', code: 'ArrowLeft' });

    // Проверяем, что голова змеи переместилась влево
     await waitFor(() => {
      expect(snakeDot.style.left).toBe('180px');
    });
  });

  it('The snake moves right, when the ArrowRight key is pressed', async () => {
    const snakeDot = screen.getByTestId('snake-dot');

    // Симулируем нажатие клавиши "ArrowRight"
    fireEvent.keyDown(document, { key: 'ArrowRight', code: 'ArrowRight' });

    // Проверяем, что голова змеи переместилась вправо
     await waitFor(() => {
      expect(snakeDot.style.left).toBe('220px');
    });
  });

  it('The snake moves up correctly on mobile devices', async () => {
    const snakeDot = screen.getByTestId('snake-dot');
    const gameZone = screen.getByTestId('game-zone');

    fireEvent.touchStart(gameZone, {
      changedTouches: [{ screenX: 50, screenY: 100 }]
    });

    fireEvent.touchMove(gameZone, {
      changedTouches: [{ screenX: 50, screenY: 50 }]
    });

    // Проверяем, что голова змеи переместилась вверх
     await waitFor(() => {
      expect(snakeDot.style.top).toBe('180px');
    });
  })
})