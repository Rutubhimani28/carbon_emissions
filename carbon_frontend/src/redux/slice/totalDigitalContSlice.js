import { createSlice } from "@reduxjs/toolkit";


const totalDigitalContSlice = createSlice({
    name: "totalDigitalContent",
    initialState: {
        data: [],
        totalEmission: 0
    },
    reducers: {
        addData: (state, action) => {
            state.data.push(action.payload);
            state.totalEmission = state.data.reduce((total, item) => total + item.emission, 0);
        },

        deleteData: (state, action) => {
            const { id } = action.payload;
            const filteredData = state.data.filter((item) => item.id !== id);
            const totalEmission = filteredData.reduce((total, item) => total + item.emission, 0);
            return {
                ...state,
                data: filteredData,
                totalEmission,
            };
        },

    },
});

export const { addData, deleteData } = totalDigitalContSlice.actions;
export default totalDigitalContSlice.reducer;