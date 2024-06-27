import { createSlice } from "@reduxjs/toolkit";

const toolSlice = createSlice({
    name: "tool",
    initialState: {
        data: [],
    },
    reducers: {
        addToolData: (state, action) => {
            const newItemObj = action.payload;
            const existingItemIndex = state.data.findIndex((item) => item?.type === newItemObj?.type);
            if (existingItemIndex !== -1) {
                state.data[existingItemIndex] = { ...state.data[existingItemIndex], ...newItemObj };
            } else {
                state.data.push(newItemObj);
            }
        },
        clearToolData: (state) => {
            state.data = [];
        },
        clearToolFormData: (state, action) => {
            state.data = state.data.filter((item) => item.type !== "toolForm")
        }
    },
});

export const { addToolData, clearToolData, clearToolFormData, clearLogisticsData } = toolSlice.actions;
export default toolSlice.reducer;