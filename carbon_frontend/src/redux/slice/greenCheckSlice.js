// src/redux/slice/greenCheckSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'AIzaSyDK4cCTU7sMJSN2MdqzuQH2yHwCIAje958';

// Thunk to fetch page size
export const fetchPageSize = createAsyncThunk(
    'greenCheck/fetchPageSize',
    async (url, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed', {
                params: {
                    url,
                    strategy: 'mobile',
                    key: API_KEY,
                },
            });
            
            const bytes = response.data.lighthouseResult.audits['total-byte-weight'].numericValue;
            const mb = (bytes / 1024 / 1024).toFixed(2);
            return mb;
        } catch (error) {
            return rejectWithValue('Failed to fetch page size. Please check the URL.');
        }
    }
);

const greenCheckSlice = createSlice({
    name: 'greenCheckDetails',
    initialState: {
        pageSizeMB: null,
        loading: false,
        error: '',
    },
    reducers: {
        deletePageSizeMb: (state, action) => {
            return {
                ...state,
                pageSizeMB: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPageSize.pending, (state) => {
                state.loading = true;
                state.error = '';
                state.pageSizeMB = null;
            })
            .addCase(fetchPageSize.fulfilled, (state, action) => {
                state.loading = false;
                state.pageSizeMB = action.payload;
            })
            .addCase(fetchPageSize.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { deletePageSizeMb } = greenCheckSlice.actions;
export default greenCheckSlice.reducer;
