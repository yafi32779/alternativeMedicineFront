import { createAsyncThunk } from "@reduxjs/toolkit";

// createAsyncThunk 
// משמש להגדיר פונקציה אסינכרונית שמעדכנת את הסטור
// הפונקציה מקבלת את השם של האקשיין
export const fetchCustomerThunk = createAsyncThunk(
    'fetchCustomerThunk',
    // פונקציה אסינכרונית להפעלה
    async () => {
        const response = await fetch('http://localhost:8083/customers');
        if(response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('Failed to get data from the server');
        }
    }
)

// הטנק מגיע 3 פעמים לרידוסר בסטור
// שהפונקציה מתחילה, שהיא מסתיימת , אם היתה שגיאה 

