import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAvailableTurnsByAllParams = createAsyncThunk(
    'GetAvailableTurnsByAllParams',
    async (params) => {
        debugger
        const response = await fetch(`https://localhost:7263/api/AvailableTurn/GetAvailableTurnsByAllParams/${params.theEmpId}/${params.time}/${params.date}/${params.length}`);          
       
        const data = await response.json();
        return data;

    }
)