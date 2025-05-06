import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAvailableTurnsById = createAsyncThunk(
    'GetAvailableTurnsById',
    async (params) => {
        
        debugger
        const response = await fetch(`https://localhost:7263/api/AvailableTurn/GetAvailableTurnsById/${params.theEmpId}/${params.length}`);          
       debugger
        const data = await response.json();
        debugger
        return data;

    }
)