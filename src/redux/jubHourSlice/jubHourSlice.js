import { createSlice } from "@reduxjs/toolkit";

import { getJubHourByEmployeeThunk } from "./getJubHourByEmployeeThunk";

const INITIAL_STATE = {
    jubHours: [],
}


export const jubHourSlice = createSlice({
    name: 'jubHourSlice',
    initialState: INITIAL_STATE,
    reducers: {

    },

    extraReducers: (builder) => {

        builder.addCase(getJubHourByEmployeeThunk.fulfilled, (state, action) => {      
            debugger     
            state.jubHours = action.payload;
        });
    }

});

export const { } = jubHourSlice.actions;
