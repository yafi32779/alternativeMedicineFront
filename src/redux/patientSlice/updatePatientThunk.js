import { createAsyncThunk } from "@reduxjs/toolkit";

export const updatePatientThunk = createAsyncThunk(
    'updatePatientThunk',
    async (Employee) => {
        debugger
        const response = await fetch('https://localhost:7263/api/Employee/Update',
            {
                method: 'PUT',
                body: JSON.stringify(Employee),
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );

        const data = await response.json();
        debugger
        return data;

    }
)