
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
// // import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Dialog } from '@mui/material';
// import { addTurnThunk } from '../../../redux/turnsSlice/addTurnThunk';
// import { GetAvailableTurnsByIdAndDate } from '../../../redux/AvailebleTurnsSlice/GetAvailableTurnsByIdAndDate';
// import { useEffect } from 'react';
// import { getTurnsByDateThunk } from '../../../redux/turnsSlice/getTurnsByDateThunk';
// import { getTurnByDateAndAvailableTurns } from '../../../redux/getData/getTurnByDateAndAvailableturns';
// import { setAvailableTurnsAndTurns, setAvailableTurnsBydate } from '../../../redux/AvailebleTurnsSlice/AvailebleTurnsSlice';
// import { setTurnsBydate } from '../../../redux/turnsSlice/turnsSlice';
// // import "./empDay.css"



// export const UpdatePatient = ({ patient,setOpen }) => {

//     // const [crazyOperator, setCrazyOperator] = useState(0)
//     //
//     const Employees = useSelector(state => state.employeeSlice.listEmployees)
//     const currentEmployee = useSelector(state => state.employeeSlice.currentEmployee)
//     const availableTurns = useSelector(state => state.AvailebleTurnsSlice.availableTurnsByDate)
//     const jubHours = useSelector(state => state.jubHourSlice.jubHours)
//     const userId = useSelector(state => state.patientSlice.userId)
//     const patients = useSelector(state => state.patientSlice.listPatient)
//     const turnsOfToday = useSelector(state => state.turnsSlice.turnsByDate)
//     const dataOfDate = useSelector(state => state.AvailebleTurnsAndTurnsSlice.availableTurnsAndTurns)
//     const hoursInDay = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
//     const minutsInHour = ['00', '15', '30', '45']
//     const dispatch = useDispatch()
//     const weekDayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
//     let newIndex = 0
//     let a = 0;
//     useEffect(() => {
//         console.log(hoursInDay.length);
//         console.log("hoursInDay.length");
//         debugger
//         // getAvailableTurnsByDateAndTurnsByDate()
//     }, [])

//     // useEffect(() => {
//     //     debugger
//     //     if (availableTurns[0] != -1 && turnsOfToday[0] != -1)
//     //         bildTurnsOfToday()

//     // }, [availableTurns])

//     // useEffect(() => {

//     //     debugger
//     //     if (dataOfDate.availableTurns) {
//     //         dispatch(setAvailableTurnsBydate(dataOfDate.availableTurns))
//     //         dispatch(setTurnsBydate(dataOfDate.turnsByDate))
//     //     }

//     // }, [dataOfDate])

//     // const getAvailableTurnsByDateAndTurnsByDate = async () => {
//     //     let theEmpId = currentEmployee.id
//     //     // "2025-04-28"
//     //     let date = `${dateOfDay.getFullYear()}-${dateOfDay.getMonth() + 1}-${dateOfDay.getDate()}`
//     //     let length = 15
//     //     await dispatch(getTurnByDateAndAvailableTurns({ theEmpId, date, length }))
//     // }


//     const [try1, setTry1] = useState();
//     const [type, setType] = useState({});
//     const [flagDatiels, setFlagDatiels] = useState(false);
//     const [turnIndex, setTurnIndex] = useState(-1);
//     const [newArray, setNewArray] = useState([])

//     const BootstrapDialog = styled(Dialog)(({ theme }) => ({

//         '& .MuiDialogContent-root': {
//             padding: theme.spacing(2),
//         },
//         '& .MuiDialogActions-root': {
//             padding: theme.spacing(1),
//         },
//     }));


//     const handleClose = () => {
//          setOpen(false);
//         // setFlagDatiels(false)
//     };

  

//     return <div>


//         <BootstrapDialog
//             onClose={handleClose}
//             aria-labelledby="customized-dialog-title"
//             // open={open}
//         >
//             <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//                 <div id='titleDialog'>
//                     <div style={{ width: "150px" }}>עריכת פרטי פציינט :</div>
//                 </div>
//             </DialogTitle>
//             <IconButton
//                 aria-label="close"
//                 onClick={handleClose}
//                 sx={(theme) => ({
//                     position: 'absolute',
//                     right: 8,
//                     top: 8,
//                     color: theme.palette.grey[500],
//                 })}
//             >
//             aaa
//                 <CloseIcon />
//             </IconButton>
//             <DialogContent dividers style={{ direction: "rtl" }} >
//                 <div>
//                     <label htmlFor="">מספר זהות</label>
//                     <input type="text" value={patient.id} />
//                 </div>
//                 <div>
//                     <label htmlFor="">שם פרטי</label>
//                     <input type="text" value={patient.firstName} />
//                 </div>
//                 <div>
//                     <label htmlFor="">שם משפחה</label>
//                     <input type="text" value={patient.lastName} />
//                 </div>
//                 <div>
//                     <label htmlFor="">מספר טלפון</label>
//                     <input type="text" value={patient.phone} />
//                 </div>
//                 <div>
//                     <label htmlFor="">כתובת מייל</label>
//                     <input type="text" value={patient.email} />
//                 </div>
//                 <div>
//                     <label htmlFor="">כתובת</label>
//                     <input type="text" value={patient.address} />
//                 </div>
//                 <div>
//                     <label htmlFor="">סיבה</label>
//                     <input type="text" value={patient.reason} />
//                 </div>


//             </DialogContent>





//             <DialogActions>
//                 <Button id='buttonToCancal' autoFocus onClick={() => setFlagDatiels(false)}>
//                     חזרה
//                 </Button>
//                 <Button id='buttonToCancal' autoFocus onClick={() => setFlagDatiels(false)}>
//                     אישור
//                 </Button>
//             </DialogActions>
//         </BootstrapDialog >
//     </div >
// }