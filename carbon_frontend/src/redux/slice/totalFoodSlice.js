import { createSlice } from "@reduxjs/toolkit";


const totalFoodSlice = createSlice({
    name: "food",
    initialState: {
        data: [],
        totalEmission: 0
    },
    reducers: {
        addFoodData: (state, action) => {
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
        deleteFoodData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0
        }),

    },
});

export const { addFoodData, deleteFoodData } = totalFoodSlice.actions;
export default totalFoodSlice.reducer;