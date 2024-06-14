import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'; // Import sessionStorage
import userSlice from '../slice/userSlice';

import digitalContentSlice from '../slice/digitalContentSlice'
import totalDigitalContSlice from '../slice/totalDigitalContSlice';
import airFreightSlice from '../slice/airFreightSlice'
import contactUsSlice from '../slice/contactUsSlice';
import productionSlice from '../slice/productionSlice';
import airTravelSlice from '../slice/airTravelSlice';
import totalAirFreightSlice from '../slice/totalAirFreightSlice';
import totalEnergyUpdatedSlice from '../slice/totalEnergyUpdatedSlice';
import eventsSlice from '../slice/eventsSlice';
import foodSlice from '../slice/foodSlice';
import energySlice from '../slice/energySlice';
import transportationSlice from '../slice/transportationSlice';
import totalFoodSlice from '../slice/totalFoodSlice';
import totalWasteSlice from '../slice/totalWasteSlice';
import totalProductionSlice from '../slice/totalProductionSlice';
import totalLocalTranspotationSlice from '../slice/totalLocalTranspotationSlice';
import wasteSlice from '../slice/wasteSlice';
import totalAirTravelSlice from '../slice/totalAirTravelSlice';
import hotelSlice from '../slice/hotelSlice';
import totalHotelSlice from '../slice/totalHotelSlice';

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
const totalAirTravelPersistConfig = {
    key: 'totalAirTravelDetails',
    storage: storageSession
}
const totalHotelPersistConfig = {
    key: 'totalHotelDetails',
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
const totalLocalTranspotationPersistConfig = {
    key: 'totalLocalTranspotation',
    storage: storageSession,
};

export const store = configureStore({
    reducer: {
        userDetails: persistReducer(userPersistConfig, userSlice),
        digitalContentDetails: digitalContentSlice,
        airFreightDetails: airFreightSlice,
        contactUs: contactUsSlice,
        events: eventsSlice,
        productionDetails: productionSlice,
        foodDetails: foodSlice,
        energyDetails: energySlice,
        transportationDetails: transportationSlice,
        wasteDetails: wasteSlice,
        airTravelDetails: airTravelSlice,
        hotelDetails: hotelSlice,
        totalDigitalContentDetails: persistReducer(totalDigitalContentPersistConfig, totalDigitalContSlice),
        totalAirFreightDetails: persistReducer(totalAirFreightPersistConfig, totalAirFreightSlice),
        totalProductionDetails: persistReducer(totalProductionPersistConfig, totalProductionSlice),
        totalEnergyUpdatedDetails: persistReducer(totalEnergyUpdatedPersistConfig, totalEnergyUpdatedSlice),
        totalFoodDetails: persistReducer(totalFoodPersistConfig, totalFoodSlice),
        totalWasteDetails: persistReducer(totalWastePersistConfig, totalWasteSlice),
        totalLocalTranspotationDetails: persistReducer(totalLocalTranspotationPersistConfig, totalLocalTranspotationSlice),
        totalAirTravelDetails: persistReducer(totalAirTravelPersistConfig, totalAirTravelSlice),
        totalHotelDetails: persistReducer(totalHotelPersistConfig, totalHotelSlice),
    },
    middleware,
});

export const persistor = persistStore(store);