import React, { useState, useEffect } from 'react';
import { relationshipStartDate } from '@/lib/data';

const TimeCounter: React.FC = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = now.getTime() - relationshipStartDate.getTime();
      
      // Convert time difference to days, hours, minutes, seconds
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };
    
    // Calculate initially
    calculateTime();
    
    // Update every second
    const interval = setInterval(calculateTime, 1000);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="love-card animate-fade-in mb-8">
      <h2 className="section-title">Nossa História Juntos Começou Em</h2>
      <div className="flex justify-center items-center space-x-2 md:space-x-4 text-center">
        <TimeUnit value={timeElapsed.days} label="Dias" />
        <TimeUnit value={timeElapsed.hours} label="Horas" />
        <TimeUnit value={timeElapsed.minutes} label="Minutos" />
        <TimeUnit value={timeElapsed.seconds} label="Segundos" />
      </div>
    </div>
  );
};

interface TimeUnitProps {
  value: number;
  label: string;
  className?: string;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label, className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="bg-love-100 rounded-lg w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-1 shadow-sm border border-love-200">
        <span className="text-xl sm:text-2xl font-bold text-love-700">{value}</span>
      </div>
      <span className="text-xs text-love-600 font-medium">{label}</span>
    </div>
  );
};

export default TimeCounter;
