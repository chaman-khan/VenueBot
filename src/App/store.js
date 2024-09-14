import {combineReducers, configureStore} from '@reduxjs/toolkit';
import hotelsReducer from '../Features/hotelsSlice';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hotelsSlice from '../Features/hotelsSlice';
import logger from 'redux-logger';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  hotels: hotelsSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const Store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['register'],
      },
    }).concat(logger),
});
export const persistor = persistStore(Store);
