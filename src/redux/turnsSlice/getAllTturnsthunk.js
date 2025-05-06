
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTurnsThunk = createAsyncThunk(
    'getAllTurnsThunk',
    async () => {
        const response = await fetch('https://localhost:7263/api/Turns/Get');          
       
        const data = await response.json();
        return data;

    }
)