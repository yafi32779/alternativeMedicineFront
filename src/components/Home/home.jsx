import { Link, useNavigate } from 'react-router-dom';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { getPatientThunk } from '../../redux/patientSlice/getPatientThunk';
import { LogIn } from '../login/logIn';
import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    AppBar,
    Toolbar,
    Divider,
    Avatar,
    Paper,
    Rating,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const NewHome = () => {
    const navigate = useNavigate();
    const navItems = ['דף הבית', 'הטיפולים שלנו', 'המלצות', 'אודות', 'צור קשר'];
    const [userName, setUserName] = useState('');
    const navNavigate = ['home', 'treatments', 'therapists', 'about', 'contact'];
    const user = useSelector(state => state.currentPatientSlice.currentPatient);
    const dispatch = useDispatch();
    const [show, setShow] = useState(-1);
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (sectionId === 'home') {
            // אם זה כפתור "דף הבית", גלול לראש הדף
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };
    // מידע על הטיפולים
    const treatments = [
        {
            name: 'רפלקסולוגיה',
            description: 'רפלקסולוגיה היא שיטת טיפול עתיקה המבוססת על העיקרון שבכפות הרגליים ישנם אזורים המקושרים לאיברים ומערכות בגוף. באמצעות לחיצות ועיסוי של אזורים אלו, ניתן לשחרר חסימות אנרגטיות, להפחית מתחים ולשפר את תפקוד מערכות הגוף השונות.',
            benefits: ['הפחתת מתח וחרדה', 'שיפור זרימת הדם', 'חיזוק המערכת החיסונית', 'הקלה בכאבים כרוניים'],
            image: '/images/רפואה משלימה במרכז.jpg'
        },
        {
            name: 'אוזון',
            description: 'הדיקור הסיני הוא חלק מהרפואה הסינית המסורתית, המבוססת על תפיסה הוליסטית של האדם. הטיפול מתבצע באמצעות החדרת מחטים דקיקות לנקודות ספציפיות בגוף, במטרה לאזן את זרימת האנרגיה (צ\'י) ולעודד את יכולת הריפוי הטבעית של הגוף.',
            benefits: ['הקלה בכאבים', 'שיפור איכות השינה', 'איזון הורמונלי', 'הפחתת דלקות'],
            image: '/images/רפואה משלימה במרכז.jpg'
        },
        {
            name: 'פרחי באך',
            description: 'תמציות פרחי באך הן שיטת טיפול טבעית שפותחה על ידי ד"ר אדוארד באך בשנות ה-30 של המאה ה-20. התמציות מופקות מפרחים ומיועדות לאזן מצבים רגשיים שליליים ולסייע בהתמודדות עם קשיים נפשיים כמו חרדה, דיכאון, פחדים ועוד.',
            benefits: ['איזון רגשי', 'הפחתת מתח וחרדה', 'שיפור איכות השינה', 'תמיכה בתקופות של שינוי'],
            image: '/images/רפואה משלימה במרכז.jpg'
        },
        {
            name: 'bicome',
            description: 'שיאצו היא שיטת טיפול יפנית המשלבת לחיצות על נקודות לאורך מסלולי האנרגיה בגוף (מרידיאנים). הטיפול מתבצע על מזרן כאשר המטופל לבוש בבגדים נוחים. השיאצו מסייע לשחרור חסימות אנרגטיות, הפחתת מתחים ושיפור הבריאות הכללית.',
            benefits: ['הרפיית שרירים', 'שיפור זרימת הדם', 'הקלה בכאבי גב וצוואר', 'איזון מערכת העצבים'],
            image: '/images/רפואה משלימה במרכז.jpg'
        }
    ];

    // המלצות מלקוחות
    const testimonials = [
        {
            name: 'יעל כהן',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            text: 'הגעתי לקליניקה לאחר תקופה ארוכה של כאבי גב. לאחר סדרת טיפולי שיאצו, חל שיפור משמעותי במצבי. הצוות מקצועי, אכפתי והאווירה בקליניקה מרגיעה ונעימה. ממליצה בחום!',
            rating: 5
        },
        {
            name: 'דוד לוי',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            text: 'סבלתי מחרדות ובעיות שינה במשך שנים. הטיפול בפרחי באך שקיבלתי בקליניקה עזר לי להירגע ולישון טוב יותר. המטפלים מקשיבים באמת ומתאימים את הטיפול באופן אישי. תודה רבה!',
            rating: 5
        },
        {
            name: 'מיכל אברהם',
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
            text: 'הטיפולים ברפלקסולוגיה שיפרו משמעותית את איכות החיים שלי. הקליניקה נקייה ומזמינה, והצוות מקצועי ואדיב. אני מגיעה באופן קבוע כבר שנתיים ורואה שיפור משמעותי בבריאות הכללית שלי.',
            rating: 4
        }
    ];

     // שאלות נפוצות
    const faqs = [
        {
            question: 'האם הטיפולים מתאימים לכל גיל?',
            answer: 'כן, הטיפולים שלנו מותאמים לכל הגילאים, מילדים ועד מבוגרים. כמובן שהטיפול מותאם באופן אישי לכל מטופל בהתאם לגילו, מצבו הבריאותי וצרכיו הספציפיים.'
        },
        {
            question: 'כמה טיפולים נדרשים בדרך כלל?',
            answer: 'מספר הטיפולים הנדרש משתנה בהתאם לסוג הבעיה, חומרתה ומשך הזמן שהיא קיימת. בפגישת הייעוץ הראשונית נוכל להעריך את מספר הטיפולים המומלץ במקרה שלך.'
        },
        {
            question: 'האם יש תופעות לוואי לטיפולים?',
            answer: 'הטיפולים הטבעיים שלנו בטוחים בדרך כלל ובעלי תופעות לוואי מינימליות. לעתים ייתכנו תגובות קלות כמו עייפות או רגישות באזור הטיפול, אך אלו חולפות במהרה ומהוות חלק מתהליך הריפוי.'
        },
        {
            question: 'האם הטיפולים מכוסים על ידי ביטוחי בריאות?',
            answer: 'חלק מהטיפולים שלנו מכוסים על ידי ביטוחי בריאות משלימים של קופות החולים וחברות ביטוח פרטיות. מומלץ לבדוק את הזכאות שלך מול חברת הביטוח טרם הטיפול.'
        }
    ];

    // מטפלים
    const therapists = [
        {
            name: 'ד"ר רונית שמיר',
            specialty: 'רפואה סינית ודיקור',
            experience: '15 שנות ניסיון',
            image: 'https://randomuser.me/api/portraits/women/28.jpg',
            description: 'בעלת תואר דוקטור ברפואה סינית מסורתית. מתמחה בטיפול בכאבים כרוניים, בעיות פוריות ומחלות אוטואימוניות.'
        },
        {
            name: 'יוסי כהן',
            specialty: 'רפלקסולוגיה ושיאצו',
            experience: '10 שנות ניסיון',
            image: 'https://randomuser.me/api/portraits/men/42.jpg',
            description: 'בוגר המכללה לרפואה משלימה ובעל תעודות הסמכה בינלאומיות. מתמחה בטיפול בבעיות שינה, מתח וחרדה.'
        },
        {
            name: 'מיכל לוי',
            specialty: 'פרחי באך וארומתרפיה',
            experience: '8 שנות ניסיון',
            image: 'https://randomuser.me/api/portraits/women/63.jpg',
            description: 'מטפלת מוסמכת בפרחי באך וארומתרפיה. מתמחה בטיפול במצבי לחץ, חרדה ובעיות רגשיות.'
        }
    ];


    return (
        <Box className="home-container" sx={{ direction: 'rtl', backgroundColor: '#f9f3e6' }}>
            {/* Header Banner */}
            <Box id="home" sx={{
                backgroundImage: 'linear-gradient(rgba(44, 85, 48, 0.7), rgba(44, 85, 48, 0.7)), url("/images/טיפול-טבעי-בחרדה_1732450075867-930x620.webp")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
            }}>
                <Box sx={{ maxWidth: '800px', padding: '0 20px' }}>
                    <Typography variant="h2" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                        הקליניקה לרפואה משלימה
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: '30px' }}>
                        דרך טבעית לאיזון, ריפוי והתחדשות
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', marginBottom: '30px' }}>
                        בקליניקה שלנו, אנו משלבים שיטות טיפול עתיקות עם גישות מודרניות כדי להעניק לכם את הטיפול המיטבי והמותאם אישית לצרכים שלכם.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate('/Contact')
                            scrollToSection('contact')}}
                        sx={{
                            backgroundColor: '#d8c3a5',
                            color: '#2c5530',
                            borderRadius: '30px',
                            padding: '12px 30px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#a68a64',
                                color: 'white'
                            }
                        }}
                    >
                        צור קשר
                    </Button>
                </Box>
            </Box>

            {/* Navigation Toolbar */}
            <AppBar position="sticky" sx={{
                backgroundColor: '#d8c3a5',////////////
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}>
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 30px'
                }}>
                    <Typography variant="h6" sx={{ color: '#4a7c59', fontWeight: 'bold' }}>
                        הקליניקה לרפואה משלימה
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '25px' }}>
                        {navItems.map((item, index) => (
                            <Button
                                key={index}
                                onClick={() => scrollToSection(navNavigate[index])}

                                sx={{
                                    color: '#2c5530',
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
                    <Button
                        variant="contained"
                        onClick={() => setShow(0)} // שימוש ב-setShow(0) כי LogIn הוא האיבר הראשון במערך navNavigate
                        sx={{
                            backgroundColor: '#4a7c59',
                            color: 'white',
                            borderRadius: '20px',
                            padding: '8px 20px',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#2c5530'
                            }
                        }}
                    >
                        כניסה למטופלים
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Welcome Section */}

            <Container id="about" sx={{
                padding: '80px 30px',
                backgroundColor: '#f9f3e6'
            }}>
                {show >= 0 ? (
                    <Box sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 1200,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Box sx={{
                            backgroundColor: '#f9f3e6',
                            borderRadius: '10px',
                            padding: '30px',
                            maxWidth: '500px',
                            width: '90%',
                            position: 'relative',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
                        }}>
                            <Box
                                onClick={() => setShow(-1)}
                                sx={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    cursor: 'pointer',
                                    fontSize: '24px',
                                    color: '#4a7c59',
                                    zIndex: 1
                                }}
                            >
                                ✕
                            </Box>
                            {show === 0 && <LogIn onClose={() => setShow(-1)} />}
                            {/* אפשר להוסיף כאן עוד קומפוננטות בהתאם לערך של show */}
                        </Box>
                    </Box>
                ) :

                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h3" sx={{ color: '#4a7c59', marginBottom: '20px', fontWeight: 'bold' }}>
                                ברוכים הבאים לקליניקה שלנו
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '20px' }}>
                                הקליניקה לרפואה משלימה הוקמה מתוך אמונה בכוח הריפוי הטבעי של הגוף ובחשיבות הטיפול ההוליסטי.
                                אנו מאמינים שכל אדם הוא ייחודי, ולכן כל טיפול מותאם אישית לצרכים הספציפיים של המטופל.
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px' }}>
                                הצוות המקצועי שלנו, בעל ניסיון רב בתחומי הרפואה המשלימה השונים, מחויב להעניק לכם את הטיפול האיכותי ביותר
                                באווירה חמה, מקבלת ומרגיעה. אנו כאן כדי ללוות אתכם בדרך לאיזון, בריאות ורווחה.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '15px' }}>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/About')}
                                    sx={{
                                        backgroundColor: '#4a7c59',
                                        color: 'white',
                                        borderRadius: '20px',
                                        padding: '10px 25px',
                                        '&:hover': {
                                            backgroundColor: '#2c5530'
                                        }
                                    }}
                                >
                                    קרא עוד עלינו
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => navigate('/Contact')}
                                    sx={{
                                        color: '#4a7c59',
                                        borderColor: '#4a7c59',
                                        borderRadius: '20px',
                                        padding: '10px 25px',
                                        '&:hover': {
                                            borderColor: '#2c5530',
                                            backgroundColor: 'rgba(74, 124, 89, 0.1)'
                                        }
                                    }}
                                >
                                    צור קשר
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src='/images/טיפול-טבעי-בחרדה_1732450075867-930x620.webp'
                                alt="הקליניקה שלנו"
                                sx={{
                                    width: '100%',
                                    borderRadius: '10px',
                                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                        </Grid>
                    </Grid>
                }
            </Container>

            {/* Promotional Banner */}
            <Box sx={{
                backgroundColor: '#d8c3a5',
                padding: '40px 30px',
                textAlign: 'center'
            }}>
                <Container>
                    <Typography variant="h4" sx={{ color: '#2c5530', marginBottom: '20px', fontWeight: 'bold' }}>
                        מבצע מיוחד לחודש זה!
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#2c5530', marginBottom: '30px' }}>
                        15% הנחה על סדרת טיפולים של 5 מפגשים | ייעוץ ראשוני ללא עלות למצטרפים חדשים
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => scrollToSection('contact')}
                        sx={{
                            backgroundColor: '#d8c3a5',
                            color: '#2c5530',
                            borderRadius: '30px',
                            padding: '12px 30px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#a68a64',
                                color: 'white'
                            }
                        }}
                    >
                        צור קשר
                    </Button>

                </Container>
            </Box>

            {/* Treatments Section */}
            <Box id="treatments" sx={{
                padding: '80px 30px',
                backgroundColor: '#f5efe0'
            }}>
                <Container>
                    <Box sx={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Typography variant="h3" sx={{ color: '#4a7c59', marginBottom: '20px', fontWeight: 'bold' }}>
                            הטיפולים שלנו
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                            אנו מציעים מגוון רחב של טיפולים טבעיים, המותאמים אישית לצרכים הייחודיים של כל מטופל.
                            כל הטיפולים מתבצעים על ידי מטפלים מוסמכים ומנוסים, באווירה מרגיעה ונעימה.
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {treatments.map((treatment, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-10px)'
                                    }
                                }}>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={treatment.image}
                                        alt={treatment.name}
                                    />
                                    <CardContent sx={{ flexGrow: 1, padding: '30px' }}>
                                        <Typography variant="h4" sx={{ color: '#4a7c59', marginBottom: '15px', fontWeight: 'bold' }}>
                                            {treatment.name}
                                        </Typography>
                                        <Typography variant="body1" sx={{ marginBottom: '20px', lineHeight: 1.8 }}>
                                            {treatment.description}
                                        </Typography>
                                        <Typography variant="h6" sx={{ color: '#4a7c59', marginBottom: '10px' }}>
                                            יתרונות:
                                        </Typography>
                                        <List>
                                            {treatment.benefits.map((benefit, i) => (
                                                <ListItem key={i} sx={{ padding: '5px 0' }}>
                                                    <ListItemIcon sx={{ minWidth: '40px' }}>
                                                        <CheckCircleIcon sx={{ color: '#8fb996' }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={benefit} />
                                                </ListItem>
                                            ))}
                                        </List>
                                        <Button
                                            variant="outlined"
                                            onClick={() => navigate('/Contact')}
                                            sx={{
                                                color: '#4a7c59',
                                                borderColor: '#4a7c59',
                                                borderRadius: '20px',
                                                padding: '10px 25px',
                                                marginTop: '20px',
                                                '&:hover': {
                                                    borderColor: '#2c5530',
                                                    backgroundColor: 'rgba(74, 124, 89, 0.1)'
                                                }
                                            }}
                                        >
                                            מידע נוסף
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Therapists Section */}
            <Box sx={{
                padding: '60px 30px',
                backgroundColor: '#a68a64',
                color: 'white',
                textAlign: 'center'
            }}>
                <Typography variant="h4" sx={{ marginBottom: '40px' }}>
                    למה לבחור בנו?
                </Typography>
                <Container>
                    <Grid container spacing={4} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{
                                padding: '30px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px'
                            }}>
                                <Typography variant="h1" sx={{ marginBottom: '15px' }}>🌿</Typography>
                                <Typography variant="h5" sx={{ marginBottom: '15px' }}>
                                    גישה הוליסטית
                                </Typography>
                                <Typography variant="body1">
                                    טיפול מקיף המתייחס לכל היבטי הבריאות הפיזית והנפשית
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{///////////////
                                padding: '30px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px'
                            }}>
                                <Typography variant="h1" sx={{ marginBottom: '15px' }}>
                                    🛌
                                </Typography>
                                <Typography variant="h5" sx={{ marginBottom: '15px' }}>
                                    אווירה מרגיעה
                                </Typography>
                                <Typography variant="body1">
                                    סביבה חמימה ומפנקת המאפשרת הרפיה מלאה בזמן הטיפול
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box sx={{
                                padding: '30px',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                borderRadius: '10px'
                            }}>
                                <Typography variant="h1" sx={{ marginBottom: '15px' }}>👩‍⚕️</Typography>
                                <Typography variant="h5" sx={{ marginBottom: '15px' }}>
                                    צוות מקצועי
                                </Typography>
                                <Typography variant="body1">
                                    מטפלים מוסמכים עם ניסיון רב בתחומי הרפואה המשלימה
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials Section */}
            <Box id="therapists" sx={{
                //backgroundColor: '#8fb996',
                backgroundColor: '#d8c3a5',
                padding: '80px 30px'
            }}>
                <Container>
                    <Box sx={{ textAlign: 'center', marginBottom: '60px' }}>
                        <Typography variant="h3" sx={{ color: 'white', marginBottom: '20px', fontWeight: 'bold' }}>
                            מה אומרים עלינו
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto', color: 'white' }}>
                            המטופלים שלנו הם העדות הטובה ביותר לאיכות הטיפולים והשירות שאנו מעניקים
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Paper sx={{
                                    padding: '30px',
                                    borderRadius: '10px',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    backgroundColor: '#f9f3e6',
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '30px',
                                        left: '30px',
                                        width: '40px',
                                        height: '40px',
                                        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%238fb996\' width=\'40px\' height=\'40px\'%3E%3Cpath d=\'M0 0h24v24H0z\' fill=\'none\'/%3E%3Cpath d=\'M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z\'/%3E%3C/svg%3E")',
                                        backgroundRepeat: 'no-repeat',
                                        opacity: 0.2,
                                        zIndex: 0
                                    }
                                }}>
                                    <Typography variant="body1" sx={{
                                        marginBottom: '20px',
                                        position: 'relative',
                                        zIndex: 1,
                                        lineHeight: 1.8,
                                        flex: 1
                                    }}>
                                        "{testimonial.text}"
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            sx={{ marginRight: '15px' }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                {testimonial.name}
                                            </Typography>
                                            <Rating
                                                value={testimonial.rating}
                                                readOnly
                                                size="small"
                                                sx={{ color: '#4a7c59' }}
                                            />
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* FAQ Section */}
            <Container sx={{ padding: '80px 30px', backgroundColor: '#f9f3e6' }}>
                <Box sx={{ textAlign: 'center', marginBottom: '60px' }}>
                    <Typography variant="h3" sx={{ color: '#4a7c59', marginBottom: '20px', fontWeight: 'bold' }}>
                        שאלות נפוצות
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                        מצאו תשובות לשאלות הנפוצות ביותר על הטיפולים והשירותים שלנו
                    </Typography>
                </Box>

                <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
                    {faqs.map((faq, index) => (
                        <Accordion
                            key={index}
                            sx={{
                                marginBottom: '15px',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                '&::before': {
                                    display: 'none'
                                },
                                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: '#4a7c59' }} />}
                                sx={{
                                    backgroundColor: '#f5efe0', // שינוי מ-#f8f8f8 לקרם
                                    '&:hover': {
                                        backgroundColor: '#efe5d5' // שינוי מ-#f0f0f0 לקרם כהה יותר
                                    }
                                }}
                            >
                                <Typography variant="h6" sx={{ color: '#2c5530', fontWeight: 'bold' }}>
                                    {faq.question}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ padding: '20px 30px' }}>
                                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                    {faq.answer}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Container>

            {/* Contact CTA Section */}
            <Box id="contact" sx={{
                backgroundImage: 'linear-gradient(rgba(44, 85, 48, 0.9), rgba(44, 85, 48, 0.9)), url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '80px 30px',
                textAlign: 'center',
                color: 'white'
            }}>
                <Container>
                    <Typography variant="h3" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                        צרו איתנו קשר
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto 40px' }}>
                        אנחנו כאן כדי לענות על כל שאלה ולעזור לכם להתחיל את המסע לבריאות טובה יותר.
                        השאירו פרטים ונחזור אליכם בהקדם.
                    </Typography>

                    <Box sx={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        backgroundColor: '#f9f3e6',
                        //backgroundColor: '#8fb996',
                        padding: '40px',
                        borderRadius: '10px',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
                    }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="שם מלא"
                                    variant="outlined"
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="טלפון"
                                    variant="outlined"
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
                                    label="אימייל"
                                    variant="outlined"
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
                                    label="הודעה"
                                    multiline
                                    rows={4}
                                    variant="outlined"
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
                                <Button
                                    fullWidth
                                    variant="contained"
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
                                    שלח הודעה
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{
                backgroundColor: '#2c5530',
                color: 'white',
                padding: '60px 30px 30px'
            }}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                                הקליניקה לרפואה משלימה
                            </Typography>
                            <Typography variant="body1" sx={{ marginBottom: '20px', lineHeight: 1.8 }}>
                                אנו מחויבים לספק טיפולים איכותיים ומקצועיים, המותאמים אישית לצרכים הייחודיים של כל מטופל.
                                הצטרפו אלינו למסע לבריאות טובה יותר.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: '15px' }}>
                                {/* Social Media Icons */}
                                <Box sx={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#8fb996'
                                    }
                                }}>
                                    <Typography variant="body1">f</Typography>
                                </Box>
                                <Box sx={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#8fb996'
                                    }
                                }}>
                                    <Typography variant="body1">i</Typography>
                                </Box>
                                <Box sx={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#8fb996'
                                    }
                                }}>
                                    <Typography variant="body1">w</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                                צרו קשר
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <LocationOnIcon sx={{ marginLeft: '10px', color: '#8fb996' }} />
                                <Typography variant="body1">
                                    רחוב הבריאות 10, תל אביב
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <LocalPhoneIcon sx={{ marginLeft: '10px', color: '#8fb996' }} />
                                <Typography variant="body1">
                                    050-1234567
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                <EmailIcon sx={{ marginLeft: '10px', color: '#8fb996' }} />
                                <Typography variant="body1">
                                    info@natural-clinic.co.il
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccessTimeIcon sx={{ marginLeft: '10px', color: '#8fb996' }} />
                                <Box>
                                    <Typography variant="body1">
                                        ימים א'-ה': 09:00-20:00
                                    </Typography>
                                    <Typography variant="body1">
                                        יום ו': 09:00-14:00
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
                                קישורים מהירים
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {navItems.map((item, index) => (
                                    <Box
                                        key={index}
                                        onClick={() => navigate(navNavigate[index])}
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                color: '#8fb996'
                                            }
                                        }}
                                    >
                                        <Typography variant="body1">
                                            {item}
                                        </Typography>
                                    </Box>
                                ))}
                                <Box
                                    onClick={() => setShow(0)}
                                    sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: '#8fb996'
                                        }
                                    }}
                                >
                                    <Typography variant="body1">
                                        כניסה למטופלים
                                    </Typography>
                                </Box>

                            </Box>
                        </Grid>
                    </Grid>
                    <Divider sx={{
                        margin: '40px 0 20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }} />
                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        © 2023 הקליניקה לרפואה משלימה. כל הזכויות שמורות.
                    </Typography>
                </Container>
            </Box>

            {/* Back to top button */}
            <Box
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                sx={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#4a7c59',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                    zIndex: 999,
                    '&:hover': {
                        backgroundColor: '#2c5530'
                    }
                }}
            >
                ↑
            </Box>
        </Box>
    );
};
