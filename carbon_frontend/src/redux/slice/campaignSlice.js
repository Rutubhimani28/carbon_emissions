import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchCampaignData = createAsyncThunk('fetchCampaignData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await apiget(`api/campaign`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const productionSlice = createSlice({
    name: 'campaignData',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampaignData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCampaignData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchCampaignData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default productionSlice.reducer;