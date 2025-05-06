import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Grid,
    Paper,
    Divider,
    Chip,
    Tooltip,
    CircularProgress,
    Avatar
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import EventIcon from '@mui/icons-material/Event';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import HistoryIcon from '@mui/icons-material/History';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { getTurnByDateAndAvailableTurns } from '../../../redux/getData/getTurnByDateAndAvailableturns';
import { setAvailableTurnsAndTurns, setAvailableTurnsBydate } from '../../../redux/AvailebleTurnsSlice/AvailebleTurnsSlice';
import { setTurnsBydate } from '../../../redux/turnsSlice/turnsSlice';
import { removeTurnThunk } from '../../../redux/turnsSlice/removeTurnThunk';
import "./empDay.css";

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(2),
    },
    '& .MuiPaper-root': {
        borderRadius: '12px',
        maxWidth: '800px',
        width: '100%'
    }
}));
const TimeSlot = styled(Box)(({ theme, status, isselected, customcolor }) => {
    let bgColor = 'white';
    let hoverColor = alpha('#d8c3a5', 0.1);
    let borderColor = '#e0e0e0';

    // אם יש צבע מותאם אישית, השתמש בו
    if (customcolor) {
        bgColor = customcolor;
        hoverColor = alpha(customcolor, 0.2); // מעט כהה יותר בהובר
        borderColor = alpha(customcolor, 0.3); // גבול כהה יותר
    } 
    // אחרת, השתמש בסטטוס הרגיל
    else if (status === 'booked') {
        bgColor = alpha('#4a7c59', 0.08); // ירוק עדין יותר
        hoverColor = alpha('#4a7c59', 0.12);
        borderColor = alpha('#4a7c59', 0.2);
    } else if (status === 'available') {
        bgColor = alpha('#c4a77d', 0.08); // חום כהה יותר עדין
        hoverColor = alpha('#c4a77d', 0.12);
        borderColor = alpha('#c4a77d', 0.2);
    } else if (status === 'cancelled') {
        bgColor = alpha('#f44336', 0.08); // אדום עדין יותר
        hoverColor = alpha('#f44336', 0.12);
        borderColor = alpha('#f44336', 0.2);
    }

    if (isselected) {
        bgColor = alpha('#d8c3a5', 0.15); // צבע בחירה עדין יותר
        borderColor = '#d8c3a5';
    }

    return {
        padding: '8px 12px',
        borderBottom: '1px solid rgba(95, 95, 95, 0.05)', // גבול תחתון עדין יותר
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: '4px',
        marginBottom: '4px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: hoverColor,
            transform: 'translateY(-2px)',
            boxShadow: '0 2px 5px rgba(0,0,0,0.03)' // צל עדין יותר
        }
    };
});
const ActionButton = styled(Button)(({ theme, color }) => ({
    margin: '5px',
    borderRadius: '20px',
    padding: '6px 16px',
    backgroundColor: color === 'primary' ? '#4a7c59' :
        color === 'secondary' ? '#8fb996' :
            color === 'error' ? '#f44336' : '#e0e0e0',
    color: 'white',
    '&:hover': {
        backgroundColor: color === 'primary' ? '#2c5530' :
            color === 'secondary' ? '#6b9b76' :
                color === 'error' ? '#d32f2f' : '#bdbdbd',
    }
}));

export const EmpDay = ({ dateOfDay, treat, open, setOpen, nameOfDay }) => {
    debugger

    const dispatch = useDispatch();
    const Employees = useSelector(state => state.employeeSlice.listEmployees);
    const currentEmployee = useSelector(state => state.employeeSlice.currentEmployee);
    const availableTurns = useSelector(state => state.AvailebleTurnsSlice.availableTurnsByDate);
    const jubHours = useSelector(state => state.jubHourSlice.jubHours);
    const patients = useSelector(state => state.patientSlice.listPatient);
    const turnsOfToday = useSelector(state => state.turnsSlice.turnsByDate);
    const typeOfTreats = useSelector(state => state.TypeOfTreatsSlice.typeOfTreats);
    const dataOfDate = useSelector(state => state.AvailebleTurnsAndTurnsSlice.availableTurnsAndTurns);

    const hoursInDay = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    const minutsInHour = ['00', '15', '30', '45'];

    const [loading, setLoading] = useState(true);
    const [type, setType] = useState({});
    const [flagDatiels, setFlagDatiels] = useState(false);
    const [newArray, setNewArray] = useState([]);
    const [typeOfChoosenTreat, setTypeOfChoosenTreat] = useState();

    
    useEffect(() => {
        debugger
        console.log("useEffect in EmpDay running", { dateOfDay });
        let theEmpId = currentEmployee.id;
       
        const year = dateOfDay.getFullYear();
        const month = String(dateOfDay.getMonth() + 1).padStart(2, '0');
        const day = String(dateOfDay.getDate()).padStart(2, '0');
        const date = `${year}-${month}-${day}`;
        let length = 15;
        dispatch(getTurnByDateAndAvailableTurns({theEmpId, date, length}));
    }, [dateOfDay]);

    // useEffect(() => {
    //     debugger
    //     dispatch(getTurnByDateAndAvailableTurns(dateOfDay));
    // }, []);

    useEffect(() => {
        if (open) {
            console.log("EmpDay opened with date:", dateOfDay);
            // console.log("Turns for this day:", turns);
            console.log("Dialog state:", open);
        }
    }, [open, dateOfDay]);



    useEffect(() => {
        debugger
        if (availableTurns[0] != -1 && turnsOfToday[0] != -1) {
            bildTurnsOfToday();
            setLoading(false);
        }
    }, [availableTurns]);

    useEffect(() => {
        if (dataOfDate.availableTurns) {
            dispatch(setAvailableTurnsBydate(dataOfDate.availableTurns));
            dispatch(setTurnsBydate(dataOfDate.turnsByDate));
        }
    }, [dataOfDate]);

    const getAvailableTurnsByDateAndTurnsByDate = async () => {
        setLoading(true);
        let theEmpId = currentEmployee.id;
        let date = `${dateOfDay.getFullYear()}-${dateOfDay.getMonth() + 1}-${dateOfDay.getDate()}`;
        let length = 15;
        await dispatch(getTurnByDateAndAvailableTurns({ theEmpId, date, length }));
    };

    const bildTurnsOfToday = () => {
        let newa = [];
        let indexAvailableTurns = 0;
        let indexturnsOfToday = 0;

        while (indexAvailableTurns < availableTurns.length && indexturnsOfToday < turnsOfToday.length) {
            if (availableTurns[indexAvailableTurns].time < turnsOfToday[indexturnsOfToday].time) {
                newa.push({ flag: false, value: availableTurns[indexAvailableTurns] });
                indexAvailableTurns++;
            } else {
                newa.push({ flag: true, value: turnsOfToday[indexturnsOfToday] });
                indexturnsOfToday++;
            }
        }

        if (indexAvailableTurns < availableTurns.length) {
            for (let index = indexAvailableTurns; index < availableTurns.length; index++) {
                newa.push({ flag: false, value: availableTurns[index] });
            }
        } else {
            for (let index = indexturnsOfToday; index < turnsOfToday.length; index++) {
                newa.push({ flag: true, value: turnsOfToday[index] });
            }
        }

        setNewArray(newa);
    };

    const handleClose = () => {
        setOpen(false);
        setFlagDatiels(false);
    };

    const cancelTurn = async (turnCode) => {
        await dispatch(removeTurnThunk(turnCode));
        setFlagDatiels(false);
        getAvailableTurnsByDateAndTurnsByDate();
    };

    // const getTimeSlotStatus = (time, newArray, index) => {
    //     if (newArray[index - 1] && newArray[index - 1].flag && newArray[index - 1].value.time === time) {
    //         if (newArray[index - 1].value.employeeId === -1) {
    //             return 'cancelled';
    //         }
    //         return 'booked';
    //     } else if (newArray[index - 1] && !newArray[index - 1].flag && newArray[index - 1].value.time === time) {
    //         return 'available';
    //     }
    //     return 'free';
    // };

    const getTimeSlotStatus = (time, newArray, index) => {
        // חפש תור תפוס בזמן הנוכחי
        const bookedTurn = newArray.find(item => 
            item.flag && item.value.time === time && item.value.employeeId !== -1
        );
        
        if (bookedTurn) {
            return 'booked';
        }
        
        // חפש תור מבוטל בזמן הנוכחי
        const cancelledTurn = newArray.find(item => 
            item.flag && item.value.time === time && item.value.employeeId === -1
        );
        
        if (cancelledTurn) {
            return 'cancelled';
        }
        
        // חפש זמן פנוי בזמן הנוכחי
        const availableTurn = newArray.find(item => 
            !item.flag && item.value.time === time
        );
        
        if (availableTurn) {
            return 'available';
        }
        
        // אם לא נמצא כלום, זה זמן חופשי
        return 'free';
    };
    const handleTimeSlotClick = (e, hour, minut, index) => {
        const time = `${hour}:${minut}:00`;
        debugger
        // בדיקה אם זו משבצת המשך של תור ארוך (a > 0)
        // if (a > 0) {
            // חיפוש התור המקורי שמשבצת זו היא חלק ממנו
            const originalTurn = findOriginalTurn(hour, minut);
            if (originalTurn) {
                setType({
                    theType: 'turn',
                    time: originalTurn.time, // זמן התחלת התור המקורי
                    value: originalTurn
                });
                setFlagDatiels(true);
                return;
            // }
        }
        
        // קבל את הסטטוס של התור
        const status = getTimeSlotStatus(time, newArray, index);
        
        // קבע את סוג התור בהתאם לסטטוס
        if (status === 'booked') {
            // מצא את התור המתאים במערך
            const bookedTurn = newArray.find(item => 
                item.flag && item.value.time === time && item.value.employeeId !== -1
            );
            
            if (bookedTurn) {
                setType({
                    theType: 'turn',
                    time,
                    value: bookedTurn.value
                });
            }
        } else if (status === 'available') {
            // מצא את התור הפנוי המתאים במערך
            const availableTurn = newArray.find(item => 
                !item.flag && item.value.time === time
            );
            
            if (availableTurn) {
                setType({
                    theType: 'availableTurn',
                    time,
                    value: availableTurn.value
                });
            }
        } else if (status === 'cancelled') {
            // מצא את התור המבוטל המתאים במערך
            const cancelledTurn = newArray.find(item => 
                item.flag && item.value.time === time && item.value.employeeId === -1
            );
            
            if (cancelledTurn) {
                setType({
                    theType: 'cancelledTurn',
                    time,
                    value: cancelledTurn.value
                });
            }
        } else {
            // זמן פנוי (לא תור)
            setType({
                theType: 'free',
                time,
                value: ''
            });
        }
        
        setFlagDatiels(true);
    };

    const findOriginalTurn = (currentHour, currentMinut) => {
        // המרת השעה והדקות הנוכחיים למספר דקות מתחילת היום
        const currentTimeInMinutes = (parseInt(currentHour) * 60) + parseInt(currentMinut);
        
        // חיפוש תור שהזמן הנוכחי נמצא בטווח שלו
        for (const item of newArray) {
            if (item.flag && item.value.employeeId !== -1) {
                // פירוק זמן התחלת התור
                const [turnHour, turnMinut] = item.value.time.split(':');
                const turnStartInMinutes = (parseInt(turnHour) * 60) + parseInt(turnMinut);
                
                // חישוב זמן סיום התור
                const turnEndInMinutes = turnStartInMinutes + item.value.length;
                
                // בדיקה אם הזמן הנוכחי נמצא בטווח של התור
                if (currentTimeInMinutes >= turnStartInMinutes && 
                    currentTimeInMinutes < turnEndInMinutes) {
                    return item.value;
                }
            }
        }
        
        return null;
    };

    let newIndex = 0;
    let a = 0;

    return (
        <StyledDialog
            open={open}
            onClose={handleClose}
            aria-labelledby="day-schedule-dialog-title"
            fullWidth
        >
            <DialogTitle id="day-schedule-dialog-title" sx={{
                backgroundColor: '#4a7c59',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 24px'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventIcon sx={{ mr: 1 }} />
                    <Typography variant="h6">
                        {nameOfDay} - {dateOfDay.toLocaleDateString()}
                    </Typography>
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ color: 'white' }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>


            <DialogContent dividers style={{ 
                direction: "rtl",
                display: "flex",
                flexDirection: "column",
                height: "60vh",
                overflow: "auto"
            }}>
                {loading ? (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '300px'
                    }}>
                        <CircularProgress color="success" />
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={flagDatiels ? 7 : 12}>
                            <Box sx={{
                                maxHeight: '500px',
                                overflowY: 'auto',
                                pr: 1,
                                '&::-webkit-scrollbar': {
                                    width: '6px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#f1f1f1',
                                    borderRadius: '10px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#d8c3a5',
                                    borderRadius: '10px',
                                }
                            }}>
                                {hoursInDay.map((hour, hourIndex) => {
                                    return (
                                        <Box key={hourIndex} sx={{ mb: 2 }}>
                                            <Typography variant="subtitle1" sx={{
                                                fontWeight: 'bold',
                                                color: '#4a7c59',
                                                mb: 1
                                            }}>
                                                {hour}:00
                                            </Typography>

                                            <Box sx={{ pl: 2 }}>
                                            {minutsInHour.map((minut, minutIndex) => {
    a--;

    if (newArray[newIndex] && newArray[newIndex].value.time === `${hour}:${minut}:00`) {
        a = newArray[newIndex].value.length / 15;
    }

    if (newArray[newIndex] && newArray[newIndex].value.time === `${hour}:${minut}:00`) {
        newIndex++;
    }

    const status = getTimeSlotStatus(`${hour}:${minut}:00`, newArray, newIndex);
    const isSelected = type.time === `${hour}:${minut}:00` && flagDatiels;

    // קביעת הצבע המתאים
    let customColor = null;
    
    // צבע לתור תפוס - ירוק כהה יותר
      
    // צבע לתור תפוס - ירוק עדין
    if ((newArray[newIndex - 1] && newArray[newIndex - 1].flag && 
        newArray[newIndex - 1].value.time === `${hour}:${minut}:00` && 
        newArray[newIndex - 1].value.employeeId !== -1) || a > 0) {
       customColor = 'rgba(74, 124, 89, 0.08)'; // ירוק עדין (#4a7c59 עם שקיפות)
   }
   
   // צבע לתור פנוי - חום כהה יותר עדין
   if (newArray[newIndex - 1] && !newArray[newIndex - 1].flag && 
       newArray[newIndex - 1].value.time === `${hour}:${minut}:00`) {
       customColor = 'rgba(196, 167, 125, 0.08)'; // חום כהה יותר עדין (#c4a77d עם שקיפות)
   }
   
   // צבע לתור מבוטל - אדום עדין
   if (newArray[newIndex - 1] && newArray[newIndex - 1].flag && 
       newArray[newIndex - 1].value.employeeId === -1 && 
       newArray[newIndex - 1].value.time === `${hour}:${minut}:00`) {
       customColor = 'rgba(244, 67, 54, 0.08)'; // אדום עדין (#f44336 עם שקיפות)
   }

    return (
        <TimeSlot
            key={minutIndex}
            status={status}
            isselected={isSelected ? 1 : 0}
            customcolor={customColor}
            onClick={(e) => handleTimeSlotClick(e, hour, minut, newIndex)}
        >
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                                    {hour}:{minut}
                                                                </Typography>

                                                                {status === 'booked' && (
                                                                    <Chip
                                                                        size="small"
                                                                        label="תור מאושר"
                                                                        sx={{
                                                                            ml: 1,
                                                                            backgroundColor: alpha('#4a7c59', 0.1),
                                                                            color: '#4a7c59',
                                                                            height: '20px',
                                                                            fontSize: '0.7rem'
                                                                        }}
                                                                    />
                                                                )}

                                                                {status === 'available' && (
                                                                    <Chip
                                                                        size="small"
                                                                        label="זמן פנוי"
                                                                        sx={{
                                                                            ml: 1,
                                                                            backgroundColor: alpha('#8fb996', 0.1),
                                                                            color: '#8fb996',
                                                                            height: '20px',
                                                                            fontSize: '0.7rem'
                                                                        }}
                                                                    />
                                                                )}

                                                                {status === 'cancelled' && (
                                                                    <Chip
                                                                        size="small"
                                                                        label="תור מבוטל"
                                                                        sx={{
                                                                            ml: 1,
                                                                            backgroundColor: alpha('#f44336', 0.1),
                                                                            color: '#f44336',
                                                                            height: '20px',
                                                                            fontSize: '0.7rem'
                                                                        }}
                                                                    />
                                                                )}
                                                            </Box>

                                                            {newArray[newIndex - 1] && newArray[newIndex - 1].flag &&
                                                                newArray[newIndex - 1].value.time === `${hour}:${minut}:00` && (
                                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                        <Typography variant="body2" sx={{ color: '#555' }}>
                                                                            {newArray[newIndex - 1].value.patientName}
                                                                        </Typography>
                                                                        <Tooltip title={`${newArray[newIndex - 1].value.length} דקות`}>
                                                                            <AccessTimeIcon sx={{
                                                                                ml: 1,
                                                                                fontSize: '1rem',
                                                                                color: '#4a7c59'
                                                                            }} />
                                                                        </Tooltip>
                                                                    </Box>
                                                                )}
                                                        </TimeSlot>
                                                    );
                                                })}
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Grid>

                        {flagDatiels && (
                            <Grid item xs={12} md={5}>
                                <Paper elevation={0} sx={{
                                    p: 3,
                                    borderRadius: '12px',
                                    border: '1px solid #e0e0e0',
                                    height: '100%'
                                }}>
                                    <Typography variant="h5" sx={{
                                        color: '#4a7c59',
                                        fontWeight: 'bold',
                                        mb: 2,
                                        textAlign: 'center'
                                    }}>
                                        {type.time}
                                    </Typography>

                                    <Divider sx={{ mb: 3 }} />

                                    {type.theType === 'turn' ? (
                                        <>
                                            <Box sx={{ mb: 3 }}>
                                                <Typography variant="subtitle1" sx={{
                                                    color: '#4a7c59',
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                }}>
                                                    פרטי הטיפול
                                                </Typography>

                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mb: 2
                                                }}>
                                                    <Avatar sx={{
                                                        bgcolor: alpha('#4a7c59', 0.1),
                                                        color: '#4a7c59',
                                                        width: 32,
                                                        height: 32,
                                                        mr: 1
                                                    }}>
                                                        <EventIcon fontSize="small" />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#757575' }}>
                                                            סוג טיפול
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                            {typeOfTreats && typeOfTreats.find(t => t.typeOfTreatId === type.value.typeOfTreatId)?.name || 'לא ידוע'}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mb: 2
                                                }}>
                                                    <Avatar sx={{
                                                        bgcolor: alpha('#4a7c59', 0.1),
                                                        color: '#4a7c59',
                                                        width: 32,
                                                        height: 32,
                                                        mr: 1
                                                    }}>
                                                        <AccessTimeIcon fontSize="small" />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#757575' }}>
                                                            משך הטיפול
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                            {type.value.length} דקות
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Box sx={{ mb: 3 }}>
                                                <Typography variant="subtitle1" sx={{
                                                    color: '#4a7c59',
                                                    fontWeight: 'bold',
                                                    mb: 1
                                                }}>
                                                    פרטי המטופל
                                                </Typography>

                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mb: 2
                                                }}>
                                                    <Avatar sx={{
                                                        bgcolor: alpha('#4a7c59', 0.1),
                                                        color: '#4a7c59',
                                                        width: 32,
                                                        height: 32,
                                                        mr: 1
                                                    }}>
                                                        <PersonIcon fontSize="small" />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#757575' }}>
                                                            שם המטופל
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                            {type.value.patientName}
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <Avatar sx={{
                                                        bgcolor: alpha('#4a7c59', 0.1),
                                                        color: '#4a7c59',
                                                        width: 32,
                                                        height: 32,
                                                        mr: 1
                                                    }}>
                                                        <PhoneIcon fontSize="small" />
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#757575' }}>
                                                            טלפון
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                            {patients.find(p => p.id === type.value.patientId)?.phone || 'לא זמין'}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            <Divider sx={{ mb: 3 }} />

                                            <Box sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1
                                            }}>
                                                <ActionButton
                                                    color="primary"
                                                    startIcon={<HistoryIcon />}
                                                    fullWidth
                                                >
                                                    היסטורית טיפולים
                                                </ActionButton>
                                                <ActionButton
                                                    color="secondary"
                                                    startIcon={<EventIcon />}
                                                    fullWidth
                                                >
                                                    טיפולים עתידיים
                                                </ActionButton>
                                                <ActionButton
                                                    color="error"
                                                    startIcon={<CancelIcon />}
                                                    fullWidth
                                                    onClick={() => cancelTurn(type.value.turnCode)}
                                                >
                                                    ביטול טיפול
                                                </ActionButton>
                                                <ActionButton
                                                    color="primary"
                                                    startIcon={<AssignmentIcon />}
                                                    fullWidth
                                                    sx={{ mt: 2 }}
                                                >
                                                    סיכום טיפול
                                                </ActionButton>
                                            </Box>
                                        </>
                                    ) : type.theType === 'availableTurn' ? (
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2
                                        }}>
                                            <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
                                                זמן פנוי לקביעת תור
                                            </Typography>

                                            <ActionButton
                                                color="error"
                                                startIcon={<EventBusyIcon />}
                                                fullWidth
                                            >
                                                ביטול שעת עבודה
                                            </ActionButton>
                                            <ActionButton
                                                color="primary"
                                                startIcon={<EventAvailableIcon />}
                                                fullWidth
                                            >
                                                קביעת תור
                                            </ActionButton>
                                            <ActionButton
                                                color="secondary"
                                                startIcon={<AssignmentIcon />}
                                                fullWidth
                                            >
                                                קביעת משימה
                                            </ActionButton>
                                        </Box>
                                    ) : (
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2
                                        }}>
                                            <Typography variant="body1" sx={{ textAlign: 'center', mb: 2 }}>
                                                זמן פנוי
                                            </Typography>

                                            <ActionButton
                                                color="primary"
                                                startIcon={<EventAvailableIcon />}
                                                fullWidth
                                            >
                                                קביעת תור
                                            </ActionButton>
                                            <ActionButton
                                                color="secondary"
                                                startIcon={<AssignmentIcon />}
                                                fullWidth
                                            >
                                                קביעת משימה
                                            </ActionButton>
                                        </Box>
                                    )}
                                </Paper>
                            </Grid>
                        )}
                    </Grid>
                )}
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleClose}
                    sx={{
                        color: '#4a7c59',
                        borderRadius: '20px',
                        fontWeight: 'bold'
                    }}
                >
                    סגירה
                </Button>
            </DialogActions>
        </StyledDialog>
    );
};
