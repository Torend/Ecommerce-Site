import './style.css';
import React, { useState } from 'react';
import { AiOutlineFacebook } from 'react-icons/ai';
import { AiOutlineInstagram } from 'react-icons/ai';
import { AiOutlineLinkedin } from 'react-icons/ai';

function Footer() {
  const [details, setDetails] = useState({
    name: '',
    email: '',
    complaint: '',
  });
  const [message, setMessage] = useState('');

  const submitForm = () => {
    const endpoint =
      'https://ikz51k5pv4.execute-api.eu-central-1.amazonaws.com/default/sendContactEmail';
    // We use JSON.stringify here so the data can be sent as a string via HTTP
    const body = JSON.stringify({
      senderName: details.name,
      senderEmail: details.email,
      message: details.complaint,
    });
    const requestOptions = {
      method: 'POST',
      body,
    };

    fetch(endpoint, requestOptions)
      .then((response) => {
        if (!response.ok) throw new Error('Error in fetch');
        return response.json();
      })
      .then((response) => {
        setMessage('פנייתך התקבלה, נחזור אלייך בהקדם האפשרי');
        // console.log('Email sent successfully!');
      })
      .catch((error) => {
        setMessage('אירע שגיאה נסה שנית מאוחר יותר');
        console.log('An unknown error occurred.', error);
      });
  };

  const handleChange = (value) => {
    setDetails({ ...details, [value.target.name]: value.target.value });
  };
  return (
    <footer className="black-section container">
      <div className="footer-right-contain">
        <div className="contact-contain">
          <h2 className="contact-title">צרו קשר</h2>
          <p className="contact-info">
            תשאירו פרטים בטופס ואחד מהנציגים שלנו יחזור אליכם בהקדם האפשרי.
          </p>
        </div>
        <div className="call-contain">
          <h2 className="call-title">או שאתם יכולים</h2>
          <p className="call-info">
            להתקשר אלינו למספר 03-6721124
            <br />
            ראשון עד חמישי 9:30 - 19:00
            <br />
            שישי 9:30 - 15:00
            <br />
            שבת 16:00 עד 23:00
          </p>
        </div>
      </div>
      <div className="footer-middle-contain">
        {message ? (
          <h2>{message}</h2>
        ) : (
          <div className="contact-form">
            <div className="contact-form-col">
              <div className="contact-form-field">
                <label htmlFor="name">שם מלא</label>
                <input type="text" name="name" onChange={handleChange} />
              </div>
              <div className="contact-form-field">
                <label htmlFor="email">אימייל</label>
                <input type="email" name="email" onChange={handleChange} />
              </div>
            </div>
            <label htmlFor="complaint">סיבת פניה</label>
            <textarea
              name="complaint"
              id=""
              cols=""
              rows=""
              onChange={handleChange}
            ></textarea>
            <button onClick={submitForm}>השאר פרטים</button>
          </div>
        )}
      </div>
      <div className="footer-left-contain">
        <div className="social-legal-contain">
          <div className="social-contain">
            <h2 className="social-title">תעקבו אחרינו</h2>
            <div className="social-icon-list">
              <a href="">
                <AiOutlineFacebook />
              </a>
              <a href="">
                <AiOutlineInstagram />
              </a>
              <a href="">
                <AiOutlineLinkedin />
              </a>
            </div>
          </div>
          <div className="legal-contain">
            <h2 className="legal-title">מידע משפטי</h2>
            <a href="" className="legal-link">
              מדיניות פריטיות
            </a>
            <a href="" className="legal-link">
              תשלום מאובטח
            </a>
            <a href="" className="legal-link">
              אחריות מוצרים
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
