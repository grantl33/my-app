import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import {
  WEEKEND_AVAILABLE_TIMES,
  WEEKDAY_AVAILABLE_TIMES
} from './Main';

test('renders page and can click reservations', () => {
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
  const reservationsLink = screen.getByTestId("nav-reservations");
  expect(reservationsLink).toBeInTheDocument();
});

test('reservation avaiable times changes according to date', () => {
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
  const reservationsLink = screen.getByTestId("nav-reservations");
  fireEvent.click(reservationsLink);

  const dateInput = screen.getByTestId("res-date");
  const timeInput = screen.getByTestId("res-time");
  expect(dateInput).toBeInTheDocument();
  expect(timeInput).toBeInTheDocument();
  fireEvent.change(dateInput, {
    target: {
      value: "2023-11-18" /* Saturday */
    }
  });
  const timeOptionsSaturday = screen.getAllByTestId("res-time-option");
  const optionValuesSaturday = timeOptionsSaturday.map((item) => item.value);
  expect(optionValuesSaturday).toEqual(WEEKEND_AVAILABLE_TIMES);
  fireEvent.change(dateInput, {
    target: {
      value: "2023-11-20" /* Monday */
    }
  });
  const timeOptionsMonday = screen.getAllByTestId("res-time-option");
  const optionValuesMonday = timeOptionsMonday.map((item) => item.value);
  expect(optionValuesMonday).toEqual(WEEKDAY_AVAILABLE_TIMES);
});
