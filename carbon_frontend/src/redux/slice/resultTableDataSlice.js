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
        deleteResTabLocalTransData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Local Transportation') {
                    return {
                        tabTitle: "Local Transportation",
                        tabData: [
                            { subType: "Company Car", scope: 2 },
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
        deleteResTabProductionData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Event Production') {
                    return {
                        tabTitle: "Event Production",
                        tabData: [
                            { subType: "Production Material", scope: 3 },
                            { subType: "Production Material", scope: 3 },
                            { subType: "Branding", scope: 3 },
                            { subType: "Branding", scope: 3 },
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
        deleteResTabEnergyData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Energy') {
                    return {
                        tabTitle: "Energy",
                        tabData: [
                            { subType: "", scope: 3 },
                            { subType: "", scope: 3 },
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
        deleteResTableDigitalContData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Digital Comms') {
                    return {
                        tabTitle: "Digital Comms",
                        tabData: [
                            { subType: "", scope: 3 },
                            { subType: "", scope: 3 },
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
        deleteResTabHotelData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Hotel') {
                    return {
                        tabTitle: "Hotel",
                        tabData: [
                            { subType: "", scope: 3 },
                            { subType: "", scope: 3 },
                            { subType: "", scope: 3 },
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
        deleteResTabDgCampaignData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Digital Campaign') {
                    return {
                        tabTitle: "Digital Campaign",
                        tabData: [
                            { subType: "Social Media", scope: 3 },
                            { subType: "", scope: 3 },
                            { subType: "Email / Newsletter", scope: 1 },
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
        deleteResTabVrtEventData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Virtual Event') {
                    return {
                        tabTitle: "Virtual Event",
                        tabData: [
                            { subType: "Event Promotion on Social Media", scope: 3 },
                            { subType: "", scope: 3 },
                            { subType: "Live Broadcasting", scope: 1 },
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
        deleteResTabCommsData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Comms') {
                    return {
                        tabTitle: "Comms",
                        tabData: [
                            { subType: "Email Invitations", scope: 1 },
                            { subType: "", scope: 1 },
                            // { subType: "Social Media", scope: 3 },
                            { subType: "PR Assets", scope: 2 },
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
        deleteResTabHospitalityData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'Hospitality') {
                    return {
                        tabTitle: "Hospitality",
                        tabData: [
                            { subType: "", scope: 3 },
                            { subType: "", scope: 3 },
                            { subType: "", scope: 3 },
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
        deleteResTabPrAgencyData: (state, action) => {
            const filteredData = state.data.map(item => {
                if (item.tabTitle === 'PR Agency') {
                    return {
                        tabTitle: "PR Agency",
                        tabData: [
                            { subType: "Meeting / Ball Room", scope: 3 },
                            { subType: "Projector", scope: 3 },
                            { subType: "Branding", scope: 3 },
                            { subType: "PR Assets", scope: 3 },
                            { subType: "Transportation", scope: 3 },
                            { subType: "Energy", scope: 3 },
                        ]
                    };
                }
                return item;
            });

            return {
                ...state,
                data: filteredData,
            };
        }
    },
});

export const { addResultTableData, deleteResultTableAllData, deleteResTabAirTravelData, deleteResTabLocalTransData, deleteResTabFBData, deleteResTabLogisticsData, deleteResTabProductionData, deleteResTabEnergyData, deleteResTableDigitalContData, deleteResTabWasteData, deleteResTabHotelData, deleteResTabDgCampaignData, deleteResTabVrtEventData, deleteResTabCommsData, deleteResTabHospitalityData, deleteResTabPrAgencyData } = resultTableDataSlice.actions;
export default resultTableDataSlice.reducer;