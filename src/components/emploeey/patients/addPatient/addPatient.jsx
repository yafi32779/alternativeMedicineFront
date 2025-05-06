import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addPatientThunk } from '../../../redux/patientSlice/addPatientThunk';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    TextField, 
    Box, 
    IconButton, 
    Typography,
    Grid,
    styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { addPatientThunk } from '../../../../redux/patientSlice/addPatientThunk';

// צבעים תואמים לאתר
const colors = {
    primary: '#4a7c59',      // ירוק כהה
    secondary: '#8fb996',    // ירוק בהיר
    accent: '#d8c3a5',       // קרם/בז'
    light: '#f9f3e6',        // קרם בהיר
    dark: '#2c5530',         // ירוק כהה מאוד
    text: '#333333',         // טקסט כהה
    textLight: '#666666'     // טקסט בהיר
};

const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: colors.primary,
    },
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: colors.primary,
        },
    },
    marginBottom: '15px'
});

const StyledButton = styled(Button)({
    backgroundColor: colors.primary,
    color: 'white',
    '&:hover': {
        backgroundColor: colors.dark,
    },
    borderRadius: '20px',
    padding: '8px 20px',
});

const CancelButton = styled(Button)({
    color: colors.primary,
    borderColor: colors.primary,
    '&:hover': {
        borderColor: colors.dark,
        backgroundColor: 'rgba(74, 124, 89, 0.1)',
    },
    borderRadius: '20px',
    padding: '8px 20px',
});

export const AddPatient = ({ open, setOpen, onPatientAdded }) => {
    const [data, setData] = useState({ 
        id: '', 
        firstName: '', 
        lastName: '', 
        phone: '', 
        email: '', 
        address: '', 
        reason: '' 
    });
    
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
        setData({ 
            id: '', 
            firstName: '', 
            lastName: '', 
            phone: '', 
            email: '', 
            address: '', 
            reason: '' 
        });
        setErrors({});
    };

    const validateForm = () => {
        let tempErrors = {};
        let formIsValid = true;

        // בדיקת תעודת זהות - 9 ספרות
        if (!data.id || !/^\d{9}$/.test(data.id)) {
            tempErrors.id = "יש להזין תעודת זהות תקינה (9 ספרות)";
            formIsValid = false;
        }

        // בדיקת שם פרטי
        if (!data.firstName) {
            tempErrors.firstName = "יש להזין שם פרטי";
            formIsValid = false;
        }

        // בדיקת שם משפחה
        if (!data.lastName) {
            tempErrors.lastName = "יש להזין שם משפחה";
            formIsValid = false;
        }

        // בדיקת טלפון - מספר בן 10 ספרות המתחיל ב-0
        if (!data.phone || !/^0\d{9}$/.test(data.phone)) {
            tempErrors.phone = "יש להזין מספר טלפון תקין (10 ספרות המתחיל ב-0)";
            formIsValid = false;
        }

        // בדיקת אימייל
        if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
            tempErrors.email = "יש להזין כתובת אימייל תקינה";
            formIsValid = false;
        }

        // בדיקת כתובת
        if (!data.address) {
            tempErrors.address = "יש להזין כתובת";
            formIsValid = false;
        }

        setErrors(tempErrors);
        return formIsValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                await dispatch(addPatientThunk(data));
                if (onPatientAdded) onPatientAdded();
                handleClose();
            } catch (error) {
                console.error("שגיאה בהוספת מטופל:", error);
                // אפשר להוסיף כאן טיפול בשגיאות ספציפיות
            }
        }
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="md"
            PaperProps={{
                style: {
                    borderRadius: '10px',
                    padding: '10px',
                    backgroundColor: colors.light
                }
            }}
        >
            <DialogTitle sx={{ 
                m: 0, 
                p: 2, 
                color: colors.primary,
                fontWeight: 'bold',
                textAlign: 'center',
                borderBottom: `1px solid ${colors.accent}`
            }}>
                הוספת מטופל חדש
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: colors.textLight
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <StyledTextField
                            fullWidth
                            label="תעודת זהות"
                            variant="outlined"
                            value={data.id}
                            onChange={(e) => setData({ ...data, id: e.target.value })}
                            error={!!errors.id}
                            helperText={errors.id}
                            inputProps={{ maxLength: 9 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StyledTextField
                            fullWidth
                            label="טלפון"
                            variant="outlined"
                            value={data.phone}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            inputProps={{ maxLength: 10 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StyledTextField
                            fullWidth
                            label="שם פרטי"
                            variant="outlined"
                            value={data.firstName}
                            onChange={(e) => setData({ ...data, firstName: e.target.value })}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <StyledTextField
                            fullWidth
                            label="שם משפחה"
                            variant="outlined"
                            value={data.lastName}
                            onChange={(e) => setData({ ...data, lastName: e.target.value })}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            label="כתובת אימייל"
                            variant="outlined"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            label="כתובת"
                            variant="outlined"
                            value={data.address}
                            onChange={(e) => setData({ ...data, address: e.target.value })}
                            error={!!errors.address}
                            helperText={errors.address}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTextField
                            fullWidth
                            label="הערות"
                            variant="outlined"
                            multiline
                            rows={3}
                            value={data.reason}
                            onChange={(e) => setData({ ...data, reason: e.target.value })}
                        />
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ 
                p: 3, 
                justifyContent: 'center',
                borderTop: `1px solid ${colors.accent}`,
                gap: 2
            }}>
                <StyledButton onClick={handleSubmit}>
                    הוספת מטופל
                </StyledButton>
                <CancelButton variant="outlined" onClick={handleClose}>
                    ביטול
                </CancelButton>
            </DialogActions>
        </Dialog>
    );
};
