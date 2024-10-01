import {createSlice} from '@reduxjs/toolkit';
import Hotels from '../components/Hotels';
import CreditCards from '../components/CreditCards';

const Bookings = [];
const CurrentBooking = [];
const initialState = {
  hotels: Hotels,
  creditCards: CreditCards,
  bookings: Bookings,
  currentBooking: CurrentBooking,
};
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    toggleFavourite: (state, action) => {
      const hotel = state.hotels.find(hotel => hotel.key === action.payload);
      if (hotel) {
        hotel.favourite = !hotel.favourite;
      }
    },
    addNewCardItem: (state, action) => {
      const newCard = action.payload;
      state.creditCards.push(newCard);
    },
    addDataToCurrentBooking: (state, action) => {
      const newValue = action.payload;
      const index = state.currentBooking.findIndex(
        item => item.id === newValue.id,
      );
      if (index !== -1) {
        state.currentBooking[index] = newValue;
      } else {
        state.currentBooking.push(newValue);
      }
    },
    addToBookings: (state, action) => {
      const newBooking = action.payload;
      state.bookings.push(newBooking);
    },
  },
});
export const {
  toggleFavourite,
  addNewCardItem,
  addDataToCurrentBooking,
  addToBookings,
} = dataSlice.actions;
export default dataSlice.reducer;
