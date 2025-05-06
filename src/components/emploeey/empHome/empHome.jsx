import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Patients } from "../patients/patients";
import CalendarEmp from "../calanderEmp/calenderEmp";
import { LogIn } from "../../login/logIn";
import { 
    Box, 
    Typography, 
    Button, 
    AppBar, 
    Toolbar, 
    Container, 
    Grid, 
    Paper, 
    Avatar, 
    Divider,
    Card,
    CardContent,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import TodayIcon from '@mui/icons-material/Today';
import PeopleIcon from '@mui/icons-material/People';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import EventIcon from '@mui/icons-material/Event'; // הוספת הייבוא החסר


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: `${drawerWidth}px`,
        }),
    }),
);

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#d8c3a5',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
}));

const NavButton = styled(Button)(({ theme, active }) => ({
    color: active ? 'white' : '#2c5530',
    backgroundColor: active ? '#4a7c59' : 'transparent',
    fontWeight: 500,
    borderRadius: '20px',
    padding: '8px 15px',
    margin: '0 5px',
    '&:hover': {
        backgroundColor: active ? '#2c5530' : 'rgba(74, 124, 89, 0.1)',
        color: active ? 'white' : '#2c5530'
    }
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        backgroundColor: '#f9f3e6',
        borderLeft: 'none'
    },
}));

export const EmpHome = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const navItems = ['יומן עבודה', 'רשימת לקוחות', 'התחברות'];
    const navIcons = [<TodayIcon />, <PeopleIcon />, <LoginIcon />];
    const navNavigate = [<CalendarEmp />, <Patients />, <LogIn />, ''];

    const [show, setShow] = useState(0); // Default to calendar view
    const [drawerOpen, setDrawerOpen] = useState(false);
    const user = useSelector(state => state.employeeSlice.currentEmployee);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    // Mock data for dashboard
    const upcomingAppointments = 5;
    const todayAppointments = 3;
    const totalPatients = 120;

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5efe0' }}>
            {/* Top AppBar */}
            <StyledAppBar position="fixed">
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 30px'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{
                            color: '#4a7c59',
                            fontWeight: 'bold',
                            display: { xs: 'none', sm: 'block' }
                        }}>
                            הקליניקה לרפואה משלימה
                        </Typography>
                    </Box>

                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            {navItems.map((item, index) => (
                                <NavButton
                                    key={index}
                                    active={show === index ? 1 : 0}
                                    onClick={() => setShow(index)}
                                    startIcon={navIcons[index]}
                                >
                                    {item}
                                </NavButton>
                            ))}
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {user?.name && (
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mr: 2
                            }}>
                                <Typography variant="subtitle1" sx={{
                                    color: '#2c5530',
                                    fontWeight: 'medium',
                                    display: { xs: 'none', sm: 'block' }
                                }}>
                                    שלום, {user.name}
                                </Typography>
                                <Avatar
                                    sx={{
                                        ml: 1,
                                        bgcolor: '#4a7c59',
                                        width: 35,
                                        height: 35
                                    }}
                                >
                                    {user.name.charAt(0)}
                                </Avatar>
                            </Box>
                        )}

                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={toggleDrawer}
                            sx={{ color: '#2c5530' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </StyledAppBar>

            {/* Side Drawer */}
            <StyledDrawer
                variant="persistent"
                anchor="right"
                open={drawerOpen}
            >
                <Box sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <Avatar
                        sx={{
                            width: 80,
                            height: 80,
                            bgcolor: '#4a7c59',
                            fontSize: '2rem',
                            mb: 2
                        }}
                    >
                        {user?.name ? user.name.charAt(0) : 'G'}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {user?.name || 'אורח'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', mb: 2 }}>
                        {user?.role || 'מטפל'}
                    </Typography>

                    <Divider sx={{ width: '100%', mb: 2 }} />
                </Box>

                <List>
                    {isMobile && navItems.map((text, index) => (
                        <ListItem
                            button
                            key={text}
                            onClick={() => {
                                setShow(index);
                                if (isMobile) setDrawerOpen(false);
                            }}
                            sx={{
                                backgroundColor: show === index ? 'rgba(74, 124, 89, 0.1)' : 'transparent',
                                borderRight: show === index ? '4px solid #4a7c59' : 'none',
                                '&:hover': {
                                    backgroundColor: 'rgba(74, 124, 89, 0.05)'
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: show === index ? '#4a7c59' : '#757575' }}>
                                {navIcons[index]}
                            </ListItemIcon>
                            <ListItemText
                                primary={text}
                                primaryTypographyProps={{
                                    fontWeight: show === index ? 'bold' : 'normal',
                                    color: show === index ? '#4a7c59' : 'inherit'
                                }}
                            />
                        </ListItem>
                    ))}

                    <Divider sx={{ my: 2 }} />

                    <ListItem button>
                        <ListItemIcon sx={{ color: '#757575' }}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="לוח בקרה" />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon sx={{ color: '#757575' }}>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary="התראות" />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon sx={{ color: '#757575' }}>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="הגדרות" />
                    </ListItem>

                    <Divider sx={{ my: 2 }} />

                    <ListItem button>
                        <ListItemIcon sx={{ color: '#f44336' }}>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="התנתקות"
                            primaryTypographyProps={{ color: '#f44336' }}
                        />
                    </ListItem>
                </List>
            </StyledDrawer>

            {/* Main Content */}
            <Main open={drawerOpen}>
                <Toolbar /> {/* Spacer for AppBar */}

                <Container maxWidth="xl" sx={{ mt: 3 }}>
                    {show === 0 && !user?.name && (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            minHeight: '70vh',
                            textAlign: 'center'
                        }}>
                            <Typography variant="h4" sx={{
                                color: '#4a7c59',
                                fontWeight: 'bold',
                                mb: 2
                            }}>
                                ברוכים הבאים למערכת ניהול הקליניקה
                            </Typography>
                            <Typography variant="body1" sx={{
                                maxWidth: '600px',
                                mb: 4
                            }}>
                                אנא התחברו למערכת כדי לצפות ביומן העבודה ולנהל את התורים והמטופלים שלכם.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => setShow(2)}
                                sx={{
                                    backgroundColor: '#4a7c59',
                                    borderRadius: '30px',
                                    padding: '10px 30px',
                                    '&:hover': {
                                        backgroundColor: '#2c5530',
                                    }
                                }}
                            >
                                התחברות למערכת
                            </Button>
                        </Box>
                    )}

                    {show === 0 && user?.name && (
                        <Box sx={{ mb: 4 }}>
                            <Grid container spacing={3} sx={{ mb: 4 }}>
                                <Grid item xs={12} md={4}>
                                    <Card sx={{
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                                        height: '100%'
                                    }}>
                                        <CardContent sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            p: 3
                                        }}>
                                            <Avatar sx={{
                                                bgcolor: '#e8f5e9',
                                                color: '#4a7c59',
                                                width: 60,
                                                height: 60,
                                                mb: 2
                                            }}>
                                                <TodayIcon fontSize="large" />
                                            </Avatar>
                                            <Typography variant="h4" sx={{
                                                color: '#4a7c59',
                                                fontWeight: 'bold',
                                                mb: 1
                                            }}>
                                                {todayAppointments}
                                            </Typography>
                                            <Typography variant="body1">
                                                תורים להיום
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Card sx={{
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                                        height: '100%'
                                    }}>
                                        <CardContent sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            p: 3
                                        }}>
                                            <Avatar sx={{
                                                bgcolor: '#fff8e1',
                                                color: '#ff9800',
                                                width: 60,
                                                height: 60,
                                                mb: 2
                                            }}>
                                                <EventIcon fontSize="large" />
                                            </Avatar>
                                            <Typography variant="h4" sx={{
                                                color: '#ff9800',
                                                fontWeight: 'bold',
                                                mb: 1
                                            }}>
                                                {upcomingAppointments}
                                            </Typography>
                                            <Typography variant="body1">
                                                תורים קרובים
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Card sx={{
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                                        height: '100%'
                                    }}>
                                        <CardContent sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                            p: 3
                                        }}>
                                            <Avatar sx={{
                                                bgcolor: '#e3f2fd',
                                                color: '#2196f3',
                                                width: 60,
                                                height: 60,
                                                mb: 2
                                            }}>
                                                <PeopleIcon fontSize="large" />
                                            </Avatar>
                                            <Typography variant="h4" sx={{
                                                color: '#2196f3',
                                                fontWeight: 'bold',
                                                mb: 1
                                            }}>
                                                {totalPatients}
                                            </Typography>
                                            <Typography variant="body1">
                                                סך הכל מטופלים
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    )}

                    {navNavigate[show]}
                </Container>
            </Main>
        </Box>
    );
};
