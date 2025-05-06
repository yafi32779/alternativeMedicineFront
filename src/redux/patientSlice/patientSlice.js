import { createSlice } from "@reduxjs/toolkit";
import { addPatientThunk } from "./addPatientThunk";
import { getPatientThunk } from "./getPatientThunk";

const INITIAL_STATE = {
    listPatient: [],
    userId : -1,
    userName : '' 
}


export const patientSlice = createSlice({
    name: 'patientSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },


    extraReducers: (builder) => {

        builder.addCase(addPatientThunk.fulfilled, (state, action) => {
            debugger
            console.log("הגעתי");
            console.log(action.payload);
            state.listPatient = action.payload;

        });

        builder.addCase(addPatientThunk.rejected, (state) => {
            console.log("rejected-הגעתי");
        });

        builder.addCase(getPatientThunk.fulfilled, (state, action) => {
            state.listPatient = action.payload;
        });
    }
});

export const {setUserId } = patientSlice.actions;
