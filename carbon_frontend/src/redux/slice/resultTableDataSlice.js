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
        // deleteResTabAirTravelData: (state, action) => ({
        //     ...state,
        //     data: state.data.filter(item => item.tabTitle !== 'Air Travel'),
        // }),
        deleteResTabAirTravelData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Air Travel') {
                    return {
                        tabTitle: "Air Travel",
                        tabData: [
                            { subType: "Economy Class", scope: 3 },
                            { subType: "Business Class", scope: 3 },
                            { subType: "First Class", scope: 3 }
                        ]
                    };
                }
                return item;
            });

            return {
                ...state,
                data: filteredData,
            };
        },
        // deleteResTabLocalTransData: (state, action) => ({
        //     ...state,
        // }),
        deleteResTabLocalTransData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Local Transportation') {
                    return {
                        tabTitle: "Local Transportation",
                        tabData: [
                            { subType: "Company Car", scope: 1 },
                            { subType: "Taxi", scope: 3 },
                            { subType: "Public Transport", scope: 3 }
                        ]
                    };
                }
                return item;
            });

            return {
                ...state,
                data: filteredData,
            };
        },
        // deleteResTabFBData: (state, action) => ({
        //     ...state,
        //     data: state.data.filter(item => item.tabTitle !== 'Food & Beverages'),
        // }),
        deleteResTabFBData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Food & Beverages') {
                    return {
                        tabTitle: "Food & Beverages",
                        tabData: [
                            { subType: "Food", scope: 3 },
                            { subType: "Beverages", scope: 3 },
                            { subType: "Food", scope: 3 },
                            { subType: "Beverages", scope: 3 },
                        ]
                    };
                }
                return item;
            });

            return {
                ...state,
                data: filteredData,
            };
        },
        // deleteResTabLogisticsData: (state, action) => ({
        //     ...state,
        //     data: state.data.filter(item => item.tabTitle !== 'Logistics'),
        // }),
        deleteResTabLogisticsData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Logistics') {
                    return {
                        tabTitle: "Logistics",
                        tabData: [
                            { subType: "Mode of Freight", scope: 3 },
                        ]
                    };
                }
                return item;
            });

            return {
                ...state,
                data: filteredData,
            };
        },
        // deleteResTabProductionData: (state, action) => ({
        //     ...state,
        //     data: state.data.filter(item => item.tabTitle !== 'Event Production'),
        // }),
        deleteResTabProductionData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Event Production') {
                    return {
                        tabTitle: "Event Production",
                        tabData: [
                            { subType: "Production Material", scope: 3 },
                            { subType: "Production Material", scope: 3 },
                            { subType: "Branding", scope: 2 },
                            { subType: "Branding", scope: 2 },
                            { subType: "Stage Screen", scope: 3 },
                            { subType: "Stage Lighting & AV", scope: 3 },
                        ]
                    };
                }
                return item;
            });

            return {
                ...state,
                data: filteredData,
            };
        },
        // deleteResTabEnergyData: (state, action) => ({
        //     ...state,
        //     data: state.data.filter(item => item.tabTitle !== 'Energy'),
        // }),
        deleteResTabEnergyData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Energy') {
                    return {
                        tabTitle: "Energy",
                        tabData: [
                            { subType: "", scope: 3 },
                            { subType: "", scope: 2 },
                        ]
                    };
                }
                return item;
            });

            return {
                ...state,
                data: filteredData,
            };
        },
        // deleteResTableDigitalContData: (state, action) => ({
        //     ...state,
        //     data: state.data.filter(item => item.tabTitle !== 'Digital Comms'),
        // }),
        deleteResTableDigitalContData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Digital Comms') {
                    return {
                        tabTitle: "Digital Comms",
                        tabData: [
                            { subType: "", scope: 1 },
                            { subType: "", scope: 1 },
                            { subType: "", scope: 1 },
                        ]
                    };
                }
                return item;
            });

            return {
                ...state,
                data: filteredData,
            };
        },
        // deleteResTabWasteData: (state, action) => ({
        //     ...state,
        //     data: state.data.filter(item => item.tabTitle !== 'Waste'),
        // }),
        deleteResTabWasteData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Waste') {
                    return {
                        tabTitle: "Waste",
                        tabData: [
                            { subType: "Food Waste", scope: 3 },
                            { subType: "Plastic Waste", scope: 3 },
                        ]
                    };
                }
                return item;
            });

            return {
                ...state,
                data: filteredData,
            };
        },
        deleteResTabHotelData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Hotel'),
        }),
        deleteResTabDgCampaignData: (state, action) => ({
            ...state,
            data: state.data.filter(item => item.tabTitle !== 'Digital Campaign'),
        }),
    },
});

export const { addResultTableData, deleteResultTableAllData, deleteResTabAirTravelData, deleteResTabLocalTransData, deleteResTabFBData, deleteResTabLogisticsData, deleteResTabProductionData, deleteResTabEnergyData, deleteResTableDigitalContData, deleteResTabWasteData, deleteResTabHotelData, deleteResTabDgCampaignData } = resultTableDataSlice.actions;
export default resultTableDataSlice.reducer;