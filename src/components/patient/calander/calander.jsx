import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MonthView from '../month/month';
import WeekView from '../week/week';
import { useEffect } from 'react';
import "./calander.css";
import { getAllTurnsThunk } from '../../../redux/turnsSlice/getAllTturnsthunk';
import { 
    Box, 
    Typography, 
    Button, 
    ButtonGroup,
    Paper,
    Tabs,
    Tab,
    Divider,
    Fade
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';

const StyledTab = styled(Tab)(({ theme }) => ({
    color: '#4a7c59',
    '&.Mui-selected': {
        color: '#2c5530',
        fontWeight: 'bold',
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    color: '#4a7c59',
    borderColor: '#8fb996',
    '&:hover': {
        backgroundColor: 'rgba(74, 124, 89, 0.1)',
        borderColor: '#4a7c59',
    },
}));

const Calendar = (props) => {
    const { availableTurns, treat } = props;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'month' or 'week'
    const [dayDate, setDayDate] = useState(new Date(2025, 2, 24));
    const [monthName, setMonthName] = useState("");
    const today = new Date();

    const toggleView = () => {
        setView(view === 'month' ? 'week' : 'month');
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const goToPrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextWeek = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
    };

    const goToPrevWeek = () => {
        let today = new Date();
        if (currentDate !== new Date)
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
    };

    const monthNames = [
        'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
        'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
    ];

    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2
            }}>
                <ButtonGroup variant="outlined" aria-label="view toggle">
                    <StyledButton 
                        onClick={() => setView('month')}
                        variant={view === 'month' ? 'contained' : 'outlined'}
                        startIcon={<CalendarMonthIcon />}
                        sx={{ 
                            backgroundColor: view === 'month' ? '#8fb996' : 'transparent',
                            color: view === 'month' ? 'white' : '#4a7c59',
                            '&:hover': {
                                backgroundColor: view === 'month' ? '#8fb996' : 'rgba(74, 124, 89, 0.1)',
                            }
                        }}
                    >
                        חודשי
                    </StyledButton>
                    <StyledButton 
                        onClick={() => setView('week')}
                        variant={view === 'week' ? 'contained' : 'outlined'}
                        startIcon={<ViewWeekIcon />}
                        sx={{ 
                            backgroundColor: view === 'week' ? '#8fb996' : 'transparent',
                            color: view === 'week' ? 'white' : '#4a7c59',
                            '&:hover': {
                                backgroundColor: view === 'week' ? '#8fb996' : 'rgba(74, 124, 89, 0.1)',
                            }
                        }}
                    >
                        שבועי
                    </StyledButton>
                </ButtonGroup>

                <Typography variant="h6" sx={{ 
                    color: '#2c5530', 
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>
                    {view === 'month' 
                        ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                        : `${formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay()))} - ${formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay() + 6))}`
                    }
                </Typography>

                <ButtonGroup variant="outlined" aria-label="navigation">
                    {view === 'month' ? (
                        <>
                            <StyledButton 
                                onClick={goToNextMonth}
                                startIcon={<ChevronLeftIcon />}
                            >
                                הבא
                            </StyledButton>
                            {currentDate.getMonth() > today.getMonth() && (
                                <StyledButton 
                                    onClick={goToPrevMonth}
                                    startIcon={<ChevronRightIcon />}
                                >
                                    הקודם
                                </StyledButton>
                            )}
                        </>
                    ) : (
                        <>
                            <StyledButton 
                                onClick={goToNextWeek}
                                startIcon={<ChevronLeftIcon />}
                            >
                                הבא
                            </StyledButton>
                            {(currentDate.getMonth() > today.getMonth() || (currentDate.getMonth() == today.getMonth() && currentDate.getDate() > today.getDate())) && (
                                <StyledButton 
                                    onClick={goToPrevWeek}
                                    startIcon={<ChevronRightIcon />}
                                >
                                    הקודם
                                </StyledButton>
                            )}
                        </>
                    )}
                </ButtonGroup>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Fade in={true} timeout={500}>
                <Box>
                    {view === 'month' ? (
                        <MonthView 
                            currentDate={currentDate} 
                            availableTurns={availableTurns} 
                            treat={treat} 
                            setDayDate={setDayDate} 
                        />
                    ) : (
                        <WeekView 
                            currentDate={currentDate} 
                            availableTurns={availableTurns} 
                            treat={treat} 
                        />
                    )}
                </Box>
            </Fade>
        </Box>
    );
};

export default Calendar;
