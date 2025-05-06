import { createSlice } from "@reduxjs/toolkit";
import { getAllTypes } from "./GetAllTypesThunk";

const INITIAL_STATE = {
    typeOfTreats :[]
}

export const TypeOfTreatsSlice = createSlice({
    name: 'TypeOfTreatsSlice',
    initialState: INITIAL_STATE,
    reducers: {
           
    },

    extraReducers: (builder) => {
        builder.addCase(getAllTypes.fulfilled, (state, action) => {
            state.typeOfTreats = action.payload;
        });

    }

});

export const { } = TypeOfTreatsSlice.actions;
