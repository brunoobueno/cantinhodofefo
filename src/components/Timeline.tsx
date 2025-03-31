
import React from 'react';
import { timelineEvents } from '@/lib/data';
import { CalendarDays } from 'lucide-react';

const Timeline: React.FC = () => {
  return (
    <div className="love-section">
      <h2 className="section-title flex items-center justify-center gap-2">
        <CalendarDays size={20} className="text-love-500" />
        Nossa História
      </h2>
      
      <div className="relative pl-8 space-y-8 before:absolute before:left-4 before:top-0 before:h-full before:w-0.5 before:bg-love-200">
        {timelineEvents.map((event, index) => (
          <div 
            key={event.id} 
            className={`relative animate-fade-in`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="absolute left-[-2rem] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-love-100 shadow border border-love-200">
              <event.icon size={16} className="text-love-600" />
            </div>
            
            <div className="love-card">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-lg text-love-700">{event.title}</h3>
                <span className="text-xs bg-love-100 px-2 py-1 rounded-full text-love-600 font-medium">
                  {event.date}
                </span>
              </div>
              <p className="text-sm text-love-600">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
