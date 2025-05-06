import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentDay } from '../day/day';
import { useEffect } from 'react';
import { 
    Box, 
    Paper, 
    Grid,
    Badge,
    Tooltip,
    Zoom,
    Chip
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const StyledDayCell = styled(Paper)(({ theme, isToday, hasAppointments }) => ({
    border: isToday ? '2px solid #8fb996' : '1px solid #e0e0e0',
    padding: '10px',
    height: '85px',
    textAlign: 'center',
    borderRadius: '8px',
    backgroundColor: isToday ? '#f5efe0' : 'white',
    position: 'relative',
    transition: 'all 0.2s ease',
    cursor: hasAppointments ? 'pointer' : 'default',
    overflow: 'hidden',
    '&:hover': {
        boxShadow: hasAppointments ? '0 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
        transform: hasAppointments ? 'translateY(-3px)' : 'none',
    }
}));

const DayNumber = styled(Typography)(({ theme, isToday }) => ({
    position: 'absolute',
    top: '5px',
    right: '8px',
    fontWeight: isToday ? 'bold' : 'normal',
    color: isToday ? '#2c5530' : '#666',
    fontSize: '1.1rem',
}));

const MonthView = ({ currentDate, availableTurns, treat, setDayDate }) => {
    const [dateOfDay, setDateOfDay] = useState(new Date);
    const [open, setOpen] = useState(false);
    const [nameOfDay, setNameOfDay] = useState("");
    const [flagDatiels, setFlagDatiels] = useState(false);
    const [turnIndex, setTurnIndex] = useState(false);
    const [flag, setFlag] = useState(false);

    const Employees = useSelector(state => state.employeeSlice.listEmployees);

    useEffect(() => {
    }, []);

    const handleClickOpen = (date, day) => {
        setDateOfDay(date);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFlagDatiels(false);
    };

    const renderMonthDays = () => {
        // Get the first day of the month
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
        const firstDayWeekday = firstDayOfMonth.getDay();

        // Calculate the number of days in the month
        const daysInMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();

        const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

        // Create calendar cells array
        const calendarCells = [];

        // Add weekday headers
        weekDays.forEach(day => {
            calendarCells.push(
                <Box key={`header-${day}`} sx={{
                    backgroundColor: '#4a7c59',
                    color: 'white',
                    padding: "10px",
                    textAlign: 'center',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    mb: 1
                }}>
                    {day}
                </Box>
            );
        });

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayWeekday; i++) {
            calendarCells.push(
                <Box key={`empty-${i}`} sx={{
                    padding: "10px",
                    textAlign: 'center',
                    borderRadius: '8px',
                    backgroundColor: 'transparent'
                }}></Box>
            );
        }

        // Add cells for each day of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const isToday =
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();

            const appointmentsForDay = availableTurns.filter(av => 
                date.toLocaleDateString() == new Date(av.date).toLocaleDateString()
            );
            
            const hasAppointments = appointmentsForDay.length > 0;

            calendarCells.push(
                <StyledDayCell 
                    key={`day-${day}`} 
                    isToday={isToday}
                    hasAppointments={hasAppointments}
                    onClick={() => hasAppointments && handleClickOpen(date, day)}
                    elevation={hasAppointments ? 1 : 0}
                >
                    <DayNumber variant="body1" isToday={isToday}>
                        {day}
                    </DayNumber>
                    
                    {hasAppointments && (
                        <Box sx={{ 
                            position: 'absolute', 
                            bottom: '8px', 
                            left: '0', 
                            right: '0',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Chip
                                icon={<EventAvailableIcon />}
                                label={`${appointmentsForDay.length} תורים`}
                                size="small"
                                sx={{ 
                                    backgroundColor: '#8fb996',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    height: '24px'
                                }}
                            />
                        </Box>
                    )}
                </StyledDayCell>
            );
        }

        return (
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "5px"
            }}>
                {calendarCells}
            </Box>
        );
    };

    const monthNames = [
        'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
        'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
    ];

    return (
        <Box sx={{
            borderRadius: "10px",
            overflow: "hidden",
            transition: "all 0.3s ease"
        }}>
            {renderMonthDays()}

            <CurrentDay 
                dateOfDay={dateOfDay} 
                availableTurns={availableTurns} 
                treat={treat} 
                open={open} 
                setOpen={setOpen}
                nameOfDay={nameOfDay}
            />
        </Box>
    );
};

export default MonthView;
