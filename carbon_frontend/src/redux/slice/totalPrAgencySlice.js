import { createSlice } from "@reduxjs/toolkit";

const totalPrAgencySlice = createSlice({
    name: "totalPrAgency",
    initialState: {
        data: [],
        totalEmission: 0,
        // scope: 3
    },
    reducers: {
        addPrAgencyData: (state, action) => {
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
        deletePrAgencyData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0,
            // scope: 3
        }),
        // scopeChange: (state, action) => ({
        //     ...state,
        //     scope: action.payload.scope
        // }),
        setPrAgencyAllData: (state, action) => {
            state.data = action?.payload?.data;
            state.totalEmission = action?.payload?.totalEmission;
            // state.scope = action.payload.scope;
        },
    },
});

export const { addPrAgencyData, deletePrAgencyData, setPrAgencyAllData } = totalPrAgencySlice.actions;
export default totalPrAgencySlice.reducer;