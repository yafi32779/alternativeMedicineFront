import { createAsyncThunk } from "@reduxjs/toolkit";

export const addTurnThunk = createAsyncThunk(
    'addTurnThunk',
    async (turn) => {
debugger
        const response = await fetch('https://localhost:7263/api/Turns/Add' ,
            {
                method: 'POST',
                body: JSON.stringify(turn),
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );
        
        const data = await response.json();
        debugger
        return data;

    }
)