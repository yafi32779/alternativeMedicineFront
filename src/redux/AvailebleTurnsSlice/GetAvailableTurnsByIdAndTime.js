import { createAsyncThunk } from "@reduxjs/toolkit";

export const GetAvailableTurnsByIdAndTime = createAsyncThunk(

    'GetAvailableTurnsByIdAndTime',
    async (params) => {
        debugger
        const response = await fetch(`https://localhost:7263/api/AvailableTurn/GetAvailableTurnsByIdAndTime/${params.theEmpId}/${params.time}/${params.length}`);          
       
        const data = await response.json();
        return data;

    }
)