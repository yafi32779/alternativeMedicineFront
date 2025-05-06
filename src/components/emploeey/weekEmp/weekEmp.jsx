import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './weekEmp.css';
import { EmpDay } from '../empDay/empDay';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Chip,
    Badge,
    Tooltip,
    Zoom,
    Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EventIcon from '@mui/icons-material/Event';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { alpha } from '@mui/material/styles';

const WeekDayHeader = styled(Box)(({ theme }) => ({
    backgroundColor: '#4a7c59',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: '5px 5px 0 0'
}));

const WeekDayCell = styled(Paper)(({ theme, istoday }) => ({
    height: '300px',
    border: istoday ? '2px solid #4a7c59' : '1px solid #e0e0e0',
    borderRadius: '0 0 5px 5px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    '&:hover': {
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
        transform: 'translateY(-3px)'
    }
}));

const DayNumber = styled(Box)(({ theme, istoday }) => ({
    fontSize: 'x-large',
    backgroundColor: istoday ? '#4a7c59' : 'rgba(130, 130, 130, 0.1)',
    color: istoday ? 'white' : 'inherit',
    padding: '5px 10px',
    fontWeight: istoday ? 'bold' : 'normal'
}));

const AppointmentList = styled(Box)(({ theme }) => ({
    overflowY: 'auto',
    maxHeight: '250px',
    padding: '10px',
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
}));

const AppointmentItem = styled(Box)(({ theme, iscancelled }) => ({
    padding: '8px 12px',
    marginBottom: '8px',
    borderRadius: '5px',
    backgroundColor: iscancelled ? alpha('#f44336', 0.1) : alpha('#4a7c59', 0.1),
    border: `1px solid ${iscancelled ? alpha('#f44336', 0.3) : alpha('#4a7c59', 0.3)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: iscancelled ? alpha('#f44336', 0.2) : alpha('#4a7c59', 0.2),
    }
}));

const WeekEmp = ({ currentDate, turns, treat }) => {
    const dispatch = useDispatch();
    const weekDayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

    const [open, setOpen] = useState(false);
    const [dateOfDay, setDateOfDay] = useState(new Date);
    const [nameOfDay, setNameOfDay] = useState("");
    let arrToOpen = [false, false, false, false, false, false, false];

    const today = new Date();
////////////////////
    const handleClickOpen = (date, i) => {
        setDateOfDay(date);
        setNameOfDay(weekDayNames[i]);
        console.log("Opening dialog for date:", date, "Day name:", weekDayNames[i]);
        setOpen(true);
    };

    const getStartOfWeek = (date) => {
        const start = new Date(date);
        const day = start.getDay();
        const diff = start.getDate() - day;
        start.setDate(diff);
        return start;
    };

    const renderWeekDays = () => {
        const startOfWeek = getStartOfWeek(currentDate);

        // Generate the dates for the week
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(
                startOfWeek.getFullYear(),
                startOfWeek.getMonth(),
                startOfWeek.getDate() + i
            );

            const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

            // Filter appointments for this day
            const dayAppointments = turns.filter(av =>
                date.toLocaleDateString() === new Date(av.date).toLocaleDateString()
            );

            if (dayAppointments.length > 0) {
                arrToOpen[i] = true;
            }

            // Count cancelled appointments
            const cancelledAppointments = dayAppointments.filter(av => av.employeeId === -1);

            dates.push(
                <Grid item xs={12} sm={6} md key={i}>
                    <Box sx={{ height: '100%' }}>
                        <WeekDayHeader>
                            <Typography variant="subtitle1">
                                {weekDayNames[i]}
                            </Typography>
                        </WeekDayHeader>
                        <WeekDayCell
                            elevation={0}
                            istoday={isToday ? 1 : 0}
                            onClick={() => handleClickOpen(date, i)}
                        >
                            <DayNumber istoday={isToday ? 1 : 0}>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <Typography>{date.getDate()}</Typography>
                                    {dayAppointments.length > 0 && (
                                        <Tooltip title={`${dayAppointments.length} תורים`}>
                                            <Badge
                                                badgeContent={dayAppointments.length}
                                                color="primary"
                                                sx={{
                                                    '& .MuiBadge-badge': {
                                                        backgroundColor: isToday ? 'white' : '#4a7c59',
                                                        color: isToday ? '#4a7c59' : 'white'
                                                    }
                                                }}
                                            >
                                                <EventIcon sx={{
                                                    color: isToday ? 'white' : '#4a7c59',
                                                    fontSize: '1.2rem'
                                                }} />
                                            </Badge>
                                        </Tooltip>
                                    )}
                                </Box>
                            </DayNumber>

                            <AppointmentList>
                                {dayAppointments.length === 0 ? (
                                    <Box sx={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#aaa',
                                        flexDirection: 'column',
                                        p: 2
                                    }}>
                                        <EventAvailableIcon sx={{ fontSize: '2rem', mb: 1 }} />
                                        <Typography variant="body2">אין תורים</Typography>
                                    </Box>
                                ) : (
                                    dayAppointments.map((av, index) => {
                                        const isCancelled = av.employeeId === -1;

                                        return (
                                            <Zoom in={true} key={index} style={{ transitionDelay: `${index * 50}ms` }}>
                                                <AppointmentItem iscancelled={isCancelled ? 1 : 0}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        {isCancelled ? (
                                                            <EventBusyIcon sx={{
                                                                mr: 1,
                                                                color: '#f44336',
                                                                fontSize: '1.2rem'
                                                            }} />
                                                        ) : (
                                                            <EventIcon sx={{
                                                                mr: 1,
                                                                color: '#4a7c59',
                                                                fontSize: '1.2rem'
                                                            }} />
                                                        )}
                                                        <Typography variant="body2" sx={{
                                                            fontWeight: 'bold',
                                                            color: isCancelled ? '#f44336' : 'inherit'
                                                        }}>
                                                            {av.time}
                                                        </Typography>
                                                    </Box>

                                                    <Box sx={{ textAlign: 'right' }}>
                                                        <Typography variant="body2" noWrap sx={{
                                                            maxWidth: '120px',
                                                            fontWeight: 'medium',
                                                            color: isCancelled ? '#f44336' : 'inherit'
                                                        }}>
                                                            {isCancelled ? 'תור מבוטל' : av.patientName}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: '#757575' }}>
                                                            {av.length} דקות
                                                        </Typography>
                                                    </Box>
                                                </AppointmentItem>
                                            </Zoom>
                                        );
                                    })
                                )}
                            </AppointmentList>
                        </WeekDayCell>
                    </Box>
                </Grid>
            );
        }

        return (
            <Grid container spacing={2}>
                {dates}
            </Grid>
        );
    };

    const startOfWeek = getStartOfWeek(currentDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
                <Chip
                    label={`${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`}
                    color="primary"
                    sx={{
                        backgroundColor: '#4a7c59',
                        '& .MuiChip-label': {
                            fontWeight: 'bold'
                        }
                    }}
                    icon={<EventIcon sx={{ color: 'white !important' }} />}
                />
            </Box>

            {renderWeekDays()}

            <EmpDay
                dateOfDay={dateOfDay}
                turns={turns}
                treat={treat}
                open={open}
                setOpen={setOpen}
                nameOfDay={nameOfDay}
            />
        </Box>
    );
};

export default WeekEmp;

