import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchEnergyData = createAsyncThunk('fetchEnergyData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await apiget(`api/energy`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const energySlice = createSlice({
    name: 'energyData',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEnergyData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchEnergyData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchEnergyData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default energySlice.reducer;