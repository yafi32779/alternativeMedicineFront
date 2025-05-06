import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MonthEmp from '../monthEmp/monthEmp';
import WeekEmp from '../weekEmp/weekEmp';
import '../calanderEmp/calenderEmp.css';
import { getAllTurnsThunk } from '../../../redux/turnsSlice/getAllTturnsthunk';
import { GetAvailableTurnsById } from '../../../redux/AvailebleTurnsSlice/GetAvailableTurnsByIdThunk';
import { 
    Box, 
    Typography, 
    Button, 
    Paper, 
    ToggleButtonGroup, 
    ToggleButton, 
    CircularProgress,
    Fade,
    Zoom
} from '@mui/material';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import TodayIcon from '@mui/icons-material/Today';
import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    backgroundColor: '#f5efe0',
    borderRadius: '30px',
    '& .MuiToggleButtonGroup-grouped': {
        margin: 5,
        border: 0,
        borderRadius: '20px !important',
        '&.Mui-selected': {
            backgroundColor: '#4a7c59',
            color: 'white'
        }
    }
}));

const StyledNavButton = styled(Button)(({ theme }) => ({
    margin: '0 5px',
    borderRadius: '20px',
    backgroundColor: '#f5efe0',
    color: '#2c5530',
    '&:hover': {
        backgroundColor: '#d8c3a5',
    }
}));

const CalendarEmp = (props) => {
    const { treat } = props;
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState('month'); // 'month' or 'week'
    const [dayDate, setDayDate] = useState(new Date(2025, 2, 24));
    const [monthName, setMonthName] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const turns = useSelector(state => state.turnsSlice.turns);
    const user = useSelector(state => state.employeeSlice.currentEmployee);

    // useEffect(() => {
    //     getAvailableTurns();
    // }, []);

    const today = new Date();

    // const getAvailableTurns = async () => {
    //     setLoading(true);
    //     await dispatch(getAllTurnsThunk());
    //     setLoading(false);
    // };

    const toggleView = (event, newView) => {
        if (newView !== null) {
            setView(newView);
        }
    };

    const goToToday = () => {
        setCurrentDate(new Date());
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

    return (
        <Box sx={{ 
            p: 3,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
            }}>
                <Typography variant="h5" sx={{ 
                    color: '#2c5530',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <TodayIcon sx={{ mr: 1 }} />
                    יומן עבודה
                    {user?.name && (
                        <Typography variant="subtitle1" sx={{ ml: 1, color: '#666' }}>
                            - {user.name}
                        </Typography>
                    )}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <StyledToggleButtonGroup
                        value={view}
                        exclusive
                        onChange={toggleView}
                        aria-label="calendar view"
                        size="small"
                    >
                                                <ToggleButton value="month" aria-label="month view">
                            <CalendarViewMonthIcon sx={{ mr: 0.5 }} />
                            חודשי
                        </ToggleButton>
                        <ToggleButton value="week" aria-label="week view">
                            <CalendarViewWeekIcon sx={{ mr: 0.5 }} />
                            שבועי
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                </Box>
            </Box>

            <Box sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
            }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {view === 'month' ? 
                        `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}` : 
                        `שבוע ${Math.ceil(currentDate.getDate() / 7)} - ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                    }
                </Typography>

                <Box sx={{ display: 'flex' }}>
                    {view === 'month' ? (
                        <>
                            {currentDate.getMonth() > today.getMonth() && (
                                <StyledNavButton 
                                    onClick={goToPrevMonth}
                                    startIcon={<NavigateBeforeIcon />}
                                >
                                    חודש קודם
                                </StyledNavButton>
                            )}
                            <StyledNavButton 
                                onClick={goToToday}
                                sx={{ mx: 1 }}
                            >
                                היום
                            </StyledNavButton>
                            <StyledNavButton 
                                onClick={goToNextMonth}
                                endIcon={<NavigateNextIcon />}
                            >
                                חודש הבא
                            </StyledNavButton>
                        </>
                    ) : (
                        <>
                            {(currentDate.getMonth() > today.getMonth() || (currentDate.getMonth() == today.getMonth() && currentDate.getDate() > today.getDate())) && (
                                <StyledNavButton 
                                    onClick={goToPrevWeek}
                                    startIcon={<NavigateBeforeIcon />}
                                >
                                    שבוע קודם
                                </StyledNavButton>
                            )}
                            <StyledNavButton 
                                onClick={goToToday}
                                sx={{ mx: 1 }}
                            >
                                היום
                            </StyledNavButton>
                            <StyledNavButton 
                                onClick={goToNextWeek}
                                endIcon={<NavigateNextIcon />}
                            >
                                שבוע הבא
                            </StyledNavButton>
                        </>
                    )}
                </Box>
            </Box>

            <Paper elevation={0} sx={{ 
                flexGrow: 1,
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
                {loading ? (
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        height: '100%',
                        p: 5
                    }}>
                        <CircularProgress color="success" />
                    </Box>
                ) : (
                    <Fade in={true}>
                        <Box>
                            {view === 'month' ? (
                                <Zoom in={view === 'month'}>
                                    <Box>
                                        <MonthEmp 
                                            currentDate={currentDate} 
                                            turns={turns} 
                                            treat={treat} 
                                            setDayDate={setDayDate} 
                                        />
                                    </Box>
                                </Zoom>
                            ) : (
                                <Zoom in={view === 'week'}>
                                    <Box>
                                        <WeekEmp 
                                            currentDate={currentDate} 
                                            turns={turns} 
                                            treat={treat} 
                                        />
                                    </Box>
                                </Zoom>
                            )}
                        </Box>
                    </Fade>
                )}
            </Paper>
        </Box>
    );
};

export default CalendarEmp;

