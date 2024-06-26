import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../components/error-boundary';
import '@testing-library/jest-dom'

// Мок компонента, который выбрасывает ошибку
const ProblemChild = () => {
  throw new Error('Error thrown from problem child');
  return <div>Error</div>; // Этот код не будет выполнен
};

describe('<ErrorBoundary />', () => {
  it('Displays the component, when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>no problems here</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('no problems here')).toBeInTheDocument();
  });

  it('Displays a message, when there is an error', () => {
    // Перехватываем ошибки в консоли, чтобы предотвратить их вывод во время теста
    const consoleError = console.error;
    console.error = jest.fn();

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    // Возвращаем оригинальный метод console.error
    console.error = consoleError;
  });
});

