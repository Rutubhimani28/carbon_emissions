import { createSlice } from "@reduxjs/toolkit";


const totalAirTravelSlice = createSlice({
    name: "totalAirTravel",
    initialState: {
        data: [],
        totalEmission: 0
    },
    reducers: {
        addAirTravelData: (state, action) => {
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
            let totalEmission = 0;
            state.data[0].data.forEach((item) => {
                if (item.type === "Economy Class") {
                    totalEmission += item.emissionOne + item.emissionTwo + item.emissionThree;
                } else if (item.type === "Business Class") {
                    totalEmission += item.emissionFour + item.emissionFive + item.emissionSix;
                } else if (item.type === "First Class") {
                    totalEmission += item.emissionSeven + item.emissionEight + item.emissionNine;
                }
            });
            state.totalEmission = totalEmission;
        },
        deleteAirTravelData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0
        }),

    },
});

export const { addAirTravelData, deleteAirTravelData } = totalAirTravelSlice.actions;
export default totalAirTravelSlice.reducer;