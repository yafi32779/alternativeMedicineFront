import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTurnByDateAndAvailableTurns = createAsyncThunk(
    'getTurnByDateAndAvailableTurns',
    async (params) => {
        debugger
        const response = await fetch(`https://localhost:7263/api/AvailableTurn/GetTurnsByDateAndAvailableTurnsByDate/${params.theEmpId}/${params.date}/${params.length}`);          
       
        const data = await response.json();
        return data;

    }
)