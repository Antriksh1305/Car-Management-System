import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import UserSlice from './slices/userSlice';

// root-reducer
const rootreducer = combineReducers({
    user: UserSlice,
    devTools: process.env.NODE_ENV !== 'production',
});

// persist-config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootreducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };