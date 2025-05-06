import { createAsyncThunk } from "@reduxjs/toolkit";

export const getJubHourByEmployeeThunk = createAsyncThunk(
    'getJubHourByEmployeeThunk',
    async (employeeId) => {
        debugger
        const response = await fetch(`https://localhost:7263/api/JubHours/GetByEmployee/${employeeId}` );
       
        const data = await response.json();
        return data;

    }
)