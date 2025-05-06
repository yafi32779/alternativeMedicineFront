import { combineSlices } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
// import { customersSlice } from "./customersSlice/customersSlice";
import { patientSlice } from "./patientSlice/patientSlice";
import { currentPatientSlice } from "./currentPatientSlice/currentPatientSlice";
import { employeeSlice } from "./employeeSlice/employeeSlice";
import { AvailebleTurnsSlice } from "./AvailebleTurnsSlice/AvailebleTurnsSlice";
import { turnsSlice } from "./turnsSlice/turnsSlice";
import { jubHourSlice } from "./jubHourSlice/jubHourSlice";
import { AvailebleTurnsAndTurnsSlice } from "./getData/AvailableturnsAndTurnsSlice";
import { TypeOfTreatsSlice } from "./TypeOfTreatsSlice/TypeOfTreatsSlice";


const reducer = combineSlices(patientSlice, currentPatientSlice, employeeSlice, AvailebleTurnsSlice
    ,turnsSlice, jubHourSlice,AvailebleTurnsAndTurnsSlice,TypeOfTreatsSlice);

export const STORE = configureStore({
    reducer: reducer
});

