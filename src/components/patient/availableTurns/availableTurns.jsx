import { useDispatch, useSelector } from "react-redux"
import { GetAvailableTurnsById } from "../../../redux/AvailebleTurnsSlice/GetAvailableTurnsByIdThunk"
import { useEffect, useRef, useState } from "react"
import { getAllEmployeesThunk } from "../../../redux/employeeSlice/getAllEmployeesThunk"
import { GetAvailableTurnsByIdAndDate } from "../../../redux/AvailebleTurnsSlice/GetAvailableTurnsByIdAndDate"
import { GetAvailableTurnsByIdAndTime } from "../../../redux/AvailebleTurnsSlice/GetAvailableTurnsByIdAndTime"
import { GetAvailableTurnsByAllParams } from "../../../redux/AvailebleTurnsSlice/GetAvailableTurnsByAllParamsThunk"
import { getAllTypes } from "../../../redux/TypeOfTreatsSlice/GetAllTypesThunk"
import "./available.css"

// Material UI imports
import { 
    Box, 
    Typography, 
    Button, 
    TextField,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Paper,
    Tabs,
    Tab,
    Grid,
    Divider,
    CircularProgress,
    Alert,
    Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Components
import WeekView from "../week/week"
import MonthView from "../month/month"
import Calendar from "../calander/calander"

// Styled components
const StyledFormControl = styled(FormControl)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#8fb996',
        },
        '&:hover fieldset': {
            borderColor: '#4a7c59',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#2c5530',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#4a7c59',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#2c5530',
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#8fb996',
        },
        '&:hover fieldset': {
            borderColor: '#4a7c59',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#2c5530',
        },
    },
    '& .MuiInputLabel-root': {
        color: '#4a7c59',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#2c5530',
    },
}));

export const AvailableTurns = () => {
    const [value, setValue] = useState(0);
    const [flags, setFlags] = useState([false, false, false]);
    const [showWeek, setShowWeek] = useState(false);
    const [showMonth, setShowMonth] = useState(false);
    const [showCalender, setShowCalender] = useState(false);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [length, setLength] = useState(0);
    const [empId, setEmpId] = useState(-2);
    const [empName, setEmpName] = useState(null);
    const [nameOfType, setNameOfType] = useState(null);
    const [typeOfSearch, setTypeOfSearch] = useState(-1);
    const [dateOfCalander, setDateOfCalander] = useState(new Date);
    const [flagToDisable, setFlagToDisable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const refEmp = useRef();
    const refType = useRef();
    const dispatch = useDispatch();

    const availableTurns = useSelector(state => state.AvailebleTurnsSlice.availebleTurns);
    const Employees = useSelector(state => state.employeeSlice.listEmployees);
    const typeOfTreats = useSelector(state => state.TypeOfTreatsSlice.typeOfTreats);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const restart = () => {
        setEmpId(0);
        setDate(null);
        setTime(null);
        setEmpName('');
    }

    const updateLength = (event) => {
        setNameOfType(event.target.value);
        setLength(typeOfTreats.find(t => t.name == event.target.value).length);
    };

    const searchAvailableTurns = async () => {
        if (!(empId != -2 && nameOfType != null)) {
            setError("יש למלא את כל השדות הנדרשים");
            return;
        }

        setLoading(true);
        setError("");
        
        try {
            let theEmpId = empId;
            if (nameOfType == 'אוזון') {
                theEmpId = 0;
            }
            
            if (date == "") {
                if (time == "") {
                    await dispatch(GetAvailableTurnsById({ theEmpId, length }));
                } else {
                    await dispatch(GetAvailableTurnsByIdAndTime({ theEmpId, length, time }));
                }
            } else if (time == "") {
                await dispatch(GetAvailableTurnsByIdAndDate({ theEmpId, length, date }));
            } else {
                await dispatch(GetAvailableTurnsByAllParams({ theEmpId, length, date, time }));
            }
            
            setShowCalender(true);
        } catch (err) {
            setError("אירעה שגיאה בחיפוש התורים");
        } finally {
            setLoading(false);
        }
    }

    const updateEmp = (event) => {
        setEmpName(event.target.value);
        setEmpId(Employees.find(emp => emp.name == event.target.value).id);
    }

    return (
        <Box sx={{ 
            backgroundColor: '#f9f3e6', 
            borderRadius: '12px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            p: { xs: 2, md: 4 },
            mb: 4
        }}>
            <Typography variant="h4" sx={{ 
                color: '#2c5530', 
                fontWeight: 'bold',
                mb: 3,
                textAlign: 'center'
            }}>
                קביעת תור חדש
            </Typography>
            
            <Grid container spacing={4}>
                {/* Search Form */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={0} sx={{ 
                        p: 3, 
                        backgroundColor: '#f5efe0',
                        borderRadius: '12px',
                        height: '100%'
                    }}>
                        <Typography variant="h6" sx={{ 
                            color: '#4a7c59', 
                            fontWeight: 'bold',
                            mb: 3,
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <SearchIcon sx={{ mr: 1 }} />
                            חיפוש תורים פנויים
                        </Typography>
                        
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                            <StyledFormControl fullWidth>
                                <InputLabel id="treatment-select-label">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <MedicalServicesIcon sx={{ mr: 1, fontSize: '0.9rem' }} />
                                        בחירת טיפול
                                    </Box>
                                </InputLabel>
                                <Select
                                    labelId="treatment-select-label"
                                    value={nameOfType || ''}
                                    label="בחירת טיפול"
                                    onChange={updateLength}
                                >
                                    {typeOfTreats.map((type) => (
                                        <MenuItem key={type.name} value={type.name}>
                                            {type.name} ({type.length} דקות)
                                        </MenuItem>
                                    ))}
                                </Select>
                                {nameOfType === null && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                        חובה לבחור טיפול
                                    </Typography>
                                )}
                            </StyledFormControl>
                            
                            <StyledTextField
                                fullWidth
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AccessTimeIcon sx={{ mr: 1, fontSize: '0.9rem' }} />
                                        בחירת שעה (אופציונלי)
                                    </Box>
                                }
                                type="time"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setTime(e.target.value)}
                            />
                            
                            <StyledTextField
                                fullWidth
                                label={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CalendarMonthIcon sx={{ mr: 1, fontSize: '0.9rem' }} />
                                        בחירת תאריך (אופציונלי)
                                    </Box>
                                }
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            
                            <StyledFormControl fullWidth>
                                <InputLabel id="employee-select-label">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <PersonIcon sx={{ mr: 1, fontSize: '0.9rem' }} />
                                        בחירת מטפל
                                    </Box>
                                </InputLabel>
                                <Select
                                    labelId="employee-select-label"
                                    value={empName || ''}
                                    label="בחירת מטפל"
                                    onChange={updateEmp}
                                >
                                    {Employees.map((e) => {
                                        if (e.id > -1) {
                                            return (
                                                <MenuItem key={e.id} value={e.name}>
                                                    {e.name}
                                                </MenuItem>
                                            );
                                        }
                                    })}
                                </Select>
                                {empId === -2 && (
                                    <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                                        חובה לבחור מטפל
                                    </Typography>
                                )}
                            </StyledFormControl>
                            
                            {error && (
                                <Alert severity="error" sx={{ mt: 1 }}>
                                    {error}
                                </Alert>
                            )}
                            
                            <Button
                                variant="contained"
                                onClick={searchAvailableTurns}
                                disabled={!(empId != -2 && nameOfType != null) || loading}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <EventAvailableIcon />}
                                sx={{
                                    backgroundColor: '#4a7c59',
                                    color: 'white',
                                    borderRadius: '30px',
                                    padding: '12px',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                    mt: 2,
                                    '&:hover': {
                                        backgroundColor: '#2c5530'
                                    },
                                    '&.Mui-disabled': {
                                        backgroundColor: '#cccccc',
                                        color: '#666666'
                                    }
                                }}
                            >
                                {loading ? 'מחפש תורים...' : 'חיפוש תורים פנויים'}
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
                
                {/* Calendar View */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={0} sx={{ 
                        p: { xs: 2, md: 3 }, 
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        minHeight: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: showCalender ? 'flex-start' : 'center',
                        alignItems: showCalender ? 'stretch' : 'center'
                    }}>
                        {!showCalender && (
                            <Box sx={{ textAlign: 'center', p: 4 }}>
                                <CalendarMonthIcon sx={{ fontSize: 80, color: '#d8c3a5', mb: 2 }} />
                                <Typography variant="h5" sx={{ color: '#4a7c59', mb: 2 }}>
                                    בחרו טיפול ומטפל כדי לראות תורים פנויים
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#666' }}>
                                    לאחר החיפוש, יוצגו כאן כל התורים הפנויים המתאימים לבחירתכם
                                </Typography>
                            </Box>
                        )}
                        
                        {showCalender && availableTurns[0] == undefined && (
                            <Box sx={{ textAlign: 'center', p: 4 }}>
                                <Typography variant="h5" sx={{ color: '#4a7c59', mb: 2 }}>
                                    אין תורים שעונים לתנאים המבוקשים
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#666', mb: 3 }}>
                                    נסו לשנות את הפרמטרים בחיפוש
                                    </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => setShowCalender(false)}
                                    sx={{
                                        color: '#4a7c59',
                                        borderColor: '#4a7c59',
                                        borderRadius: '30px',
                                        '&:hover': {
                                            borderColor: '#2c5530',
                                            backgroundColor: 'rgba(74, 124, 89, 0.1)'
                                        }
                                    }}
                                >
                                    חזרה לחיפוש
                                </Button>
                            </Box>
                        )}
                        
                        {showCalender && availableTurns[0] != undefined && (
                            <Box sx={{ width: '100%' }}>
                                <Typography variant="h6" sx={{ 
                                    color: '#4a7c59', 
                                    fontWeight: 'bold',
                                    mb: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <span>תורים פנויים ל{nameOfType}</span>
                                    <Chip 
                                        label={`${availableTurns.length} תורים נמצאו`} 
                                        color="success" 
                                        size="small"
                                        sx={{ backgroundColor: '#8fb996' }}
                                    />
                                </Typography>
                                <Calendar 
                                    availableTurns={availableTurns} 
                                    treat={typeOfTreats.find(t => t.name == nameOfType)}
                                />
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}
