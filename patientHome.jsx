import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './patientHome.css';

const PatientHome = () => {
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    // כאן יהיה קוד לטעינת שם המשתמש מהמערכת
    const fetchUserData = async () => {
      try {
        // במקום זה יהיה קריאת API אמיתית
        setUserName('אורח');
      } catch (error) {
        console.error('שגיאה בטעינת נתוני משתמש:', error);
      }
    };
    
    fetchUserData();
  }, []);

  const treatments = [
    {
      id: 1,
      name: 'רפלקסולוגיה',
      description: 'טיפול המבוסס על עיסוי כפות הרגליים לשיפור הבריאות הכללית',
      icon: 'foot-massage.png'
    },
    {
      id: 2,
      name: 'אבחון ביקום',
      description: 'אבחון מתקדם באמצעות מכשיר ביקום לזיהוי חוסרים וליקויים',
      icon: 'bicom.png'
    },
    {
      id: 3,
      name: 'פרחי באך',
      description: 'טיפול טבעי באמצעות תמציות פרחים לאיזון רגשי ונפשי',
      icon: 'bach-flowers.png'
    },
    {
      id: 4,
      name: 'טיפול SE להתמכרויות',
      description: 'שיטה ייחודית לטיפול בטראומה והתמכרויות',
      icon: 'therapy.png'
    },
    {
      id: 5,
      name: 'טיפול באוזון',
      description: 'טיפול חמצן מועשר לחיזוק המערכת החיסונית וניקוי רעלים',
      icon: 'ozone.png'
    },
    {
      id: 6,
      name: 'דיאטה לניקוי הגוף',
      description: 'תוכנית תזונה ייחודית לניקוי רעלים וחידוש אנרגיה',
      icon: 'diet.png'
    }
  ];

  return (
    <div className="patient-home">
      <header className="home-header">
        <div className="header-overlay">
          <h1>ברוכים הבאים לקליניקת הבריאות המשלימה</h1>
          <p>מקום של ריפוי, איזון והתחדשות</p>
          <button className="appointment-btn">קביעת תור</button>
        </div>
      </header>

      <section className="welcome-section">
        <div className="container">
          <h2>שלום {userName}</h2>
          <p>
            ברוכים הבאים לקליניקה שלנו, מקום בו תוכלו למצוא מגוון רחב של טיפולים משלימים
            באווירה חמימה ומפנקת. אנו מאמינים בגישה הוליסטית לבריאות ומציעים פתרונות מותאמים אישית
            לכל מטופל ומטופלת.
          </p>
        </div>
      </section>

      <section className="treatments-section">
        <div className="container">
          <h2>הטיפולים שלנו</h2>
          <div className="treatments-grid">
            {treatments.map(treatment => (
              <div className="treatment-card" key={treatment.id}>
                <div className="treatment-icon">
                  <img src={`/images/${treatment.icon}`} alt={treatment.name} />
                </div>
                <h3>{treatment.name}</h3>
                <p>{treatment.description}</p>
                <Link to={`/treatments/${treatment.id}`} className="learn-more">
                  למידע נוסף
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>על הקליניקה</h2>
              <p>
                הקליניקה שלנו מציעה מגוון רחב של טיפולים ברפואה משלימה, באווירה חמימה ומפנקת.
                אנו מתמחים במגוון תחומים כגון רפלקסולוגיה, אבחון באמצעות מכשיר ביקום, פרחי באך,
                טיפולים רגשיים, טיפול בהתמכרויות בשיטת SE, טיפולי אוזון ותוכניות תזונה לניקוי הגוף.
              </p>
              <p>
                הצוות המקצועי שלנו מחויב להעניק לכם את הטיפול האיכותי ביותר, תוך התאמה אישית
                לצרכים הייחודיים של כל מטופל.
              </p>
            </div>
            <div className="about-image">
              <img src="/images/clinic.jpg" alt="הקליניקה שלנו" />
            </div>
          </div>
        </div>
      </section>

      <section className="appointment-section">
        <div className="container">
          <h2>קביעת תור</h2>
          <p>
            אנו מזמינים אתכם לקבוע תור לאחד מהטיפולים שלנו.
            ניתן לקבוע תור באמצעות המערכת המקוונת או ליצור קשר טלפוני.
          </p>
          <div className="appointment-buttons">
            <Link to="/appointments" className="btn primary-btn">
              קביעת תור מקוון
            </Link>
            <a href="tel:+972501234567" className="btn secondary-btn">
              התקשרו אלינו
            </a>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <h2>מה אומרים עלינו</h2>
          <div className="testimonials-slider">
            <div className="testimonial">
              <p>
                "הטיפולים בקליניקה שינו את חיי. הדיאטה לניקוי הגוף העניקה לי אנרגיה מחודשת
                ותחושת רעננות שלא הכרתי שנים."
              </p>
              <div className="testimonial-author">- מיכל, 42</div>
            </div>
            <div className="testimonial">
              <p>
                "טיפולי הרפלקסולוגיה עזרו לי להתמודד עם כאבי גב כרוניים. האווירה בקליניקה
                נעימה ומרגיעה, והצוות מקצועי ואכפתי."
              </p>
              <div className="testimonial-author">- דוד, 55</div>
            </div>
            <div className="testimonial">
              <p>
                "הטיפול בשיטת SE עזר לי להתגבר על חרדות שליוו אותי שנים. אני אסירת תודה
                על הליווי המקצועי והתמיכה לאורך כל הדרך."
              </p>
              <div className="testimonial-author">- רונית, 38</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h3>שעות פעילות</h3>
              <p>ימים א'-ה': 09:00-20:00</p>
              <p>יום ו': 09:00-14:00</p>
              <p>שבת: סגור</p>
            </div>
            <div className="footer-info">
              <h3>צרו קשר</h3>
              <p>טלפון: 050-1234567</p>
              <p>דוא"ל: info@holistic-clinic.co.il</p>
              <p>כתובת: רחוב הבריאות 10, תל אביב</p>
            </div>
            <div className="footer-social">
              <h3>עקבו אחרינו</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2023 הקליניקה לרפואה משלימה. כל הזכויות שמורות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PatientHome;