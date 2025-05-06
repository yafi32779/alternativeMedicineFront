import { createSlice } from "@reduxjs/toolkit";
import { getTurnByDateAndAvailableTurns } from "./getTurnByDateAndAvailableturns";

const INITIAL_STATE = {
    availableTurnsAndTurns : {}
}

export const AvailebleTurnsAndTurnsSlice = createSlice({
    name: 'AvailebleTurnsAndTurnsSlice',
    initialState: INITIAL_STATE,
    reducers: {
           
    },

    extraReducers: (builder) => {
        builder.addCase(getTurnByDateAndAvailableTurns.fulfilled, (state, action) => {
            debugger
            state.availableTurnsAndTurns = action.payload;
        });

    }

});

export const { } = AvailebleTurnsAndTurnsSlice.actions;
