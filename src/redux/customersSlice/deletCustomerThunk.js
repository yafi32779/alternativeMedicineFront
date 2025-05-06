import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteCustomerThunk = createAsyncThunk(
    'deleteCustomerThunk',
    async (customerId) => {
        const response = await fetch(`http://localhost:8083/customers/${customerId}`,
            { method: 'DELETE' }
        );
        const data = await response.json();
        return data;

    }
)