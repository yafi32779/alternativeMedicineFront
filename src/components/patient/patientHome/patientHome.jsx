import { useNavigate } from "react-router-dom";
import './patientHome.css';
import { use, useEffect, useState } from "react";
import { SingIn } from "../singIn/singIn";
import { AvailableTurns } from "../availableTurns/availableTurns";
import { LogIn } from "../../login/logIn";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Button, Card, CardContent, CardMedia, Container, Grid, AppBar, Toolbar } from '@mui/material';
import { FutureAppointments } from "../futureTurns/futureTurns";
import { getAllTurnsThunk } from "../../../redux/turnsSlice/getAllTturnsthunk";


export const PatientHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
        const allTurns = useSelector(state => state.turnsSlice.allTurns);

    const navItems = ['התחברות', 'תורים עתידיים', 'היסטורית תורים', 'קביעת תורים'];
    const navNavigate = [<LogIn />, <FutureAppointments allTurns={allTurns}/>, '/appointment-history', <AvailableTurns />];

    const [show, setShow] = useState(-1);
    const user = useSelector(state => state.currentPatientSlice.currentPatient);
    const treatments = [
        { name: 'רפלקסולוגיה', description: 'טיפול המשלב עיסוי כפות הרגליים לאיזון הגוף', image: '/images/טיפול-טבעי-בחרדה_1732450075867-930x620.webp' },
        { name: 'אבחון ביקום', description: 'אבחון מתקדם באמצעות מכשיר ביקום', image: '/images/טיפול-טבעי-בחרדה_1732450075867-930x620.webp' },
        { name: 'פרחי באך', description: 'טיפול טבעי באמצעות תמציות פרחים', image: '/images/טיפול-טבעי-בחרדה_1732450075867-930x620.webp' },
        { name: 'טיפול SE', description: 'טיפול רגשי יעיל להתמכרויות וטראומה', image: '/images/טיפול-טבעי-בחרדה_1732450075867-930x620.webp' },
        { name: 'טיפול באוזון', description: 'טיפול מתקדם לחיזוק המערכת החיסונית', image: '/images/טיפול-טבעי-בחרדה_1732450075867-930x620.webp' },
        { name: 'דיאטת ניקוי', description: 'תוכנית תזונה ייחודית לניקוי הגוף', image: '/images/טיפול-טבעי-בחרדה_1732450075867-930x620.webp' }
    ];

    useEffect(() => {
        getAllTurns();
    },[])
    const getAllTurns = async () => {
        await dispatch(getAllTurnsThunk());
    }

    return (
        <Box className="patient-home">
            {/* Header Banner */}
            <Box sx={{
                backgroundImage: 'linear-gradient(rgba(44, 85, 48, 0.7), rgba(44, 85, 48, 0.7)), url("/images/טיפול-טבעי-בחרדה_1732450075867-930x620.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
            }}>
                <Box sx={{ maxWidth: '800px', padding: '0 20px' }}>
                    <Typography variant="h3" sx={{ marginBottom: '15px', fontWeight: 'bold' }}>
                        ברוכים הבאים לקליניקת הרפואה המשלימה
                    </Typography>
                    <Typography variant="h6">
                        מקום של ריפוי, איזון והתחדשות
                    </Typography>
                </Box>
            </Box>

            {/* Navigation Toolbar */}
            <AppBar position="static" sx={{
                backgroundColor: '#d8c3a5',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 30px'
                }}>
                    {user.firstName &&
                        <Typography variant="h6" sx={{ color: '#2c5530', fontWeight: 500 }}>
                            שלום {user.firstName} {user.lastName}
                        </Typography>
                    }
                    <Box sx={{ display: 'flex', gap: '25px' }}>
                        {navItems.map((item, index) => (
                            <Button
                                key={index}
                                onClick={() => setShow(index)}
                                sx={{
                                    color: show === index ? 'white' : '#2c5530',
                                    backgroundColor: show === index ? '#4a7c59' : 'transparent',
                                    fontWeight: 500,
                                    borderRadius: '20px',
                                    padding: '8px 15px',
                                    '&:hover': {
                                        backgroundColor: '#4a7c59',
                                        color: 'white'
                                    }
                                }}
                            >
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            {show === -1 ? (
                <>
                    {/* Clinic Intro */}
                    <Container sx={{ padding: '60px 30px' }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <Typography variant="h4" sx={{ color: '#4a7c59', marginBottom: '20px' }}>
                                    הקליניקה שלנו
                                </Typography>
                                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                                    ברוכים הבאים לקליניקת הרפואה המשלימה שלנו, מקום בו תוכלו למצוא מגוון רחב של טיפולים
                                    באווירה חמימה ומפנקת. אנו מציעים טיפולים מותאמים אישית לכל מטופל, במטרה להביא לאיזון
                                    ושיפור באיכות החיים.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    component="img"
                                    src='/images/טיפול-טבעי-בחרדה_1732450075867-930x620.webp'
                                    alt="הקליניקה שלנו"
                                    sx={{
                                        width: '100%',
                                        borderRadius: '10px',
                                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Container>

                    {/* Treatments Section */}
                    <Box sx={{
                        backgroundColor: '#8fb996',
                        padding: '60px 30px',
                        textAlign: 'center'
                    }}>
                        <Typography variant="h4" sx={{ color: 'white', marginBottom: '40px' }}>
                            הטיפולים שלנו
                        </Typography>
                        <Container>
                            <Grid container spacing={3}>
                                {treatments.map((treatment, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            borderRadius: '10px',
                                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                                            transition: 'transform 0.3s ease',
                                            '&:hover': {
                                                transform: 'translateY(-5px)'
                                            }
                                        }}>
                                            <CardMedia
                                                component="img"
                                                height="180"
                                                image={treatment.image}
                                                alt={treatment.name}
                                                sx={{
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <CardContent sx={{ flexGrow: 1, padding: '30px' }}>
                                                <Typography variant="h5" sx={{ color: '#4a7c59', marginBottom: '15px' }}>
                                                    {treatment.name}
                                                </Typography>
                                                <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                                                    {treatment.description}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => setShow(3)}
                                                    sx={{
                                                        backgroundColor: '#4a7c59',
                                                        color: 'white',
                                                        borderRadius: '20px',
                                                        '&:hover': {
                                                            backgroundColor: '#2c5530'
                                                        }
                                                    }}
                                                >
                                                    לקביעת תור
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Box>

                    {/* Benefits Section */}

                </>
            ) : (
                <Container sx={{ minHeight: '500px', padding: '40px 0' }}>
                    {navNavigate[show]}
                </Container>
            )}

            {/* Footer */}
            <Box sx={{
                backgroundColor: '#2c5530',
                color: 'white',
                padding: '40px 30px 20px'
            }}>
                <Container>
                    <Grid container spacing={3} justifyContent="space-around">
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" sx={{ marginBottom: '15px' }}>
                                צרו קשר
                            </Typography>
                            <Typography variant="body1">טלפון: 050-1234567</Typography>
                            <Typography variant="body1">כתובת: רחוב הבריאות 10, תל אביב</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" sx={{ marginBottom: '15px' }}>
                                שעות פעילות
                            </Typography>
                            <Typography variant="body1">ימים א'-ה': 09:00-20:00</Typography>
                            <Typography variant="body1">יום ו': 09:00-14:00</Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{
                        textAlign: 'center',
                        marginTop: '40px',
                        paddingTop: '20px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <Typography variant="body2">
                            © 2023 הקליניקה לרפואה משלימה. כל הזכויות שמורות.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
