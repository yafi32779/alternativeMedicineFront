import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    currentPatient: {},
    treats: [],
    turns: []
}

export const currentPatientSlice = createSlice({
    name: 'currentPatientSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentPatient: (state, action) => {
            debugger
            state.currentPatient = action.payload;
        }

    },

    extraReducers: (builder) => {
     

    }
});

export const { setCurrentPatient } = currentPatientSlice.actions;
