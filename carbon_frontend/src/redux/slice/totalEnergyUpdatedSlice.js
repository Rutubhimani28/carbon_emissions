import { createSlice } from "@reduxjs/toolkit";


const totalEnergyUpdatedSlice = createSlice({
    name: "totalEnergyUpdated",
    initialState: {
        data: [],
        totalEmission: 0
    },
    reducers: {
        addEnergyData: (state, action) => {
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            newData.forEach((newItem) => {
                const existingItemIndex = state.data.findIndex((item) => item.type === newItem.type);
                if (existingItemIndex !== -1) {
                    state.data[existingItemIndex] = { ...state.data[existingItemIndex], ...newItem };
                } else {
                    state.data.push(newItem);
                }
            });
            state.totalEmission = state.data[0].data.reduce((total, item) => total + item.emission, 0).toFixed(2);
        },
        deleteEnergyData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0
        }),

    },
});

export const { addEnergyData, deleteEnergyData } = totalEnergyUpdatedSlice.actions;
export default totalEnergyUpdatedSlice.reducer;