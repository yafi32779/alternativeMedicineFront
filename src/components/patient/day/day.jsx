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
import { useDispatch, useSelector } from 'react-redux';
import { addTurnThunk } from '../../../redux/turnsSlice/addTurnThunk';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';


import { 
    Box, 
    Typography, 
    Paper,
    Divider,
    Grid,
    Chip,
    CircularProgress,
    Alert,
    Zoom,
    Fade
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PersonIcon from '@mui/icons-material/Person';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: '#4a7c59',
    color: 'white',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}));

const StyledTimeButton = styled(Button)(({ theme, selected }) => ({
    padding: '10px 16px',
    margin: '5px',
    borderRadius: '30px',
    backgroundColor: selected ? '#8fb996' : '#f5efe0',
    color: selected ? 'white' : '#2c5530',
    '&:hover': {
        backgroundColor: selected ? '#8fb996' : '#d8c3a5',
    }
}));

const StyledConfirmButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#4a7c59',
    color: 'white',
    borderRadius: '30px',
    padding: '10px 24px',
    '&:hover': {
        backgroundColor: '#2c5530',
    }
}));

export const CurrentDay = ({dateOfDay, availableTurns, treat, open, setOpen, nameOfDay}) => {
    const Employees = useSelector(state => state.employeeSlice.listEmployees);
    const userId = useSelector(state => state.patientSlice.userId);
    const patients = useSelector(state => state.patientSlice.listPatient);
    const dispatch = useDispatch();
    
    const [try1, setTry1] = useState();
    const [flagDatiels, setFlagDatiels] = useState(false);
    const [turnIndex, setTurnIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    
    const handleClose = () => {
        setOpen(false);
        setFlagDatiels(false);
        setSuccess(false);
        setError("");
    };

    const SummoningTurn = async () => {
        setLoading(true);
        setError("");
        
        try {
            let p = patients.find(p => p.id == userId);
            let patientName = p.firstName + ' ' + p.lastName;
            let employeeId = availableTurns[turnIndex].employeeId;
            let time = availableTurns[turnIndex].time;
            let length = treat.length;
            let turnCode = 0;
            let patientId = userId;
             
            dateOfDay.setDate(dateOfDay.getDate() + 1);
            let date = dateOfDay;
            let typeOfTreatId = treat.typeOfTreatId;
            
            await dispatch(addTurnThunk({
                turnCode,
                patientId,
                patientName,
                employeeId,
                length,
                date,
                time,
                typeOfTreatId
            }));
            
            setTry1(1);
            setSuccess(true);
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (err) {
            setError("אירעה שגיאה בקביעת התור. אנא נסו שנית.");
        } finally {
            setLoading(false);
        }
    };

    const filteredAppointments = availableTurns.filter(av => 
        dateOfDay && new Date(av.date).toLocaleDateString() === dateOfDay.toLocaleDateString()
    );

    return (
        <StyledDialog
            onClose={handleClose}
            open={open}
            fullWidth
            maxWidth="sm"
        >
            <StyledDialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon sx={{ mr: 1 }} />
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {nameOfDay ? `יום ${nameOfDay}` : 'בחירת תור'}
                        </Typography>
                        <Typography variant="body2">
                            {dateOfDay ? dateOfDay.toLocaleDateString() : ''}
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ color: 'white' }}
                >
                    <CloseIcon />
                </IconButton>
            </StyledDialogTitle>

            {success ? (
                <DialogContent>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 4
                    }}>
                        <Zoom in={true}>
                            <CheckCircleIcon sx={{ 
                                fontSize: 80, 
                                color: '#4a7c59',
                                mb: 2
                            }} />
                        </Zoom>
                        <Typography variant="h5" sx={{ 
                            color: '#2c5530',
                            fontWeight: 'bold',
                            mb: 1
                        }}>
                            התור נקבע בהצלחה!
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666', textAlign: 'center' }}>
                            פרטי התור נשלחו לכתובת המייל שלך
                        </Typography>
                    </Box>
                </DialogContent>
            ) : (
                <>
                    <DialogContent dividers sx={{ p: 3 }}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}
                        
                        {!flagDatiels ? (
                            <>
                                <Typography variant="h6" sx={{ 
                                    mb: 2,
                                    color: '#4a7c59',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <AccessTimeIcon sx={{ mr: 1 }} />
                                    בחר שעה מהתורים הפנויים:
                                </Typography>
                                
                                <Box sx={{ 
                                    display: 'flex', 
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                    mb: 2
                                }}>
                                    {filteredAppointments.map((av, index) => (
                                        <StyledTimeButton
                                            key={index}
                                            selected={turnIndex === index}
                                            onClick={() => {
                                                setFlagDatiels(true);
                                                setTurnIndex(index);
                                            }}
                                            startIcon={<AccessTimeIcon />}
                                        >
                                            {av.time}
                                        </StyledTimeButton>
                                    ))}
                                </Box>
                            </>
                        ) : (
                            <Fade in={true}>
                                <Box>
                                    <Typography variant="h5" sx={{ 
                                        mb: 3,
                                        color: '#2c5530',
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                        פרטי התור
                                    </Typography>
                                    
                                    <Paper elevation={0} sx={{ 
                                        p: 3, 
                                        backgroundColor: '#f9f3e6',
                                        borderRadius: '12px',
                                        mb: 3
                                    }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Box sx={{ 
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mb: 2
                                                }}>
                                                    <MedicalServicesIcon sx={{ 
                                                        color: '#4a7c59',
                                                        mr: 2,
                                                        fontSize: '1.5rem'
                                                    }} />
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                                            סוג טיפול
                                                        </Typography>
                                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                            {treat.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Divider sx={{ my: 2 }} />
                                            </Grid>
                                            
                                            <Grid item xs={6}>
                                                <Box sx={{ 
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <AccessTimeIcon sx={{ 
                                                        color: '#4a7c59',
                                                        mr: 1,
                                                        fontSize: '1.2rem'
                                                    }} />
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                                            שעה
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                            {availableTurns[turnIndex].time}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            
                                            <Grid item xs={6}>
                                                <Box sx={{ 
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <AccessTimeIcon sx={{ 
                                                        color: '#4a7c59',
                                                        mr: 1,
                                                        fontSize: '1.2rem'
                                                    }} />
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                                            משך
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                            {treat.length} דקות
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            
                                            <Grid item xs={6}>
                                                <Box sx={{ 
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <PersonIcon sx={{ 
                                                        color: '#4a7c59',
                                                        mr: 1,
                                                        fontSize: '1.2rem'
                                                    }} />
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                                            מטפל
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                            {Employees.find((e) => e.id == availableTurns[turnIndex].employeeId).name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            
                                            <Grid item xs={6}>
                                                <Box sx={{ 
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <AttachMoneyIcon sx={{ 
                                                        color: '#4a7c59',
                                                        mr: 1,
                                                        fontSize: '1.2rem'
                                                    }} />
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                                            מחיר
                                                        </Typography>
                                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                            {treat.price} ₪
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Box>
                            </Fade>
                        )}
                    </DialogContent>
                    
                    <DialogActions sx={{ p: 2, backgroundColor: '#f5efe0' }}>
                        {flagDatiels ? (
                            <>
                                <Button 
                                    onClick={() => setFlagDatiels(false)}
                                    sx={{
                                        color: '#4a7c59',
                                        borderRadius: '30px'
                                    }}
                                >
                                    חזרה
                                </Button>
                                <StyledConfirmButton 
                                    onClick={SummoningTurn}
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <EventAvailableIcon />}
                                >
                                    {loading ? 'מעבד...' : 'אישור וקביעת תור'}
                                </StyledConfirmButton>
                            </>
                        ) : (
                            <Button 
                                onClick={handleClose}
                                sx={{
                                    color: '#4a7c59',
                                    borderRadius: '30px'
                                }}
                            >
                                סגירה
                            </Button>
                        )}
                    </DialogActions>
                </>
            )}
        </StyledDialog>
    );
};

