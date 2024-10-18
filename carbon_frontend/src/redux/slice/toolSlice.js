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
        },
        setToolFormAllData: (state, action) => {
            // state.data = action.payload.data;
            state.data = action.payload;
        }
    },
});

export const { addToolData, clearToolData, clearToolFormData, clearLogisticsData, setToolFormAllData } = toolSlice.actions;
export default toolSlice.reducer;