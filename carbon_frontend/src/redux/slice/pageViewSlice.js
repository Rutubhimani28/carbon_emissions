import { createSlice } from '@reduxjs/toolkit';

const fetchPageViewData = createSlice({
    name: 'totalPageView',
    initialState: {
        data: [],
        totalEmission: 0,
    },
    reducers: {
        addPageViewData: (state, action) => {
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
            // let aPIGreenWebUrl = '';
            state.data[0].data.forEach((item) => {
                // if (item.type === 'Web Information') {
                //     totalEmission += item.timeOnPageSecs;
                // }
                // else if (item.type === 'Content Size') {
                //     // aPIGreenWebUrl += item?.aPIGreenWebUrl;
                //     totalEmission += item?.pageSizeMB;
                // }
                // else 
                // const totalEmissionss = emissions.reduce((sum, val) => sum + val, 0);
                if (item?.data?.find((i) => i?.type === "Network Emissions")) {
                    const emissions = item?.data?.map(item => Number(item?.emission));
                    const totalEmissionss = emissions.reduce((sum, val) => sum + val, 0);
                    // totalEmission += item?.emission ? Number(item?.emission) : 0;
                    totalEmission += totalEmissionss;

                } else if (item?.data?.find((i) => i?.type === "Device Emissions")) {
                    // totalEmission += item?.desktopEmission ? Number(item?.desktopEmission) : 0;
                    // totalEmission += item?.laptopEmission ? Number(item?.laptopEmission) : 0;
                    // totalEmission += item?.mobileEmission ? Number(item?.mobileEmission) : 0;
                    // totalEmission += item?.tabletEmission ? Number(item?.tabletEmission) : 0;
                    const emissions = item?.data?.map(item => Number(item?.emission));
                    const totalEmissionss = emissions.reduce((sum, val) => sum + val, 0);
                    totalEmission += totalEmissionss;
                } else if (item.type === 'Data Center Emissions') {
                    totalEmission += item?.emission ? Number(item?.emission) : 0;
                }
            });
            state.totalEmission = Number(totalEmission).toFixed(5) || 0;
        },
        deletePageViewData: (state, action) => {
            return {
                ...state,
                data: [],
                totalEmission: 0,
            };
        },
        setPageViewAllData: (state, action) => {
            state.data = action?.payload?.data;
            state.totalEmission = action?.payload?.totalEmission;
        },
    },
});

export const { addPageViewData, deletePageViewData, setPageViewAllData } = fetchPageViewData.actions;
export default fetchPageViewData.reducer;
