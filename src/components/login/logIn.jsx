import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentPatient } from "../../redux/currentPatientSlice/currentPatientSlice";
import { SingIn } from "../patient/singIn/singIn";
import { Link, useNavigate } from "react-router-dom";
import { getPatientThunk } from "../../redux/patientSlice/getPatientThunk";
import { setUserId } from "../../redux/patientSlice/patientSlice";
import { setCurrentEmployee } from "../../redux/employeeSlice/employeeSlice";
import { getAllEmployeesThunk } from "../../redux/employeeSlice/getAllEmployeesThunk";
import { getAllTypes } from "../../redux/TypeOfTreatsSlice/GetAllTypesThunk";
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Paper, 
    Container,
    CircularProgress,
    Alert
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export const LogIn = () => {
    const navigate = useNavigate()
    const patients = useSelector(state => state.patientSlice.listPatient);
    const employees = useSelector(state => state.employeeSlice.listEmployees);
    const user = useSelector(state => state.currentPatientSlice.currentPatient);
    const [id, setId] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        getPatient()
    }, [])
    
    let b;
    const getPatient = async () => {
        setLoading(true)
        try {
            const a = await dispatch(getPatientThunk())
            if (a){
                b = await dispatch(getAllEmployeesThunk())
            }
            if(a && b!=null)
            {
                dispatch(getAllTypes())
            }
        } catch (err) {
            setError("אירעה שגיאה בטעינת הנתונים")
        } finally {
            setLoading(false)
        }
    }

    const enter = async () => {
        if (!id) {
            setError("נא להזין מספר זהות")
            return
        }
        
        setLoading(true)
        setError("")
        
        try {
            let currentE = (employees).find(e => e.id == id)
            let currentP = (patients).find(p => p.id == id)

            dispatch(setUserId(id))
            if (currentP) {
                await dispatch(setCurrentPatient(currentP));
                navigate(`/patientHome`)
            }
            else if (id == '33') {
                await dispatch(setCurrentEmployee(currentE))
                navigate('/empHome')
            }
            else {
                navigate(`/singIn/${id}`)
            }
        } catch (err) {
            setError("אירעה שגיאה בתהליך הכניסה")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
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
                        כניסה למערכת
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#4a7c59' }}>
                        הזינו את מספר הזהות שלכם כדי להיכנס או להירשם
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
                        <PersonIcon sx={{ fontSize: 40, color: 'white' }} />
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        label="מספר זהות"
                        variant="outlined"
                        value={id}
                        onChange={e => setId(e.target.value)}
                        sx={{
                            mb: 3,
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

                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
                        <Button
                            variant="contained"
                            onClick={enter}
                            disabled={loading}
                            sx={{
                                backgroundColor: '#4a7c59',
                                color: 'white',
                                borderRadius: '30px',
                                padding: '12px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#2c5530'
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'כניסה'}
                        </Button>
                        
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            sx={{
                                color: '#4a7c59',
                                borderColor: '#4a7c59',
                                borderRadius: '30px',
                                padding: '12px',
                                fontSize: '1.1rem',
                                '&:hover': {
                                    borderColor: '#2c5530',
                                    backgroundColor: 'rgba(74, 124, 89, 0.1)'
                                }
                            }}
                        >
                            חזרה
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
