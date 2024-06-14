import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchTransportationData = createAsyncThunk('fetchTransportationData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await apiget(`api/transportation`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const digitalContentSlice = createSlice({
    name: 'transportationData',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransportationData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTransportationData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchTransportationData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default digitalContentSlice.reducer;