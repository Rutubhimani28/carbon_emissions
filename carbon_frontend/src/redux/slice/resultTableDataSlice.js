import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apipost, apiput, apiget } from '../../service/api';

export const fetchResultTableDatasFromDb = createAsyncThunk('fetchResultTableDatasFromDb', async (_id) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const apiPath = _id ? `api/eventData?_id=${_id}` : 'api/eventData';
    const response = await apiget(apiPath);
    return { data: response?.data?.data, _id };
  } catch (error) {
    throw error;
  }
});

export const addResultTableDatasToDb = createAsyncThunk('addResultTableDataToDb', async (eventData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await apipost(`api/eventData/add`, eventData);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
});

export const updateResultTableDatasToDb = createAsyncThunk('updateResultTableDataToDb', async (eventData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await apiput(`api/eventData/${eventData?.eventDataId}`, eventData);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
});

const resultTableDataSlice = createSlice({
  name: 'totalResultTableData',
  initialState: {
    data: [],
    prEventEmissionDataCategorywise: [],
    eventDataId: '',
    userAllEventsData: [],
  },
  reducers: {
    addResultTableData: (state, action) => {
      const { tabTitle, data, from } = action.payload;
      const fromIndex = state?.data?.findIndex((item) => item?.from === from); // event-category: fr2Event

      if (fromIndex === -1) {
        state.data.push({
          from,
          allDataOfTab: [
            {
              tabTitle,
              tabData: data,
            },
          ],
        });
      } else {
        // Get the existing data object based on 'from' value
        const existingData = state?.data?.[fromIndex];

        // Find the index of the tabData with the matching 'tabTitle'
        const tabIndex = existingData?.allDataOfTab?.findIndex((item) => item?.tabTitle === tabTitle);

        // fromIndex - event-category Like, fr2Event -> has from, allDataOfTab
        // tabIndex - sub tab Like, Air Travel, Transportation

        if (tabIndex !== -1) {
          state.data[fromIndex].allDataOfTab[tabIndex] = {
            tabTitle,
            tabData: data,
          };
        } else {
          // existingData?.allDataOfTab?.push({
          //     tabTitle,
          //     tabData: data
          // });   // existingData and state.data[fromIndex] refer to the same object in memory. it will push twice if uncomment
          state.data?.[fromIndex]?.allDataOfTab?.push({
            tabTitle,
            tabData: data,
          });
        }
      }
      return state; // State is modified in place
    },

    deleteResultTableAllData: (state, action) => ({
      ...state,
      data: [],
      prEventEmissionDataCategorywise: [],
      eventDataId: '',
      userAllEventsData: [],
    }),
    // deleteResTabAirTravelData: (state, action) => ({
    //     ...state,
    //     data: state.data.filter(item => item.tabTitle !== 'Air Travel'),
    // }),
    deleteResTabAirTravelData: (state, action) => {
      const filteredData = state?.data?.map((item) => {
        if (item.from === 'f2fEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Air Travel') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Economy Class", scope: 3 },
                    // { subType: "Business Class", scope: 3 },
                    // { subType: "First Class", scope: 3 }
                    { subType: 'Economy Class' },
                    { subType: 'Business Class' },
                    // { subType: 'First Class' },
                    // { subType: 'Premium Economy Class' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'f2fEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Transportation') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Company Car", scope: 1 },
                    // { subType: "Taxi", scope: 3 },
                    // { subType: "Public Transport", scope: 3 }
                    // { subType: 'Company Car' },
                    // { subType: 'Taxi' },
                    { subType: 'Public Transport' },
                    { subType: 'Private Transport' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'f2fEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Food') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Food", scope: 3 },
                    // { subType: "Beverages", scope: 3 },
                    // { subType: "Food", scope: 3 },
                    // { subType: "Beverages", scope: 3 },
                    { subType: 'Food' },
                    { subType: 'Beverages' },
                    { subType: 'Food' },
                    { subType: 'Beverages' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'f2fEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Logistics') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Mode of Freight", scope: 3 },
                    { subType: 'Mode of Freight' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'f2fEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Event Agency') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Production Material", scope: 3 },
                    // { subType: "Production Material", scope: 3 },
                    // { subType: "Branding", scope: 3 },
                    // { subType: "Branding", scope: 3 },
                    // { subType: "Stage Screen", scope: 3 },
                    // { subType: "Stage Lighting & AV", scope: 3 },
                    { subType: 'Production Material' },
                    { subType: 'Production Material' },
                    { subType: 'Branding' },
                    { subType: 'Branding' },
                    { subType: 'Stage Screen' },
                    { subType: 'Stage Lighting & AV' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'f2fEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Energy') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "", scope: 3 },
                    // { subType: "", scope: 2 },
                    { subType: '' },
                    { subType: '' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'f2fEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Communications ') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "", scope: 3 },
                    // { subType: "", scope: 3 },
                    { subType: '' },
                    { subType: '' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'f2fEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Waste') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Food Waste", scope: 3 },
                    // { subType: "Plastic Waste", scope: 3 },
                    // { subType: "Event Waste", scope: 3 },
                    { subType: 'Food Waste' },
                    { subType: 'Plastic Waste' },
                    { subType: 'Event Waste' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'f2fEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Hotel') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "", scope: 3 },
                    // { subType: "", scope: 3 },
                    // { subType: "", scope: 3 },
                    { subType: '' },
                    // { subType: '' },
                    // { subType: '' },
                  ],
                };
              }
              return tab;
            }),
          };
        }
        return item;
      });
      return {
        ...state,
        data: filteredData,
      };
    },
    deleteResTabVideoData: (state, action) => {
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'digitalCampaign') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Video') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Social Media", scope: 3 },
                    // { subType: "", scope: 3 },
                    // { subType: "Email / Newsletter", scope: 1 },
                    // { subType: "Podcast", scope: 3 },
                    { subType: 'Network Emissions' },
                    { subType: 'Device Emissions' },
                    { subType: 'Data Center Emissions' },
                    // { subType: 'Podcast' },
                  ],
                };
              }
              return tab;
            }),
          };
        }
        return item;
      });

      return {
        ...state,
        data: filteredData,
      };
    },
    deleteResTabImageData: (state, action) => {
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'digitalCampaign') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Image') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Social Media", scope: 3 },
                    // { subType: "", scope: 3 },
                    // { subType: "Email / Newsletter", scope: 1 },
                    // { subType: "Podcast", scope: 3 },
                    { subType: 'Network Emissions' },
                    { subType: 'Device Emissions' },
                    { subType: 'Data Center Emissions' },
                    // { subType: 'Podcast' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'digitalCampaign') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Digital Campaign') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Social Media", scope: 3 },
                    // { subType: "", scope: 3 },
                    // { subType: "Email / Newsletter", scope: 1 },
                    // { subType: "Podcast", scope: 3 },
                    { subType: 'Social Media' },
                    { subType: '' },
                    { subType: 'Email / Newsletter' },
                    { subType: 'Podcast' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        // if (item.tabTitle === 'Virtual Event') {
        // if (item.tabTitle === 'outboundMarketing') {
        if (item.tabTitle === 'virtualEvent') {
          return {
            // tabTitle: "Virtual Event",
            tabTitle: 'Outbound Marketing',
            tabData: [
              // { subType: "", scope: 3 },
              // { subType: "", scope: 3 },
              // { subType: "", scope: 3 },
              // { subType: "", scope: 3 },
              // { subType: "", scope: 3 },
              // { subType: "", scope: 3 },
              // // { subType: "Event Promotion on Social Media", scope: 3 },
              // { subType: "", scope: 3 },
              // // { subType: "Live Broadcasting", scope: 1 },
              { subType: '' },
              { subType: '' },
              { subType: '' },
              { subType: '' },
              { subType: '' },
              { subType: '' },
              // { subType: "Event Promotion on Social Media" },
              { subType: '' },
              // { subType: "Live Broadcasting" },
            ],
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'prEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Comms') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Email Invitations", scope: 1 },
                    // { subType: "", scope: 1 },
                    // // { subType: "Social Media", scope: 3 },
                    // { subType: "PR Assets", scope: 2 },
                    { subType: 'Email Invitations' },
                    { subType: '' },
                    // { subType: "Social Media" },
                    { subType: 'PR Assets' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'prEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'Hospitality') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "", scope: 3 },
                    // { subType: "", scope: 3 },
                    // { subType: "", scope: 3 },
                    { subType: '' },
                    { subType: '' },
                    { subType: '' },
                  ],
                };
              }
              return tab;
            }),
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
      const filteredData = state?.data?.map((item) => {
        if (item?.from === 'prEvent') {
          return {
            ...item,
            allDataOfTab: item?.allDataOfTab?.map((tab) => {
              if (tab?.tabTitle === 'PR Agency') {
                return {
                  ...tab,
                  tabData: [
                    // { subType: "Meeting / Ball Room", scope: 3 },
                    // { subType: "Projector", scope: 3 },
                    // { subType: "Branding", scope: 3 },
                    // { subType: "PR Assets", scope: 3 },
                    // { subType: "Transportation", scope: 3 },
                    // { subType: "Energy", scope: 3 },
                    { subType: 'Meeting / Ball Room' },
                    { subType: 'Projector' },
                    { subType: 'Branding' },
                    { subType: 'PR Assets' },
                    { subType: 'Transportation' },
                    { subType: 'Energy' },
                  ],
                };
              }
              return tab;
            }),
          };
        }
        return item;
      });
      return {
        ...state,
        data: filteredData,
      };
    },
    prEventEmissionCatogorywise: (state, action) => {
      const { categories } = action.payload;

      categories?.forEach((category) => {
        const existingIndex = state?.prEventEmissionDataCategorywise?.findIndex(
          (sitem) => sitem?.catgName === category?.catgName
        );

        if (existingIndex !== -1) {
          state.prEventEmissionDataCategorywise[existingIndex] = category;
        } else {
          state.prEventEmissionDataCategorywise.push({
            ...category,
          });
        }
      });
    },
    deleteCommsCatogorywiseEmission: (state, action) => {
      const filteredData = state?.prEventEmissionDataCategorywise?.filter((category) => {
        return category?.catgName !== 'Email Invitations' && category?.catgName !== 'PR Assets';
      });

      return {
        ...state,
        prEventEmissionDataCategorywise: filteredData,
      };
    },
    deletePrAgencyCatogorywiseEmission: (state, action) => {
      const filteredData = state?.prEventEmissionDataCategorywise?.filter((category) => {
        return category?.catgName !== 'PR Agency';
      });

      return {
        ...state,
        prEventEmissionDataCategorywise: filteredData,
      };
    },
    deleteHospitalityCatogorywiseEmission: (state, action) => {
      const filteredData = state?.prEventEmissionDataCategorywise?.filter((category) => {
        return (
          category?.catgName !== 'Food/Lunch' &&
          category?.catgName !== 'Red Meat' &&
          category?.catgName !== 'Food-PetBottleWaste'
        );
      });

      return {
        ...state,
        prEventEmissionDataCategorywise: filteredData,
      };
    },
    deleteprEventEmissionCatogorywise: (state, action) => ({
      ...state,
      prEventEmissionDataCategorywise: [],
    }),
    setResultTableAllData: (state, action) => {
      state.data = action?.payload?.data;
      state.eventDataId = action?.payload?.eventDataId;
    },
    clearResultTableData: (state) => {
      state.data = [];
      state.prEventEmissionDataCategorywise = [];
      state.eventDataId = '';
      state.userAllEventsData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addResultTableDatasToDb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addResultTableDatasToDb.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action?.payload;
        state.eventDataId = action?.payload?._id;
        state.error = '';
      })
      .addCase(addResultTableDatasToDb.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action?.error?.message;
      })
      .addCase(updateResultTableDatasToDb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateResultTableDatasToDb.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.data = action.payload;
        state.eventDataId = action?.payload?._id;
        state.error = '';
      })
      .addCase(updateResultTableDatasToDb.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.error?.message;
      })
      .addCase(fetchResultTableDatasFromDb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchResultTableDatasFromDb.fulfilled, (state, action) => {
        state.isLoading = false;
        const { data, _id } = action?.payload;
        if (!_id) {
          state.userAllEventsData = data; // Update the state with the fetched data
        }
      })
      .addCase(fetchResultTableDatasFromDb.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.error?.message;
      });
  },
});

export const {
  addResultTableData,
  deleteResultTableAllData,
  deleteResTabAirTravelData,
  deleteResTabLocalTransData,
  deleteResTabFBData,
  deleteResTabLogisticsData,
  deleteResTabProductionData,
  deleteResTabEnergyData,
  deleteResTableDigitalContData,
  deleteResTabWasteData,
  deleteResTabHotelData,
  deleteResTabDgCampaignData,
  deleteResTabVrtEventData,
  deleteResTabCommsData,
  deleteResTabHospitalityData,
  deleteResTabImageData,
  deleteResTabVideoData,
  deleteResTabPrAgencyData,
  prEventEmissionCatogorywise,
  deleteCommsCatogorywiseEmission,
  deletePrAgencyCatogorywiseEmission,
  deleteHospitalityCatogorywiseEmission,
  deleteprEventEmissionCatogorywise,
  setResultTableAllData,
  clearResultTableData,
} = resultTableDataSlice.actions;
export default resultTableDataSlice.reducer;
