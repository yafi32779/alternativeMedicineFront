import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTypes = createAsyncThunk(
    'getAllTypes',
    async () => {
        debugger
        const response = await fetch('https://localhost:7263/api/TypeOfTreats/Get' );          
       
        const data = await response.json();
        return data;

    }
)