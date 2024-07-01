import { createSlice } from "@reduxjs/toolkit";


const totalLocalTranspotationSlice = createSlice({
    name: "localTranspotation",
    initialState: {
        data: [],
        totalEmission: 0,
        scope1: 2,
        scope2: 3,
        scope2: 3,
    },
    reducers: {
        addLocalTranspotationData: (state, action) => {
            const newData = Array.isArray(action.payload) ? action.payload : [action.payload];
            newData.forEach((newItem) => {
                const existingItemIndex = state.data.findIndex((item) => item.type === newItem.type);
                if (existingItemIndex !== -1) {
                    state.data[existingItemIndex] = { ...state.data[existingItemIndex], ...newItem };
                } else {
                    state.data.push(newItem);
                }
            });
            state.totalEmission = state.data[0].data.reduce((total, item) => total + item.emission, 0).toFixed(2);
        },
        deleteLocalTranspotationData: (state, action) => ({
            ...state,
            data: [],
            totalEmission: 0,
            scope1: 2,
            scope2: 3,
            scope2: 3,
        }),
        scopeChange: (state, action) => ({
            ...state,
            scope1: action.payload.scope1,
            scope2: action.payload.scope2,
            scope3: action.payload.scope3,
        })
    },
});

export const { addLocalTranspotationData, deleteLocalTranspotationData, scopeChange } = totalLocalTranspotationSlice.actions;
export default totalLocalTranspotationSlice.reducer;