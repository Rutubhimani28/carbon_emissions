import { createSlice } from "@reduxjs/toolkit";


const totalEnergyUpdatedSlice = createSlice({
    name: "totalEnergyUpdated",
    initialState: {
        data: [],
        totalEmission: 0,
        // scope: 3
    },
    reducers: {
        addEnergyData: (state, action) => {
            const newData = Array.isArray(action?.payload) ? action?.payload : [action?.payload];
            newData.forEach((newItem) => {
                const existingItemIndex = state?.data?.findIndex((item) => item?.type === newItem?.type);
                if (existingItemIndex !== -1) {
                    state.data[existingItemIndex] = { ...state.data[existingItemIndex], ...newItem };
                } else {
                    state.data.push(newItem);
                }
            });
            state.totalEmission = state?.data[0]?.data.reduce((total, item) => item?.emission ? total + Number(item?.emission) : total, 0).toFixed(2);
        },
        deleteEnergyData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0,
            // scope: 3
        }),
        // scopeChange: (state, action) => ({
        //     ...state,
        //     scope: action.payload.scope
        // }),
        setEnergyAllData: (state, action) => {
            state.data = action?.payload?.data;
            state.totalEmission = action?.payload?.totalEmission;
            // state.scope = action.payload.scope; 
        },
    },
});

export const { addEnergyData, deleteEnergyData, setEnergyAllData } = totalEnergyUpdatedSlice.actions;
export default totalEnergyUpdatedSlice.reducer;