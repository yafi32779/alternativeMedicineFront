import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomerThunk } from "./fetchCustomersThunk";
import { addCustomerThunk } from "./addCustomerThunk";
import { deleteCustomerThunk } from "./deletCustomerThunk";


const INITIAL_STATE = {
    list: [],
    loading: false,
    error: undefined
}

export const customersSlice = createSlice({
    name: 'customers',
    initialState: INITIAL_STATE,
    reducers: {
        setCustomers: (state, action) => {
            state.list = action.payload;
        },
        addCustomer: (state, action) => {
            state.list.push(action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    },

    // extraReducers - בו מוסיפים את כל המאזינים לטנקים - פונקציות אסינכרוניות
    extraReducers: (builder) => {
        // דרך הבילדר מוסיפים את המקרה הרצוי
        // pending - מתי שהטנק מתחיל 
        builder.addCase(fetchCustomerThunk.pending, (state) => {
            state.loading = true;
        });
        // fulfilled - מתי שהטנק מסתיים בהצלחה 
        builder.addCase(fetchCustomerThunk.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
        // rejected - מתי שהתרחשה שגיאה בהפעלה של הטנק 
        builder.addCase(fetchCustomerThunk.rejected, (state) => {
            state.error = "Failed to fetch data";
            state.loading = false;
        });
        builder.addCase(addCustomerThunk.fulfilled, (state, action) => {
            state.list.push(action.payload);
        });
        builder.addCase(deleteCustomerThunk.fulfilled, (state, action) => {
            state.list = action.payload;
        })
    }

});

// ייצוא האקשיינים כפונקציות
export const { setCustomers, addCustomer, setLoading, setError } = customersSlice.actions;
// addCustomer == customersSlice.actions.addCustomer