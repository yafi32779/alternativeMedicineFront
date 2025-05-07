import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EmpDay } from '../empDay/empDay';
import { useEffect } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { getTurnByDateAndAvailableTurns } from '../../../redux/getData/getTurnByDateAndAvailableturns';

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

const CalendarContainer = styled(Paper)(({ theme }) => ({
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  backgroundColor: 'white',
  border: `1px solid ${colors.light}`
}));

const DayHeader = styled(Box)(({ theme }) => ({
  backgroundColor: colors.primary,
  color: 'white',
  padding: '8px',
  textAlign: 'center',
  fontWeight: 'bold',
  borderRadius: '4px',
  fontSize: '0.85rem'
}));

const DayCell = styled(Box)(({ theme, istoday, hasappointments }) => ({
  border: istoday ? `2px solid ${colors.secondary}` : `1px solid ${colors.light}`,
  padding: '6px',
  height: '70px',
  textAlign: 'center',
  borderRadius: '4px',
  backgroundColor: istoday ? colors.light : 'white',
  position: 'relative',
  cursor: hasappointments ? 'pointer' : 'default',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: hasappointments ? '#f5f5f5' : istoday ? colors.light : 'white',
    boxShadow: hasappointments ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'
  }
}));

const DayNumber = styled(Typography)(({ theme, istoday }) => ({
  position: 'absolute',
  top: '4px',
  right: '6px',
  fontSize: '0.85rem',
  fontWeight: istoday ? 'bold' : 'normal',
  color: istoday ? colors.primary : colors.textLight
}));

const AppointmentButton = styled(Button)(({ theme }) => ({
  fontSize: '0.7rem',
  padding: '3px 8px',
  minWidth: 'unset',
  borderRadius: '12px',
  backgroundColor: colors.primary,
  color: 'white',
  position: 'absolute',
  bottom: '5px',
  left: '50%',
  transform: 'translateX(-50%)',
  '&:hover': {
    backgroundColor: colors.dark
  }
}));

const AppointmentCount = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: '25px',
  left: '50%',
  transform: 'translateX(-50%)',
  height: '20px',
  fontSize: '0.7rem',
  backgroundColor: colors.secondary,
  color: 'white',
  fontWeight: 'bold'
}));

const CancelledCount = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: '48px',
  left: '50%',
  transform: 'translateX(-50%)',
  height: '20px',
  fontSize: '0.7rem',
  backgroundColor: '#f44336',
  color: 'white',
  fontWeight: 'bold'
}));

const MonthTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: colors.primary,
  fontWeight: 'bold',
  marginBottom: '15px',
  fontSize: '1.2rem'
}));

const MonthEmp = ({ currentDate, turns, treat }) => {
  debugger;
  const [dateOfDay, setDateOfDay] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [nameOfDay, setNameOfDay] = useState("");

  const weekDayNames = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
  const fullWeekDayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  const dataOfDate = useSelector(state => state.AvailebleTurnsAndTurnsSlice.availableTurnsAndTurns);
  const currentEmployee = useSelector(state => state.employeeSlice.currentEmployee);
 const dispatc = useDispatch();
  // וידוא שהדיאלוג נסגר כראוי בטעינה הראשונית
  useEffect(() => {
    setOpen(false);
  }, []);

const handleClickOpen = (date, day) => {
    // setDateOfDay(date);
    // const dayOfWeek = date.getDay();
    // setNameOfDay(fullWeekDayNames[dayOfWeek]);
    
    // טען את הנתונים לפני פתיחת הדיאלוג
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day2 = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day2}`;
    
    let theEmpId = currentEmployee.id; // וודאי שזה מוגדר נכון
    let length = 15;
    
    dispatc(getTurnByDateAndAvailableTurns({theEmpId, date: formattedDate, length}))
        .then(() => {
            // רק אחרי שהנתונים נטענו, פתח את הדיאלוג
            setOpen(true);
        });
};

  const renderMonthDays = () => {
    // Get the first day of the month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayWeekday = firstDayOfMonth.getDay();

    // Calculate the number of days in the month
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    // Create calendar cells array
    const calendarCells = [];

    // Add weekday headers
    weekDayNames.forEach(day => {
      calendarCells.push(
        <DayHeader key={`header-${day}`}>
          {day}
        </DayHeader>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      calendarCells.push(
        <Box key={`empty-${i}`} sx={{
          padding: "6px",
          borderRadius: '4px',
          backgroundColor: 'transparent'
        }}></Box>
      );
    }

    // Add cells for each day of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

      // כל התורים ליום זה
      const dayAppointments = turns.filter(turn => {
        const turnDate = new Date(turn.date);
        return date.getDate() === turnDate.getDate() && 
               date.getMonth() === turnDate.getMonth() && 
               date.getFullYear() === turnDate.getFullYear();
      });
      
      // תורים מבוטלים
      const cancelledAppointments = dayAppointments.filter(turn => 
        turn.employeeId === -1
      );
      
      // תורים פעילים
      const activeAppointments = dayAppointments.filter(turn => 
        turn.employeeId !== -1
      );
      
      const hasAppointments = dayAppointments.length > 0;
      console.log(`Day ${day} has ${dayAppointments.length} appointments`);
      

      calendarCells.push(
        <DayCell 
  key={`day-${day}`} 
  istoday={isToday ? 1 : 0}
  hasappointments={hasAppointments ? 1 : 0}
  onClick={() => {
    console.log("DayCell clicked", { day, hasAppointments });
    // if (hasAppointments) {
      handleClickOpen(date, day);
    // }
  }}
>
{/* <DayCell 
  key={`day-${day}`} 
  istoday={isToday ? 1 : 0}
  hasappointments={hasAppointments ? 1 : 0}
  onClick={() => handleClickOpen(date, day)}
> */}

          <DayNumber istoday={isToday ? 1 : 0}>
            {day}
          </DayNumber>
          
          {activeAppointments.length > 0 && (
            <AppointmentCount 
              label={`${activeAppointments.length} תורים`}
              size="small"
            />
          )}
          
          {cancelledAppointments.length > 0 && (
            <CancelledCount 
              label={`${cancelledAppointments.length} מבוטלים`}
              size="small"
            />
          )}
          
          {hasAppointments && (
            <AppointmentButton 
              size="small"
              onClick={(e) => {
                e.stopPropagation(); // מניעת הפעלה כפולה
                handleClickOpen(date, day);
              }}
            >
              צפייה
            </AppointmentButton>
          )}
        </DayCell>
      );
    }

    return (
      <Box sx={{
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: "3px"
      }}>
        {calendarCells}
      </Box>
    );
  };

  const monthNames = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];

  return (
    <CalendarContainer>
      <MonthTitle>
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </MonthTitle>
      
      {renderMonthDays()}

      {/* וידוא שכל הפרופס מועברים כראוי */}
      <EmpDay 
    dateOfDay={dateOfDay} 
    treat={treat} 
    open={open} 
    setOpen={setOpen} 
    nameOfDay={nameOfDay}
/>  
    </CalendarContainer>
  );
};

export default MonthEmp;
