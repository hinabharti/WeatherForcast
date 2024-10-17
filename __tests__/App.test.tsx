import 'react-native';
import App from '../App';

import {render, screen} from '@testing-library/react-native';

it('should render the App', () => {
  render(<App />);

  expect(
    screen.getByText('Open up App.tsx to start working on your app!'),
  ).toBeTruthy();
});
