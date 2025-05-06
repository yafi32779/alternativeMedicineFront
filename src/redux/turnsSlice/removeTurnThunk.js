import { createAsyncThunk } from "@reduxjs/toolkit";

export const removeTurnThunk = createAsyncThunk(
    'removeTurnThunk',
    
    async (turnCode) => {
        debugger
        const response = await fetch( `https://localhost:7263/api/Turns/Remove/${turnCode}`,
            { method: 'DELETE' }
        );
        debugger
        const data = await response.json();
        debugger
        return data;

    }
)