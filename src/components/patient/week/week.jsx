import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import './week.css';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentDay } from '../day/day';
import { 
    Box, 
    Typography, 
    Paper,
    Chip,
    Divider,
    Tooltip,
    Grid
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StyledDayHeader = styled(Box)(({ theme }) => ({
    backgroundColor: '#4a7c59',
    color: 'white',
    padding: "10px",
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: '8px 8px 0 0',
}));

const StyledDayCell = styled(Paper)(({ theme, isToday }) => ({
    border: isToday ? '2px solid #8fb996' : '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: isToday ? '#f5efe0' : 'white',
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.2s ease',
    '&:hover': {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }
}));

const StyledTimeSlot = styled(Box)(({ theme }) => ({
    padding: '8px 12px',
    margin: '4px',
    borderRadius: '4px',
    backgroundColor: '#f9f3e6',
    color: '#2c5530',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
        backgroundColor: '#8fb996',
        color: 'white',
        transform: 'translateY(-2px)'
    }
}));

const WeekView = ({ currentDate, availableTurns, treat }) => {
    const dispatch = useDispatch();
    const weekDayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

    const [open, setOpen] = React.useState(false);
    const [dateOfDay, setDateOfDay] = useState(new Date);
    const [nameOfDay, setNameOfDay] = useState("");
    let arrToOpen = [false, false, false, false, false, false, false];

    const today = new Date();

    const handleClickOpen = (date, i) => {
        setDateOfDay(date);
        setNameOfDay(weekDayNames[i]);
        if(arrToOpen[i])
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
        const weekDays = [];
        
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
                
            const appointmentsForDay = availableTurns.filter(av => 
                date.toLocaleDateString() == new Date(av.date).toLocaleDateString()
            );
            
            if (appointmentsForDay.length > 0) {
                arrToOpen[i] = true;
            }

            weekDays.push(
                <Grid item xs={12} sm={6} md key={i}>
                    <StyledDayCell 
                        isToday={isToday}
                        onClick={() => handleClickOpen(date, i)}
                        elevation={appointmentsForDay.length > 0 ? 1 : 0}
                    >
                        <StyledDayHeader>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {weekDayNames[i]}
                            </Typography>
                            <Typography variant="body2">
                                {date.getDate()}/{date.getMonth() + 1}
                            </Typography>
                        </StyledDayHeader>
                        
                        <Box sx={{ 
                            p: 1, 
                            overflowY: 'auto',
                            flexGrow: 1,
                            maxHeight: '250px'
                        }}>
                            {appointmentsForDay.length > 0 ? (
                                appointmentsForDay.map((av, index) => (
                                    <StyledTimeSlot key={index}>
                                        <AccessTimeIcon sx={{ fontSize: '0.9rem', mr: 1 }} />
                                        {av.time}
                                    </StyledTimeSlot>
                                ))
                            ) : (
                                <Box sx={{ 
                                    height: '100%', 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#999',
                                    fontStyle: 'italic'
                                }}>
                                    <Typography variant="body2">
                                        אין תורים פנויים
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                        
                        {appointmentsForDay.length > 0 && (
                            <Box sx={{ 
                                p: 1, 
                                borderTop: '1px solid #eee',
                                backgroundColor: '#f9f3e6',
                                textAlign: 'center'
                            }}>
                                <Chip
                                    size="small"
                                    label={`${appointmentsForDay.length} תורים פנויים`}
                                    sx={{ 
                                        backgroundColor: '#8fb996',
                                        color: 'white'
                                    }}
                                />
                            </Box>
                        )}
                    </StyledDayCell>
                </Grid>
            );
        }
        
        return (
            <Grid container spacing={2}>
                {weekDays}
            </Grid>
        );
    };

    return (
        <Box sx={{
            borderRadius: "10px",
            overflow: "hidden"
        }}>
            {renderWeekDays()}

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

export default WeekView;
