import { createSlice } from "@reduxjs/toolkit";

import { getAllEmployeesThunk } from "./getAllEmployeesThunk";

const INITIAL_STATE = {
    listEmployees: [],
    currentEmployee :{}
}


export const employeeSlice = createSlice({
    name: 'employeeSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setCurrentEmployee: (state, action) => {
            debugger
            state.currentEmployee = action.payload
        }
    },

    extraReducers: (builder) => {

        builder.addCase(getAllEmployeesThunk.fulfilled, (state, action) => {           
            state.listEmployees = action.payload;
        });
    }

});

export const {setCurrentEmployee } = employeeSlice.actions;
