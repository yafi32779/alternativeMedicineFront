import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
    Box, 
    Typography, 
    Container, 
    Paper, 
    Grid, 
    Divider, 
    Button, 
    CircularProgress,
    Alert
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import CancelIcon from '@mui/icons-material/Cancel';
import './futureTurns.css';

export const FutureAppointments = ({allTurns}) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancellingId, setCancellingId] = useState(null);
    
    // קבלת המטופל הנוכחי מה-Redux store
    const currentPatient = useSelector(state => state.currentPatientSlice.currentPatient);
    const employees = useSelector(state => state.employeeSlice.listEmployees);
    const typeOfTreats = useSelector(state => state.TypeOfTreatsSlice.typeOfTreats);
    useEffect(() => {
        const fetchFutureAppointments = async () => {
            setLoading(true);
            try {

                // כאן יש להחליף עם קריאת API אמיתית
                // לדוגמה: const response = await fetch(`/api/patients/${currentPatient.id}/appointments/future`);
                
                // לצורך הדוגמה, נשתמש בנתונים סטטיים
                setTimeout(() => {
                    // const mockAppointments = [
                    //     {
                    //         id: '1',
                    //         date: '2023-12-25',
                    //         time: '10:00',
                    //         treatmentType: 'רפלקסולוגיה',
                    //         therapistName: 'ד"ר יעל כהן',
                    //         status: 'confirmed'
                    //     },
                    //     {
                    //         id: '2',
                    //         date: '2024-01-10',
                    //         time: '14:30',
                    //         treatmentType: 'אבחון ביקום',
                    //         therapistName: 'ד"ר דוד לוי',
                    //         status: 'confirmed'
                    //     },
                    //     {
                    //         id: '3',
                    //         date: '2024-01-15',
                    //         time: '11:15',
                    //         treatmentType: 'פרחי באך',
                    //         therapistName: 'ד"ר שירה אברהם',
                    //         status: 'confirmed'
                    //     }
                    // ];
                    const mockAppointments = allTurns.filter((turn) => turn.patientId === currentPatient.id && turn.date >= new Date().toISOString().split('T')[0]);
                    setAppointments(mockAppointments);
                    setLoading(false);
                }, 1000);
                
            } catch (err) {
                console.error('שגיאה בטעינת התורים העתידיים:', err);
                setError('אירעה שגיאה בטעינת התורים העתידיים. אנא נסה שנית מאוחר יותר.');
                setLoading(false);
            }
        };
        
        if (currentPatient && currentPatient.id) {
            fetchFutureAppointments();
        } else {
            setError('לא נמצאו פרטי מטופל. אנא התחבר למערכת.');
            setLoading(false);
        }
    }, [currentPatient]);
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', options);
    };
    
    const handleCancelAppointment = async (appointmentId) => {
        setCancellingId(appointmentId);
        try {
            // כאן יש להחליף עם קריאת API אמיתית
            // לדוגמה: await fetch(`/api/appointments/${appointmentId}/cancel`, { method: 'POST' });
            
            // לצורך הדוגמה, נדמה תהליך ביטול
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // עדכון הרשימה המקומית לאחר ביטול התור
            setAppointments(appointments.filter(app => app.id !== appointmentId));
            
            setCancellingId(null);
        } catch (err) {
            console.error('שגיאה בביטול התור:', err);
            setError('אירעה שגיאה בביטול התור. אנא נסה שנית מאוחר יותר.');
            setCancellingId(null);
        }
    };
    
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress sx={{ color: '#4a7c59' }} />
            </Box>
        );
    }
    
    if (error) {
        return (
            <Container>
                <Alert severity="error" sx={{ mt: 3, mb: 3 }}>
                    {error}
                </Alert>
            </Container>
        );
    }
    
    return (
        <Container className="future-appointments">
            <Typography variant="h4" sx={{ 
                color: '#4a7c59', 
                mb: 4, 
                textAlign: 'center',
                fontWeight: 'bold'
            }}>
                התורים העתידיים שלי
            </Typography>
            
            {appointments.length === 0 ? (
                <Paper elevation={3} sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    borderRadius: '10px',
                    backgroundColor: '#f8f8f8'
                }}>
                    <Typography variant="h6" sx={{ color: '#666' }}>
                        אין לך תורים עתידיים כרגע
                    </Typography>
                    <Button 
                        variant="contained" 
                        sx={{
                            mt: 2,
                            backgroundColor: '#4a7c59',
                            '&:hover': {
                                backgroundColor: '#2c5530'
                            },
                            borderRadius: '20px',
                            padding: '8px 20px'
                        }}
                        onClick={() => window.history.back()}
                    >
                        חזרה לדף הבית
                    </Button>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {appointments.map((appointment) => (
                        <Grid item xs={12} key={appointment.id}>
                            <Paper elevation={3} sx={{ 
                                p: 3, 
                                borderRadius: '10px',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                                }
                            }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={8}>
                                        <Typography variant="h5" sx={{ 
                                            color: '#4a7c59', 
                                            mb: 2,
                                            fontWeight: 'bold'
                                        }}>
                                            {appointment.treatmentType}
                                        </Typography>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <CalendarMonthIcon sx={{ color: '#8fb996', mr: 1 }} />
                                            <Typography variant="body1">
                                                {formatDate(appointment.date)}
                                            </Typography>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <AccessTimeIcon sx={{ color: '#8fb996', mr: 1 }} />
                                            <Typography variant="body1">
                                                שעה: {appointment.time}
                                            </Typography>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <PersonIcon sx={{ color: '#8fb996', mr: 1 }} />
                                            <Typography variant="body1">
                                                מטפל/ת: {employees.find(employee => employee.id === appointment.employeeId) ?.name}
                                            </Typography>
                                        </Box>
                                        
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <MedicalServicesIcon sx={{ color: '#8fb996', mr: 1 }} />
                                            <Typography variant="body1">
                                                סוג טיפול: {typeOfTreats.find(type => type.id === appointment.treatmentTypeId)?.name}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    
                                    <Grid item xs={12} md={4} sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: { xs: 'flex-start', md: 'flex-end' },
                                        mt: { xs: 2, md: 0 }
                                    }}>
                                        <Button 
                                            variant="outlined" 
                                            color="error"
                                            startIcon={cancellingId === appointment.id ? 
                                                <CircularProgress size={20} color="error" /> : 
                                                <CancelIcon />
                                            }
                                            disabled={cancellingId === appointment.id}
                                            onClick={() => handleCancelAppointment(appointment.id)}
                                            sx={{
                                                borderRadius: '20px',
                                                padding: '8px 15px'
                                            }}
                                        >
                                            {cancellingId === appointment.id ? 'מבטל תור...' : 'ביטול תור'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};
