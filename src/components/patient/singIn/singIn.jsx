import { useDispatch } from 'react-redux'
import './singIn.css'
import { useState } from 'react'
import { addPatientThunk } from '../../../redux/patientSlice/addPatientThunk'
import { useNavigate, useParams } from 'react-router-dom'
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Paper, 
    Container,
    Grid,
    CircularProgress,
    Alert,
    Divider
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const SingIn = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = useState({ 
        id: id, 
        firstName: '', 
        lastName: '', 
        phone: '', 
        email: '', 
        address: '', 
        reason: '' 
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    
    const validateForm = () => {
        if (!data.firstName) return "שם פרטי הוא שדה חובה";
        if (!data.lastName) return "שם משפחה הוא שדה חובה";
        if (!data.phone) return "מספר טלפון הוא שדה חובה";
        if (!data.email) return "כתובת אימייל היא שדה חובה";
        if (!data.address) return "כתובת היא שדה חובה";
        
        // בדיקת תקינות טלפון - 10 ספרות המתחילות ב-0
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(data.phone)) return "מספר טלפון לא תקין";
        
        // בדיקת תקינות אימייל בסיסית
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) return "כתובת אימייל לא תקינה";
        
        return "";
    }
    
    const submit = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }
        
        setLoading(true);
        setError("");
        
        try {
            await dispatch(addPatientThunk(data));
            navigate(`/patientHome`);
        } catch (err) {
            setError("אירעה שגיאה בתהליך ההרשמה");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper 
                elevation={0} 
                sx={{ 
                    p: 4, 
                    borderRadius: '10px',
                    backgroundColor: 'transparent'
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ 
                        color: '#2c5530', 
                        fontWeight: 'bold',
                        mb: 2
                    }}>
                        הרשמה למערכת
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#4a7c59' }}>
                        אנא מלאו את הפרטים הבאים כדי להשלים את תהליך ההרשמה
                    </Typography>
                </Box>

                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Box sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        backgroundColor: '#8fb996',
                        mb: 3
                    }}>
                        <PersonAddIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="מספר זהות"
                                variant="outlined"
                                value={id}
                                disabled
                                sx={{
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
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="שם פרטי"
                                variant="outlined"
                                value={data.firstName}
                                onChange={e => setData({ ...data, firstName: e.target.value })}
                                sx={{
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
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="שם משפחה"
                                variant="outlined"
                                value={data.lastName}
                                onChange={e => setData({ ...data, lastName: e.target.value })}
                                sx={{
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
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="טלפון"
                                variant="outlined"
                                value={data.phone}
                                onChange={e => setData({ ...data, phone: e.target.value })}
                                sx={{
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
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="אימייל"
                                variant="outlined"
                                value={data.email}
                                onChange={e => setData({ ...data, email: e.target.value })}
                                sx={{
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
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                label="כתובת"
                                variant="outlined"
                                value={data.address}
                                onChange={e => setData({ ...data, address: e.target.value })}
                                sx={{
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
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="סיבת הפנייה (אופציונלי)"
                                variant="outlined"
                                multiline
                                rows={3}
                                value={data.reason || ''}
                                onChange={e => setData({ ...data, reason: e.target.value })}
                                sx={{
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
                                }}
                            />
                        </Grid>
                    </Grid>

                    <Divider sx={{ width: '100%', my: 4 }} />

                    <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={submit}
                            disabled={loading}
                            sx={{
                                backgroundColor: '#4a7c59',
                                color: 'white',
                                borderRadius: '30px',
                                padding: '12px 30px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#2c5530'
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'הרשמה'}
                        </Button>
                        
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            sx={{
                                color: '#4a7c59',
                                borderColor: '#4a7c59',
                                borderRadius: '30px',
                                padding: '12px 30px',
                                fontSize: '1.1rem',
                                '&:hover': {
                                    borderColor: '#2c5530',
                                    backgroundColor: 'rgba(74, 124, 89, 0.1)'
                                }
                            }}
                        >
                            ביטול
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
