import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'; // Import sessionStorage
import userSlice from '../slice/userSlice';

import digitalContentSlice from '../slice/digitalContentSlice'

const middleware = (getDefaultMiddleware) => {
    return getDefaultMiddleware({
        serializableCheck: false,
    });
};

const userPersistConfig = {
    key: 'userDetails',
    storage: storageSession,
};


export const store = configureStore({
    reducer: {
        userDetails: persistReducer(userPersistConfig, userSlice),
        digitalContentDetails: digitalContentSlice,
    },
    middleware,
});

export const persistor = persistStore(store);
