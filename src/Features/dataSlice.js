import {createSlice} from '@reduxjs/toolkit';
import Hotels from '../components/Hotels';
import CreditCards from '../components/CreditCards';

const initialState = {
  hotels: Hotels,
  creditCards: CreditCards,
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
  },
});
export const {toggleFavourite, addNewCardItem} = dataSlice.actions;
export default dataSlice.reducer;
