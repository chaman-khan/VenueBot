import {configureStore} from '@reduxjs/toolkit';
import hotelsReducer from '../Features/hotelsSlice';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, hotelsReducer);

export const Store = configureStore({reducer: {hotels: persistedReducer}});
export const persistor = persistStore(Store);
