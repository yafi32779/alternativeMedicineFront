import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
// import { Login } from "@mui/icons-material";
import { LogIn } from "../login/logIn";
import { SingIn } from "../patient/singIn/singIn";
import { AvailableTurns } from "../patient/availableTurns/availableTurns";
import { Patients } from "../emploeey/patients/patients";
import { NewHome } from "../Home/home";
// import { PatientHome } from "../patient/patientHome/patientHome";
import { EmpHome } from "../emploeey/empHome/empHome";
import { PatientHome } from "../patient/patientHome/patientHome";
// import { PatientHome } from "../patient/patientHome/patientHome";

export const Routing = () => {

    const [login, setLogin] = useState(false);



    return <>
        {/* <button onClick={() => setLogin(!login)}> {login ? 'Logout' : 'Login'}</button> */}
        {/* <Login handleUserLogin={setUserName} isUserLogin={Boolean(userName) }/> */}

        <Routes>
            <Route path='/' element={<NewHome></NewHome>} />
            <Route path='/logIn' element={<LogIn></LogIn>} />
            <Route path='/singIn/:id' element={<SingIn></SingIn>} />
            <Route path='/patients' element={<Patients></Patients>} />
            <Route path='/patientHome' element={<PatientHome></PatientHome>} />
            <Route path='/empHome' element={<EmpHome></EmpHome>} />

            <Route path="/availableTurns" element={<AvailableTurns></AvailableTurns>} />
            <Route path="/:x" element={<NewHome></NewHome>} />
            {/*  הקומפוננטה נביגייט משנה את הניתוב לפי הפרופס טו, ולא  מרנדרת שום דבר */}
            {/*  נשתמש בה כאשר יש ניתובים שהמשתמש לא רשאי להכנס אליהם */}
            {/* <Route path="/marketing" element={userName ? <Marketing /> : <Navigate to='/home'/>} /> */}
        </Routes>
    </>
};

