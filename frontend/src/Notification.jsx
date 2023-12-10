import React from 'react';
import fanen from './assets/fanen.jpg';
import './Notification.css'; // Assuming you'll add your CSS here

function Notification({ isFinished }) {
  return (
    <div className="notification-container">
      {isFinished && (
        <>
          <img src={fanen} alt="Fanen" className="bouncing-image rounded-image" />
          <p className='mt-2'>Congrats my children, you escaped hell!</p>
        </>
      )}
    </div>
  );
}

export default Notification;