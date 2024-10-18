import { createSlice } from "@reduxjs/toolkit";

const totalHospitalitySlice = createSlice({
    name: "hospitality",
    initialState: {
        data: [],
        totalEmission: 0,
        // scope: 3,
    },
    reducers: {
        addHospitalityData: (state, action) => {
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            newData.forEach((newItem) => {
                const existingItemIndex = state.data.findIndex((item) => item.type === newItem.type);
                if (existingItemIndex !== -1) {
                    state.data[existingItemIndex] = { ...state.data[existingItemIndex], ...newItem };
                } else {
                    state.data.push(newItem);
                }
            });
            state.totalEmission = state.data[0].data.reduce((total, item) => item.emission ? total + Number(item.emission) : total, 0).toFixed(2);
        },
        deleteHospitalityData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0,
            // scope: 3
        }),
        // scopeChange: (state, action) => ({
        //     ...state,
        //     scope: action.payload.scope
        // }),
        setHospitalityAllData: (state, action) => {
            state.data = action.payload.data; 
            state.totalEmission = action.payload.totalEmission; 
            // state.scope = action.payload.scope; 
        },
    },
});

export const { addHospitalityData, deleteHospitalityData, setHospitalityAllData } = totalHospitalitySlice.actions;
export default totalHospitalitySlice.reducer;