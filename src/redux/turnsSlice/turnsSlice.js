import { createSlice } from "@reduxjs/toolkit";
import { addTurnThunk } from "./addTurnThunk";
import { getAllTurnsThunk } from "./getAllTturnsthunk";
import { getTurnsByDateThunk } from "./getTurnsByDateThunk";
import { removeTurnThunk } from "./removeTurnThunk";
import { useDispatch, useSelector } from "react-redux";
import { GetAvailableTurnsById } from "../AvailebleTurnsSlice/GetAvailableTurnsByIdThunk";
import { getTurnsByEmployeeId } from "./getTurnsByEmployeeIdThunk";
import { getTurnByDateAndAvailableTurns } from "../getData/getTurnByDateAndAvailableturns";

const INITIAL_STATE = {
  turns : [],
  turnsByDate : [-1]
}

export const turnsSlice = createSlice({
    name: 'turnsSlice',
    initialState: INITIAL_STATE,
    reducers: {
      setTurnsBydate: (state, action) => {
         debugger
         state.turnsByDate = action.payload;
     },

    },

    extraReducers: (builder) => {
        builder.addCase(addTurnThunk.fulfilled, (state, action) => {           
           debugger
           
           console.log(action.payload);
        });

        builder.addCase(getTurnsByEmployeeId.fulfilled, (state, action) => {           
            state.turns=action.payload
         });
         builder.addCase(getTurnsByDateThunk.fulfilled, (state, action) => {   
          debugger        
          state.turnsByDate=action.payload
       });
       builder.addCase(removeTurnThunk.fulfilled, (state, action) => {   
         debugger   
         let userId = useSelector(state => state.employeeSlice.currentEmployee.id)   
         debugger    
         useDispatch(getTurnByDateAndAvailableTurns(userId,state.turnsByDate[0].date,state.turnsByDate[0].length))
      });
    }

});

export const {setTurnsBydate } = turnsSlice.actions;
