import { fireEvent, render, screen } from "@testing-library/react"
import { TicTacToe } from "../pages/tic-tac-toe"

describe('TicTacToe', () => {
  it('TicTacToe mounts properly', () => {
    const { container } = render(<TicTacToe />);
    expect(container).toMatchSnapshot();
  })

  it('When clicked, a cross or zero is placed', () => {
    const { container } = render(<TicTacToe />);
    const boardCells = container.querySelectorAll('.MuiButton-outlinedPrimary');

    fireEvent.click(boardCells[0]);
    expect(boardCells[0].innerHTML[0]).toBe('X');

    fireEvent.click(boardCells[1]);
    expect(boardCells[1].innerHTML[0]).toBe('O');
  })

  it('Claculates winner correctly', () => {
    const { container } = render(<TicTacToe />);
    const boardCells = container.querySelectorAll('.MuiButton-outlinedPrimary');
    const status = screen.getByText(/Next player: X/i);
    
    fireEvent.click(boardCells[0]);
    fireEvent.click(boardCells[4]);
    fireEvent.click(boardCells[1]);
    fireEvent.click(boardCells[5]);
    fireEvent.click(boardCells[2]);

    expect(status.innerHTML).toBe('Winner: X');
  })
})