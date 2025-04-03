import { createSlice } from "@reduxjs/toolkit";


const totalHotelSlice = createSlice({
    name: "hotel",
    initialState: {
        data: [],
        totalEmission: 0,
    },
    reducers: {
        addHotelData: (state, action) => {
            const newData = Array.isArray(action?.payload) ? action?.payload : [action?.payload];
            newData.forEach((newItem) => {
                const existingItemIndex = state?.data?.findIndex((item) => item?.type === newItem?.type);
                if (existingItemIndex !== -1) {
                    state.data[existingItemIndex] = { ...state.data[existingItemIndex], ...newItem };
                } else {
                    state.data.push(newItem);
                }
            });
            state.totalEmission = state.data?.[0]?.data?.reduce((total, item) => item.emission ? total + Number(item.emission) : total, 0).toFixed(5);
        },
        deleteHotelData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0,
        }),
        setHotelAllData: (state, action) => {
            state.data = action?.payload?.data; 
            state.totalEmission = action?.payload?.totalEmission; 
        },
    },
});

export const { addHotelData, deleteHotelData,setHotelAllData } = totalHotelSlice.actions;
export default totalHotelSlice.reducer;