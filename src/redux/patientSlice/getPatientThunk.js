import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPatientThunk = createAsyncThunk(
    'getPatientThunk',
    async () => {
        const response = await fetch('https://localhost:7263/api/Patient/GetAllPatients' );          
       
        const data = await response.json();
        return data;

    }
)