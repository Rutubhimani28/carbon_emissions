import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchAirFreightData = createAsyncThunk('fetchAirFreightData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await apiget(`api/airFreight`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const airFreightSlice = createSlice({
    name: 'airFreightData',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAirFreightData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAirFreightData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchAirFreightData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default airFreightSlice.reducer;