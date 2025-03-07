import { createSlice } from "@reduxjs/toolkit";

const digitalCampaignSlice = createSlice({
    name: "digitalCampaign",
    initialState: {
        data: [],
        totalEmission: 0
    },
    reducers: {
        addCampaignData: (state, action) => {
            const newData = Array.isArray(action.payload) ? action?.payload : [action?.payload];
            newData.forEach((newItem) => {
                const existingItemIndex = state?.data?.findIndex((item) => item?.type === newItem?.type);
                if (existingItemIndex !== -1) {
                    state.data[existingItemIndex] = { ...state.data[existingItemIndex], ...newItem };
                } else {
                    state.data.push(newItem);
                }
            });
            state.totalEmission = state?.data?.[0]?.data?.reduce((total, item) => {
                if (item?.emission) {
                    return total + Number(item?.emission);
                }
                return total;
            }, 0).toFixed(2);
        },
        deleteCampaignData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0
        }),
        setDigitalCampaignAllData: (state, action) => {
            state.data = action?.payload?.data;
            state.totalEmission = action?.payload?.totalEmission;
        },
    },
});

export const { addCampaignData, deleteCampaignData, setDigitalCampaignAllData } = digitalCampaignSlice.actions;
export default digitalCampaignSlice.reducer;