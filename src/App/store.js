import {combineReducers, configureStore} from '@reduxjs/toolkit';
import hotelsReducer from '../Features/hotelsSlice';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hotelsSlice from '../Features/hotelsSlice';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  hotels: hotelsSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({reducer: persistedReducer});
export const persistor = persistStore(Store);
