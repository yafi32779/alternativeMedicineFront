import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientThunk } from '../../../redux/patientSlice/getPatientThunk';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    Chip,
    Avatar,
    Divider,
    Tooltip,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';

//
// בתוך קומפוננטת patients
// import { AddPatient } from './addPatient/addPatient';
// import { Button } from '@mui/material';


import AddIcon from '@mui/icons-material/Add';


import { AddPatient } from './addPatient/addPatient';







const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    backgroundColor: '#4a7c59',
    color: 'white',
    textAlign: 'right'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: alpha('#f5efe0', 0.3),
    },
    '&:hover': {
        backgroundColor: alpha('#d8c3a5', 0.1),
        cursor: 'pointer'
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ActionButton = styled(Button)(({ theme, color }) => ({
    margin: '5px',
    borderRadius: '20px',
    backgroundColor: color === 'primary' ? '#4a7c59' :
        color === 'secondary' ? '#8fb996' : '#e0e0e0',
    color: 'white',
    '&:hover': {
        backgroundColor: color === 'primary' ? '#2c5530' :
            color === 'secondary' ? '#6b9b76' : '#bdbdbd',
    }
}));

export const Patients = () => {

    // הוסף את המשתנה הזה לקומפוננטה
    const [openAddDialog, setOpenAddDialog] = useState(false);

    // הוסף פונקציה זו לרענון רשימת המטופלים אחרי הוספה
    const handlePatientAdded = () => {
        // כאן תוכל להוסיף קוד לרענון רשימת המטופלים
        // למשל: dispatch(getPatientThunk())
    };


    
    const dispatch = useDispatch();
    const patients = useSelector(state => state.patientSlice.listPatient);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            await dispatch(getPatientThunk());
            setLoading(false);
        };

        fetchPatients();
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const filteredPatients = patients.filter(patient =>
        patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.includes(searchTerm) ||
        patient.phone.includes(searchTerm)
    );

    return (
        <Box sx={{ p: 3 }}>
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
                    <PersonIcon sx={{ mr: 1 }} />
                    רשימת מטופלים
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        placeholder="חיפוש מטופל..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearch}
                        sx={{
                            width: '250px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '20px',
                                backgroundColor: '#f5efe0',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4a7c59',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4a7c59',
                                },
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#4a7c59' }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAddDialog(true)}
                        sx={{
                            backgroundColor: '#4a7c59',
                            color: 'white',
                            borderRadius: '20px',
                            padding: '8px 20px',
                            margin: '20px 0',
                            '&:hover': {
                                backgroundColor: '#2c5530',
                            }
                        }}
                    >
                        הוספת מטופל חדש
                    </Button>
                </Box>
            </Box>

            <Paper elevation={0} sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
                {loading ? (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '300px'
                    }}>
                        <CircularProgress color="success" />
                    </Box>
                ) : (
                    <>
                        <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="patients table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>מספר זהות</StyledTableCell>
                                        <StyledTableCell>שם פרטי</StyledTableCell>
                                        <StyledTableCell>שם משפחה</StyledTableCell>
                                        <StyledTableCell>טלפון</StyledTableCell>
                                        <StyledTableCell>אימייל</StyledTableCell>
                                        <StyledTableCell>כתובת</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredPatients
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((patient) => (
                                            <StyledTableRow
                                                key={patient.id}
                                                onClick={() => handlePatientClick(patient)}
                                            >
                                                <TableCell component="th" scope="row" sx={{ textAlign: 'right' }}>
                                                    {patient.id}
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'right' }}>{patient.firstName}</TableCell>
                                                <TableCell sx={{ textAlign: 'right' }}>{patient.lastName}</TableCell>
                                                <TableCell sx={{ textAlign: 'right' }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                        <Typography variant="body2">{patient.phone}</Typography>
                                                        <PhoneIcon sx={{ ml: 1, fontSize: '1rem', color: '#4a7c59' }} />
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ textAlign: 'right' }}>{patient.email}</TableCell>
                                                <TableCell sx={{ textAlign: 'right' }}>{patient.address}</TableCell>
                                            </StyledTableRow>
                                        ))}
                                    {filteredPatients.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} sx={{ textAlign: 'center', py: 3 }}>
                                                <Typography variant="body1" sx={{ color: '#757575' }}>
                                                    לא נמצאו מטופלים
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            component="div"
                            count={filteredPatients.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            labelRowsPerPage="שורות בעמוד:"
                            labelDisplayedRows={({ from, to, count }) => `${from}-${to} מתוך ${count}`}
                            sx={{
                                '.MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon, .MuiTablePagination-displayedRows': {
                                    direction: 'rtl !important',
                                }
                            }}
                        />
                    </>
                )}
            </Paper>

            {/* Patient Details Dialog */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }
                }}
            >
                {selectedPatient && (
                    <>
                        <DialogTitle sx={{
                            backgroundColor: '#4a7c59',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Typography variant="h6">פרטי מטופל</Typography>
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseDialog}
                                sx={{ color: 'white' }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent sx={{ p: 3, mt: 2 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                                    <Avatar
                                        sx={{
                                            width: 120,
                                            height: 120,
                                            margin: '0 auto 16px',
                                            backgroundColor: '#8fb996',
                                            fontSize: '3rem'
                                        }}
                                    >
                                        {selectedPatient.firstName.charAt(0)}{selectedPatient.lastName.charAt(0)}
                                    </Avatar>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                        {selectedPatient.firstName} {selectedPatient.lastName}
                                    </Typography>
                                    <Chip
                                        label={selectedPatient.id}
                                        sx={{ mt: 1, backgroundColor: '#f5efe0' }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" sx={{
                                            color: '#4a7c59',
                                            fontWeight: 'bold',
                                            mb: 2
                                        }}>
                                            פרטי קשר
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mb: 2
                                                }}>
                                                    <PhoneIcon sx={{
                                                        color: '#4a7c59',
                                                        mr: 1
                                                    }} />
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#757575' }}>
                                                            טלפון
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {selectedPatient.phone}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    mb: 2
                                                }}>
                                                    <EmailIcon sx={{
                                                        color: '#4a7c59',
                                                        mr: 1
                                                    }} />
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#757575' }}>
                                                            אימייל
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {selectedPatient.email}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}>
                                                    <HomeIcon sx={{
                                                        color: '#4a7c59',
                                                        mr: 1
                                                    }} />
                                                    <Box>
                                                        <Typography variant="body2" sx={{ color: '#757575' }}>
                                                            כתובת
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {selectedPatient.address}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Divider sx={{ my: 3 }} />

                                    <Box>
                                        <Typography variant="h6" sx={{
                                            color: '#4a7c59',
                                            fontWeight: 'bold',
                                            mb: 2
                                        }}>
                                            פעולות מהירות
                                        </Typography>
                                        <Box sx={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: 1
                                        }}>
                                            <ActionButton
                                                color="primary"
                                                startIcon={<EventIcon />}
                                            >
                                                קביעת תור
                                            </ActionButton>
                                            <ActionButton
                                                color="secondary"
                                                startIcon={<HistoryIcon />}
                                            >
                                                היסטוריית טיפולים
                                            </ActionButton>
                                            <ActionButton
                                                color="secondary"
                                                startIcon={<EventIcon />}
                                            >
                                                תורים עתידיים
                                            </ActionButton>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions sx={{ p: 2 }}>
                            <Button
                                onClick={handleCloseDialog}
                                sx={{
                                    color: '#4a7c59',
                                    borderRadius: '20px',
                                    fontWeight: 'bold'
                                }}
                            >
                                סגירה
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
            <AddPatient
                open={openAddDialog}
                setOpen={setOpenAddDialog}
                onPatientAdded={handlePatientAdded}
            />
        </Box>

    );
};

