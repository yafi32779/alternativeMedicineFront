
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTurnsByEmployeeId = createAsyncThunk(
    'getTurnsByEmployeeId',
    async (employeeId) => {
        debugger
        const response = await fetch(`https://localhost:7263/api/Turns/GetByDate/${employeeId}`);          
       
        const data = await response.json();
        return data;

    }
)