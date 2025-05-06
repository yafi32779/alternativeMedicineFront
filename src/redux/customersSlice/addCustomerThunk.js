import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCustomerThunk = createAsyncThunk(
    'addCustomerThunk',
    async (customer) => {
        const response = await fetch('http://localhost:8083/customers',
            {
                method: 'POST',
                body: JSON.stringify(customer),
                headers: {
                    'Content-type': 'application/json'
                }
            }
        );
        const data = await response.json();
        return data;

    }
)