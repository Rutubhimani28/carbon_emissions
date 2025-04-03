import { createSlice } from '@reduxjs/toolkit';

const digitalCampaignSlice = createSlice({
  name: 'digitalCampaign',
  initialState: {
    data: [],
    totalEmission: 0,
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
      let totalEmission = 0;
      state.data[0].data.forEach((item) => {
        if (item.type === 'Network Emissions') {

          totalEmission += item?.emission ? Number(item?.emission) : 0;
        } else if (item.type === 'Device Emissions') {

          totalEmission += item?.desktopEmission ? Number(item?.desktopEmission) : 0;
          totalEmission += item?.laptopEmission ? Number(item?.laptopEmission) : 0;
          totalEmission += item?.mobileEmission ? Number(item?.mobileEmission) : 0;
          totalEmission += item?.tabletEmission ? Number(item?.tabletEmission) : 0;
        } else if (item.type === 'Data Center Emissions') {
          totalEmission += item?.emission ? Number(item?.emission) : 0;
        }
      });

      state.totalEmission = Number(totalEmission).toFixed(2) || 0;
      // state.totalEmission = state?.data?.[0]?.data?.reduce((total, item) => {
      //     if (item?.emission) {
      //         return total + Number(item?.emission);
      //     }
      //     return total;
      // }, 0).toFixed(2);
    },
    deleteCampaignData: (state, action) => ({
      ...state,
      data: [],
      totalEmission: 0,
    }),
    setDigitalCampaignAllData: (state, action) => {
      state.data = action?.payload?.data;
      state.totalEmission = action?.payload?.totalEmission;
    },
  },
});

export const { addCampaignData, deleteCampaignData, setDigitalCampaignAllData } = digitalCampaignSlice.actions;
export default digitalCampaignSlice.reducer;
