import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAvailableTurnsByIdAndDate = createAsyncThunk(
    'GetAvailableTurnsByIdAndDate',
    async (params) => {
        debugger
        const response = await fetch(`https://localhost:7263/api/AvailableTurn/GetAvailableTurnsByIdAndDate/${params.theEmpId}/${params.date}/${params.length}`);          
       
        const data = await response.json();
        debugger
        return data;

    }
)