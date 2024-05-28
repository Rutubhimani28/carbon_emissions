import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'; // Import sessionStorage
import userSlice from '../slice/userSlice';
import leadSlice from '../slice/leadSlice';
import contactSlice from '../slice/contactSlice';
import emailTemplateSlice from '../slice/emailTemplateSlice';
import policySlice from '../slice/policySlice';
import taskSlice from '../slice/taskSlice';
import smsSlice from '../slice/smsSlice';
import meetingSlice from '../slice/meetingSlice';
import callSlice from '../slice/callSlice';
import emailSlice from '../slice/emailSlice';
import documentSlice from '../slice/documentSlice';
import calendarSlice from '../slice/calendarSlice';
import paymentSlice from '../slice/paymentSlice';
import smsTemplateSlice from '../slice/smsTemplateSlice';
import dashboardSlice from '../slice/dashboardSlice';
// import customFieldSlice from '../slice/customFieldSlice';

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
const leadPersistConfig = {
    key: 'leadDetails',
    storage: storageSession,
};
const contactPersistConfig = {
    key: 'contactDetails',
    storage: storageSession,
};
const emailTemPersistConfig = {
    key: 'tempDetails',
    storage: storageSession,
};
const smsTemPersistConfig = {
    key: 'smsTempDetails',
    storage: storageSession,
};
// const customFieldPersistConfig = {
//     key: 'customFieldDetails',
//     storage: storageSession,
// };


export const store = configureStore({
    reducer: {
        userDetails: persistReducer(userPersistConfig, userSlice),
        leadDetails: persistReducer(leadPersistConfig, leadSlice),
        contactDetails: persistReducer(contactPersistConfig, contactSlice),
        tempDetails: persistReducer(emailTemPersistConfig, emailTemplateSlice),
        smsTempDetails: persistReducer(smsTemPersistConfig, smsTemplateSlice),
        policyDetails: policySlice,
        taskDetails: taskSlice,
        smsDetails: smsSlice,
        paymentDetails: paymentSlice,
        meetingDetails: meetingSlice,
        callDetails: callSlice,
        emailDetails: emailSlice,
        documentDetails: documentSlice,
        calendarDetails: calendarSlice,
        dashboardDetails: dashboardSlice,
        // customFieldDetails: persistReducer(customFieldPersistConfig, customFieldSlice),
        digitalContentDetails: digitalContentSlice,
    },
    middleware,
});

export const persistor = persistStore(store);
