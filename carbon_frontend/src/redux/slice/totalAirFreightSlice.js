import { createSlice } from "@reduxjs/toolkit";


const totalAirFreightSlice = createSlice({
    name: "totalAirFreight",
    initialState: {
        data: [],
        totalEmission: 0
    },
    reducers: {
        addLogisticsData: (state, action) => {
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            newData.forEach((newItem) => {
                const existingItemIndex = state.data.findIndex((item) => item.type === newItem.type);
                if (existingItemIndex !== -1) {
                    // Update the existing item
                    state.data[existingItemIndex] = { ...state.data[existingItemIndex], ...newItem };
                } else {
                    // Add the new item
                    state.data.push(newItem);
                }
            });
            // Recalculate totalEmission
            state.totalEmission = state.data[0].data.reduce((total, item) => total + item.emission, 0).toFixed(2);
        },
        deleteLogisticsData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0
        }),

    },
});

export const { addLogisticsData, deleteLogisticsData } = totalAirFreightSlice.actions;
export default totalAirFreightSlice.reducer;