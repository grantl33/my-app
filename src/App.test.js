import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders page and can click reservations', () => {
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
  const reservationsLink = screen.getByTestId("nav-reservations");
  expect(reservationsLink).toBeInTheDocument();
});

test('reservation avaiable times are loaded when a date is selected', async () => {
  render(<BrowserRouter>
    <App />
  </BrowserRouter>);
  const reservationsLink = screen.getByTestId("nav-reservations");
  fireEvent.click(reservationsLink);

  const dateInput = screen.getByTestId("res-date");
  const timeInput = screen.getByTestId("res-time");
  expect(dateInput).toBeInTheDocument();
  expect(timeInput).toBeInTheDocument();

  // mock the fetch call and resolve with mocked data
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => {
      return Promise.resolve({
        value: [
          {
            "Id": 1,
            "ReservationDatetime": "2023-11-18T10:00:00"
          }
        ]
      });
    }
  }));

  // selecting a date will trigger available times to be fetched
  fireEvent.change(dateInput, {
    target: {
      value: "2023-11-18"
    }
  });

  // loading spinner appears while the data is being fetched
  const loadingSpinner = screen.queryByTestId('loading-spinner')
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
  });
  expect(loadingSpinner).toBeInTheDocument();
  await waitFor(() => {
    expect(loadingSpinner).not.toBeInTheDocument();
  });

  // verify the select options are loaded
  const timeOptions = screen.getAllByTestId("res-time-option");
  const timeOptionsValues = timeOptions.map((item) => item.value);
  const expectedValues = [
    "Please Select",
    "09:00",
    "09:30",
    "10:00",
  ];
  expect(timeOptionsValues).toEqual(expectedValues);
});
