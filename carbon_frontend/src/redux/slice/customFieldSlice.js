// /* eslint-disable no-useless-catch */
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { apiget } from '../../service/api';

// export const fetchCustomFieldData = createAsyncThunk('fetchCustomFieldData', async () => {
//     const userid = sessionStorage.getItem('user_id');
//     const userRole = sessionStorage.getItem("userRole");
//     try {
//         const response = await apiget(`api/custom-field/`);
//         console.log("fetchCustomFieldData response ", response?.data);
//         return response?.data;
//     } catch (error) {
//         throw error;
//     }
// });

// const customFieldSlice = createSlice({
//     name: 'customFieldDetails',
//     initialState: {
//         data: [],
//         isLoading: false,
//         error: "",
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCustomFieldData.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(fetchCustomFieldData.fulfilled, (state, action) => {
//                 state.isLoading = false;
//                 state.data = action.payload;
//                 state.error = "";
//             })
//             .addCase(fetchCustomFieldData.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.data = [];
//                 state.error = action.error.message;
//             });
//     },
// });

// export default customFieldSlice.reducer;