import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('Тестирование рендера App', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  })
})

