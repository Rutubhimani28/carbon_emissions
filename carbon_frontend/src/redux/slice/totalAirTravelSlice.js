import { createSlice } from '@reduxjs/toolkit';

const totalAirTravelSlice = createSlice({
  name: 'totalAirTravel',
  initialState: {
    data: [],
    totalEmission: 0,
  },
  reducers: {
    addAirTravelData: (state, action) => {
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
        if (item.type === 'Economy Class') {
          totalEmission += item?.emissionOne ? Number(item?.emissionOne) : 0;
          totalEmission += item?.emissionTwo ? Number(item?.emissionTwo) : 0;
          totalEmission += item?.emissionThree ? Number(item?.emissionThree) : 0;
        } else if (item.type === 'Business Class') {
          totalEmission += item?.emissionFour ? Number(item?.emissionFour) : 0;
          totalEmission += item?.emissionFive ? Number(item?.emissionFive) : 0;
          totalEmission += item?.emissionSix ? Number(item?.emissionSix) : 0;
        }
        // else if (item.type === 'First Class') {
        //   totalEmission += item?.emissionSeven ? Number(item?.emissionSeven) : 0;
        //   totalEmission += item?.emissionEight ? Number(item?.emissionEight) : 0;
        //   totalEmission += item?.emissionNine ? Number(item?.emissionNine) : 0;
        // } else if (item.type === 'Premium Economy Class') {
        //   totalEmission += item?.emissionTen ? Number(item?.emissionTen) : 0;
        //   totalEmission += item?.emissionEleven ? Number(item?.emissionEleven) : 0;
        //   totalEmission += item?.emissiontwel ? Number(item?.emissiontwel) : 0;
        // }
      });
      state.totalEmission = Number(totalEmission).toFixed(5) || 0;
    },
    // deleteAirTravelData: (state, action) => ({
    //     ...state,
    //     data: [],
    //     totalEmission: 0,
    // }),
    deleteAirTravelData: (state, action) => {
      return {
        ...state,
        data: [],
        totalEmission: 0,
      };
    },
    setAirTravelAllData: (state, action) => {
      state.data = action?.payload?.data;
      state.totalEmission = action?.payload?.totalEmission;
    },
  },
});

export const { addAirTravelData, deleteAirTravelData, setAirTravelAllData } = totalAirTravelSlice.actions;
export default totalAirTravelSlice.reducer;
