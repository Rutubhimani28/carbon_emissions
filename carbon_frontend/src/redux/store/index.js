import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'; // Import sessionStorage
import userSlice from '../slice/userSlice';

import digitalContentSlice from '../slice/digitalContentSlice'
import totalDigitalContSlice from '../slice/totalDigitalContSlice';
import airFreightSlice from '../slice/airFreightSlice'
import totalAirFreightSlice from '../slice/totalAirFreightSlice';

const middleware = (getDefaultMiddleware) => {
    return getDefaultMiddleware({
        serializableCheck: false,
    });
};

const userPersistConfig = {
    key: 'userDetails',
    storage: storageSession,
};
const totalDigitalContentPersistConfig = {
    key: 'totalDigitalContentDetails',
    storage: storageSession,
};
const totalAirFreightPersistConfig = {
    key: 'totalAirFreightDetails',
    storage: storageSession,
};

export const store = configureStore({
    reducer: {
        userDetails: persistReducer(userPersistConfig, userSlice),
        digitalContentDetails: digitalContentSlice,
        totalDigitalContentDetails: totalDigitalContSlice,
        airFreightDetails: airFreightSlice,
        totalAirFreightDetails: persistReducer(totalAirFreightPersistConfig, totalAirFreightSlice),
    },
    middleware,
});

export const persistor = persistStore(store);