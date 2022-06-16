import { createStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userDetails'],
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store: any = createStore(persistedReducer);
const persistor = persistStore(store);

const data = {
  store,
  persistor,
};
export default data;
