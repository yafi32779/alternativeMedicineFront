import { createAsyncThunk } from "@reduxjs/toolkit";

export const addPatientThunk = createAsyncThunk(
    'addPatientThunk',
    async (patient) => {
        debugger
        const response = await fetch('https://localhost:7263/api/Patient/Add',
            {
                method: 'POST',
                body: JSON.stringify(patient),
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );
        debugger
        const data = await response.json();
        debugger
        return data;

    }
)