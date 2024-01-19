import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './calendar.module.css';

const CalendarView = ({ data }) => {
  const [date, setDate] = useState(new Date());

  const getDateStatusColor = (date) => {
    const matchingDate = data.find((item) => new Date(item.date).toDateString() === date.toDateString());
    return matchingDate ? getStatusColor(matchingDate.status) : null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return styles.good;
      case 'late':
        return styles.late;
      case 'absent':
        return styles.absent;
      default:
        return null;
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const color = getDateStatusColor(date);
      return color;
    }
    return null;
  };

  return (
    <div className={styles.calendarContainer}>
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CalendarView;
