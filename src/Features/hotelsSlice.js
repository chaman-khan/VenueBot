import {createSlice} from '@reduxjs/toolkit';
import Hotels from '../components/Hotels';

const HotelsSlice = createSlice({
  name: 'hotels',
  initialState: Hotels,
  reducers: {
    toggleFavourite: (state, action) => {
      const hotelsArray = Object.values(state);
      const hotel = hotelsArray.find(hotel => hotel.key === action.payload);
      if (hotel) {
        hotel.favourite = !hotel.favourite;
      }
    },
  },
});
export const {toggleFavourite} = HotelsSlice.actions;
export default HotelsSlice.reducer;
