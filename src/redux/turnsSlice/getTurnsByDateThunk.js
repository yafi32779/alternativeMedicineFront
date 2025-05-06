
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTurnsByDateThunk = createAsyncThunk(
    'getTurnsByDateThunk',
    async (params) => {
        debugger
        const response = await fetch(`https://localhost:7263/api/Turns/GetByDate/${params.date}`);          
       
        const data = await response.json();
        return data;

    }
)