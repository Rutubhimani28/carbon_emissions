import { createSlice } from "@reduxjs/toolkit";


const resultTableDataSlice = createSlice({
    name: "totalResultTableData",
    initialState: {
        data: [],
    },
    reducers: {
        addResultTableData: (state, action) => {
            const { tabTitle, data } = action.payload;

            const existingIndex = state.data.findIndex(item => item.tabTitle === tabTitle);

            if (existingIndex !== -1) {
                state.data[existingIndex].tabData = data;
            } else {
                state.data.push({
                    tabTitle,
                    tabData: data
                });
            }
        },
        deleteResultTableAllData: (state, action) => ({
            ...state,
            data: [],
        }),
        deleteResTabAirTravelData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Air Travel'),
        }),
        deleteResTabLocalTransData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Local Transportation'),
        }),
        deleteResTabFBData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Food & Beverages'),
        }),
        deleteResTabLogisticsData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Logistics'),
        }),
        deleteResTabProductionData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Event Production'),
        }),
        deleteResTabEnergyData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Energy'),
        }),
        deleteResTableDigitalContData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Digital Comms'),
        }),
        deleteResTabWasteData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Waste'),
        }),
        deleteResTabHotelData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Hotel'),
        }),
    },
});

export const { addResultTableData, deleteResultTableAllData, deleteResTabAirTravelData, deleteResTabLocalTransData, deleteResTabFBData, deleteResTabLogisticsData, deleteResTabProductionData, deleteResTabEnergyData, deleteResTableDigitalContData, deleteResTabWasteData, deleteResTabHotelData } = resultTableDataSlice.actions;
export default resultTableDataSlice.reducer;