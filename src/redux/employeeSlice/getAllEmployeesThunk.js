import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllEmployeesThunk = createAsyncThunk(
    'getAllEmployeesThunk',
    async () => {
        const response = await fetch('https://localhost:7263/api/Employee/GetAll' );          
       
        const data = await response.json();
        return data;

    }
)