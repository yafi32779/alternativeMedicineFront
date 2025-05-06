import { createSlice } from "@reduxjs/toolkit";
import { GetAvailableTurnsById } from "./GetAvailableTurnsByIdThunk";
import { GetAvailableTurnsByIdAndDate } from "./GetAvailableTurnsByIdAndDate";
import { GetAvailableTurnsByIdAndTime } from "./GetAvailableTurnsByIdAndTime";
import { GetAvailableTurnsByAllParams } from "./GetAvailableTurnsByAllParamsThunk";

const INITIAL_STATE = {
    availebleTurns: [-1],
    availableTurnsByDate :[-1]

}

export const AvailebleTurnsSlice = createSlice({
    name: 'AvailebleTurnsSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setAvailableTurnsBydate: (state, action) => {
            state.availableTurnsByDate = action.payload;
        },

    },

    extraReducers: (builder) => {
        builder.addCase(GetAvailableTurnsById.fulfilled, (state, action) => {
            debugger
            state.availebleTurns = action.payload;
        });

        // builder.addCase(GetAvailableTurnsByIdAndDate.fulfilled, (state, action) => {
        //     debugger
        //     state.availebleTurns = action.payload;
        // });

        builder.addCase(GetAvailableTurnsByIdAndTime.fulfilled, (state, action) => {
            debugger
            state.availebleTurns = action.payload;
        });

        builder.addCase(GetAvailableTurnsByAllParams.fulfilled, (state, action) => {
            debugger
            state.availebleTurns = action.payload;
        });

    }

});

export const { setAvailableTurnsBydate} = AvailebleTurnsSlice.actions;
