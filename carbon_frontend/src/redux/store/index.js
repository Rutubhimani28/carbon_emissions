import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'; // Import sessionStorage
import userSlice from '../slice/userSlice';

import digitalContentSlice from '../slice/digitalContentSlice'
import totalDigitalContSlice from '../slice/totalDigitalContSlice';
import airFreightSlice from '../slice/airFreightSlice'
import totalAirFreightSlice from '../slice/totalAirFreightSlice';
import contactUsSlice from '../slice/contactUsSlice';
import totalEnergyUpdatedSlice from '../slice/totalEnergyUpdatedSlice';
import eventsSlice from '../slice/eventsSlice';
import totalFoodSlice from '../slice/totalFoodSlice';
import totalWasteSlice from '../slice/totalWasteSlice';
import totalProductionSlice from '../slice/totalProductionSlice';

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
const totalProductionPersistConfig = {
    key: 'totalProductionDetails',
    storage: storageSession
}

const totalEnergyUpdatedPersistConfig = {
    key: 'totalEnergyUpdatedDetails',
    storage: storageSession,
};
const totalFoodPersistConfig = {
    key: 'totalFoodDetails',
    storage: storageSession,
};
const totalWastePersistConfig = {
    key: 'totalWasteDetails',
    storage: storageSession,
};

export const store = configureStore({
    reducer: {
        userDetails: persistReducer(userPersistConfig, userSlice),
        digitalContentDetails: digitalContentSlice,
        airFreightDetails: airFreightSlice,
        contactUs: contactUsSlice,
        events: eventsSlice,
        totalDigitalContentDetails: persistReducer(totalDigitalContentPersistConfig, totalDigitalContSlice),
        totalAirFreightDetails: persistReducer(totalAirFreightPersistConfig, totalAirFreightSlice),
        totalProductionDetails: persistReducer(totalProductionPersistConfig, totalProductionSlice),
        totalEnergyUpdatedDetails: persistReducer(totalEnergyUpdatedPersistConfig, totalEnergyUpdatedSlice),
        totalFoodDetails: persistReducer(totalFoodPersistConfig, totalFoodSlice),
        totalWasteDetails: persistReducer(totalWastePersistConfig, totalWasteSlice),
    },
    middleware,
});

export const persistor = persistStore(store);