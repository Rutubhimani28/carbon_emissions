import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'; // Import sessionStorage
import userSlice from '../slice/userSlice';

import digitalContentSlice from '../slice/digitalContentSlice';
import totalDigitalContSlice from '../slice/totalDigitalContSlice';
import airFreightSlice from '../slice/airFreightSlice';
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
import totalImageSlice from '../slice/imageSlice';
import hotelSlice from '../slice/hotelSlice';
import totalHotelSlice from '../slice/totalHotelSlice';
import totalDigitalCampaignSlice from '../slice/totalDigitalCampaignSlice';
import totalVideoSlice from '../slice/videoSlice';

import totalVirtualEventSlice from '../slice/totalVirtualEventSlice';
import totalCommsSlice from '../slice/totalCommsSlice';
import totalPrAgencySlice from '../slice/totalPrAgencySlice';
import totalHospitalitySlice from '../slice/totalHospitalitySlice';
import toolSlice from '../slice/toolSlice';
import resultTableDataSlice from '../slice/resultTableDataSlice';
import eventsEmissionsSlice from '../slice/eventsEmissionsDataSlice';

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
const totalVideoPersistConfig = {
  key: 'totalVideoDetails',
  storage: storageSession,
};
const totalAirFreightPersistConfig = {
  key: 'totalAirFreightDetails',
  storage: storageSession,
};
const totalProductionPersistConfig = {
  key: 'totalProductionDetails',
  storage: storageSession,
};
const totalAirTravelPersistConfig = {
  key: 'totalAirTravelDetails',
  storage: storageSession,
};
const totalImagePersistConfig = {
  key: 'totalImageDetails',
  storage: storageSession,
};
const totalHotelPersistConfig = {
  key: 'totalHotelDetails',
  storage: storageSession,
};

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
const totalDigitalCampaignPersistConfig = {
  key: 'totalDigitalCampaign',
  storage: storageSession,
};
const totalVirtualEventPersistConfig = {
  key: 'totalVirtualEvent',
  storage: storageSession,
};
const totalCommsPersistConfig = {
  key: 'totalComms',
  storage: storageSession,
};
const totalPrAgencyPersistConfig = {
  key: 'totalPrAgency',
  storage: storageSession,
};
const totalHospitalityPersistConfig = {
  key: 'totalhospitality',
  storage: storageSession,
};

const toolPersistConfig = {
  key: 'tool',
  storage: storageSession,
};
const resultTableDataPersistConfig = {
  key: 'resultTableDataDetails',
  storage: storageSession,
};
const eventsEmissionsPersistConfig = {
  key: 'eventsEmissionsDetails',
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
    totalVideoDetails: persistReducer(totalVideoPersistConfig, totalVideoSlice),
    totalAirFreightDetails: persistReducer(totalAirFreightPersistConfig, totalAirFreightSlice),
    totalProductionDetails: persistReducer(totalProductionPersistConfig, totalProductionSlice),
    totalEnergyUpdatedDetails: persistReducer(totalEnergyUpdatedPersistConfig, totalEnergyUpdatedSlice),
    totalFoodDetails: persistReducer(totalFoodPersistConfig, totalFoodSlice),
    totalWasteDetails: persistReducer(totalWastePersistConfig, totalWasteSlice),
    totalLocalTranspotationDetails: persistReducer(totalLocalTranspotationPersistConfig, totalLocalTranspotationSlice),
    totalAirTravelDetails: persistReducer(totalAirTravelPersistConfig, totalAirTravelSlice),
    totalImageDetails: persistReducer(totalImagePersistConfig, totalImageSlice),
    totalHotelDetails: persistReducer(totalHotelPersistConfig, totalHotelSlice),
    totalDigitalCampaignDetails: persistReducer(totalDigitalCampaignPersistConfig, totalDigitalCampaignSlice),
    totalVirtualEventDetails: persistReducer(totalVirtualEventPersistConfig, totalVirtualEventSlice),
    totalCommsDetails: persistReducer(totalCommsPersistConfig, totalCommsSlice),
    totalPrAgencyDetails: persistReducer(totalPrAgencyPersistConfig, totalPrAgencySlice),
    totalHospitalityDetails: persistReducer(totalHospitalityPersistConfig, totalHospitalitySlice),
    toolDetails: persistReducer(toolPersistConfig, toolSlice),
    resultTableDataDetails: persistReducer(resultTableDataPersistConfig, resultTableDataSlice),
    eventsEmissionsDetails: persistReducer(eventsEmissionsPersistConfig, eventsEmissionsSlice),
  },
  middleware,
});

export const persistor = persistStore(store);