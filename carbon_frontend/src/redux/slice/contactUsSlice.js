import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchContactUsData = createAsyncThunk('fetchContactUsData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await apiget(`api/contactUs`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const contactUsSlice = createSlice({
    name: 'contactUsData',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContactUsData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchContactUsData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchContactUsData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default contactUsSlice.reducer;