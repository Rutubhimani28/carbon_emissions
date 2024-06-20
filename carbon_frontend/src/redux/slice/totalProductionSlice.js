import { createSlice } from "@reduxjs/toolkit";


const productionSlice = createSlice({
    name: "production",
    initialState: {
        data: [],
        totalEmission: 0
    },
    reducers: {
        addProductionData: (state, action) => {
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            newData.forEach((newItem) => {
                const existingItemIndex = state.data.findIndex((item) => item.type === newItem.type);
                if (existingItemIndex !== -1) {
                    state.data[existingItemIndex] = { ...state.data[existingItemIndex], ...newItem };
                } else {
                    state.data.push(newItem);
                }
            });
            state.totalEmission = state.data[0].data.reduce((total, item) => {
                if (item?.emission) {
                    return total + item.emission;
                }
                return total;
            }, 0).toFixed(2);
        },
        deleteProductionData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0
        }),

    },
});

export const { addProductionData, deleteProductionData } = productionSlice.actions;
export default productionSlice.reducer;