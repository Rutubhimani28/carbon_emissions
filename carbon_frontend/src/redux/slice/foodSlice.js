import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiget } from '../../service/api';

export const fetchFoodData = createAsyncThunk('fetchFoodData', async () => {
    const userid = sessionStorage.getItem('user_id');
    const userRole = sessionStorage.getItem("userRole");
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await apiget(`api/food`);
        return response?.data?.result;
    } catch (error) {
        throw error;
    }
});

const foodSlice = createSlice({
    name: 'foodData',
    initialState: {
        data: [],
        isLoading: false,
        error: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFoodData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFoodData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
            })
            .addCase(fetchFoodData.rejected, (state, action) => {
                state.isLoading = false;
                state.data = [];
                state.error = action.error.message;
            });
    },
});

export default foodSlice.reducer;