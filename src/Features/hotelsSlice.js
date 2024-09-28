import {createSlice} from '@reduxjs/toolkit';
import Hotels from '../components/Hotels';
import CreditCards from '../components/CreditCards';

const HotelsSlice = createSlice({
  name: 'hotels',
  initialState: {Hotels, CreditCards},
  reducers: {
    toggleFavourite: (state, action) => {
      const hotelsArray = Object.values(state);
      const hotel = hotelsArray.find(hotel => hotel.key === action.payload);
      if (hotel) {
        hotel.favourite = !hotel.favourite;
      }
    },
    addCard: (state, action) => {
      const cardsArray = Object.values(state);
      const card = cardsArray.find(card => card.key === action.payload);
    },
  },
});
export const {toggleFavourite, addCard} = HotelsSlice.actions;
export default HotelsSlice.reducer;
