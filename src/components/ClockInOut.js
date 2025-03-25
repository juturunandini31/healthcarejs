import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClockInOut = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleClockAction = async (action) => {
    if (!employeeId) {
      toast.error('Please enter Employee ID');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/clock/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `${action} failed`);
      }

      toast.success(`Clock ${action} successful!`);
      setEmployeeId(''); // Clear input after success

    } catch (error) {
      toast.error(error.message || `${action} failed`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="clock-container">
      <h2>Employee Time Clock</h2>
      <input
        type="text"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        placeholder="Employee ID"
        required
      />
      <div className="button-group">
        <button 
          onClick={() => handleClockAction('in')}
          disabled={isLoading}
          className="clock-in-btn"
        >
          {isLoading ? 'Processing...' : 'Clock In'}
        </button>
        <button
          onClick={() => handleClockAction('out')}
          disabled={isLoading}
          className="clock-out-btn"
        >
          {isLoading ? 'Processing...' : 'Clock Out'}
        </button>
      </div>
    </div>
  );
};

export default ClockInOut;