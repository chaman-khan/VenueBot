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
      state.currentBooking.push(newValue);
    },
    backdatafromCurrentBooking: (state, action) => {
      state.currentBooking.pop();
    },
    removeCurrentBooking: (state, action) => {
      state.currentBooking = [];
    },
    addToBookings: (state, action) => {
      const newBooking = action.payload;
      state.bookings.push(newBooking);
    },
    updateStatus: (state, action) => {
      const {index, newStatus} = action.payload;
      if (state.bookings[index]) {
        state.bookings[index].status = newStatus;
      } else {
        console.error('Booking not found at index:', index);
      }
    },
  },
});
export const {
  toggleFavourite,
  addNewCardItem,
  addDataToCurrentBooking,
  addToBookings,
  backdatafromCurrentBooking,
  removeCurrentBooking,
  updateStatus,
} = dataSlice.actions;
export default dataSlice.reducer;
