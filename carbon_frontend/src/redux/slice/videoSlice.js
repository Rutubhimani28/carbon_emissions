

import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'totalVideo',
  initialState: {
    data: [],
    totalEmission: 0,
  },
  reducers: {
    addVideoData: (state, action) => {
      const newData = Array.isArray(action?.payload) ? action?.payload : [action?.payload];
      newData.forEach((newItem) => {
        const existingItemIndex = state?.data?.findIndex((item) => item?.type === newItem?.type);
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
        if (item.type === 'Network Emissions') {
          totalEmission += item?.emission ? Number(item?.emission) : 0;
          totalEmission += item?.emissionTwo ? Number(item?.emissionTwo) : 0;
          totalEmission += item?.emissionThree ? Number(item?.emissionThree) : 0;
        } else if (item.type === 'Device Emissions') {
          totalEmission += item?.desktopEmission ? Number(item?.desktopEmission) : 0;
          totalEmission += item?.laptopEmission ? Number(item?.laptopEmission) : 0;
          totalEmission += item?.mobileEmission ? Number(item?.mobileEmission) : 0;
          totalEmission += item?.tabletEmission ? Number(item?.tabletEmission) : 0;
        } else if (item.type === 'Data Center Emissions') {
          totalEmission += item?.emission ? Number(item?.emission) : 0;
        }
      });
      state.totalEmission = Number(totalEmission).toFixed(5) || 0;
    },
    deleteVideoData: (state, action) => {
      return {
        ...state,
        data: [],
        totalEmission: 0,
      };
    },
    setVideoAllData: (state, action) => {
      state.data = action?.payload?.data;
      state.totalEmission = action?.payload?.totalEmission;
    },
  },
});

export const { addVideoData, deleteAirTravelData, setVideoAllData, deleteVideoData } = videoSlice.actions;
export default videoSlice.reducer;
