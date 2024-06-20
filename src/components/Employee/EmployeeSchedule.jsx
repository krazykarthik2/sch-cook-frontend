import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import employee from '../../utils/employee';

const EmployeeSchedule = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await employee.schedule.get(id)
        setSchedule(response.data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };
    fetchSchedule();
  }, [id]);

  return (
    <div>
      <h2>Employee Schedule</h2>
      <pre>{JSON.stringify(schedule, null, 2)}</pre>
    </div>
  );
};

export default EmployeeSchedule;
