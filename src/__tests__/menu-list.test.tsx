import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MenuListComposition } from '../components/menu-list';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('MenuListComposition', () => {
  it('MenuListComposition mounts properly', () => {
    const { container } = render(<MenuListComposition />);
    expect(container).toMatchSnapshot();

  });

  it('menu opens and closes on button click', async () => {
    render(
      <BrowserRouter>
        <MenuListComposition />
      </BrowserRouter>
    );

    // Проверяем, что меню закрыто изначально
    expect(screen.queryByText('Rock-Paper-Scissors')).not.toBeInTheDocument();

    // Кликаем по кнопке для открытия меню
    fireEvent.click(screen.getByText('Games'));
    expect(screen.queryByText('Rock-Paper-Scissors')).toBeInTheDocument();

    // Кликаем снова, чтобы закрыть меню
    fireEvent.click(screen.getByText('Games'));
    await waitFor(() => {
      expect(screen.queryByText('Rock-Paper-Scissors')).not.toBeInTheDocument();
    });
  });

  it('menu closes when an item is clicked', async () => {
    render(
      <BrowserRouter>
        <MenuListComposition />
      </BrowserRouter>
    );

    // Открываем меню
    fireEvent.click(screen.getByText('Games'));
    expect(screen.queryByText('Rock-Paper-Scissors')).toBeInTheDocument();

    // Кликаем по элементу меню
    fireEvent.click(screen.getByText('Rock-Paper-Scissors'));
    await waitFor(() => {
      expect(screen.queryByText('Rock-Paper-Scissors')).not.toBeInTheDocument();
    });
  });
});

