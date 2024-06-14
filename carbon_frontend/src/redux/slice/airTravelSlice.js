import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchAirTravelData = createAsyncThunk('fetchAirTravelData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await apiget(`api/airTravel`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const airTravelSlice = createSlice({
    name: 'airTravelData',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAirTravelData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAirTravelData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchAirTravelData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default airTravelSlice.reducer;