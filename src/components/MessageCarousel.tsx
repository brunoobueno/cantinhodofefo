import React, { useState, useEffect } from 'react';
import { messages } from '@/lib/data';
import { Heart } from 'lucide-react';

const MessageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayMessage, setDisplayMessage] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    // Reset and start typing animation for new message
    setDisplayMessage('');
    setIsTyping(true);
    
    const message = messages[currentIndex];
    let displayIndex = 0;
    
    // Typing effect
    const typingInterval = setInterval(() => {
      if (displayIndex <= message.length) {
        setDisplayMessage(message.substring(0, displayIndex));
        displayIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Auto-advance to next message after pause
        const pauseTimeout = setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 5000);
        
        return () => clearTimeout(pauseTimeout);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [currentIndex]);
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
  };
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? messages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="love-section">
      <h2 className="section-title">Mensagens do Coração</h2>
      <div className="love-card min-h-[200px] flex flex-col items-center justify-center relative">
        <div className="absolute top-2 right-2">
          <Heart 
            className={`w-5 h-5 text-love-500 ${isTyping ? 'animate-pulse-slow' : ''}`} 
            fill={isTyping ? "none" : "#FF6384"} 
          />
        </div>
        
        <p className="text-center font-serif text-lg text-love-800 italic px-4 my-6 min-h-[4rem]">
          "{displayMessage}"
          {isTyping && <span className="animate-pulse">|</span>}
        </p>
        
        <div className="flex justify-between w-full px-4 mt-4">
          <button 
            onClick={handlePrev} 
            className="text-love-600 hover:text-love-800 transition-colors flex flex-col items-center"
            disabled={isTyping}
          >
            <span>&#8592;</span>
            <span>Anterior</span>
          </button>
          <div className="flex flex-wrap justify-center max-w-[60%] gap-1">
            {messages.map((_, index) => (
              <span 
                key={index} 
                className={`block w-1.5 h-1.5 rounded-full ${
                  index === currentIndex ? 'bg-love-500' : 'bg-love-200'
                }`}
              />
            ))}
          </div>
          <button 
            onClick={handleNext} 
            className="text-love-600 hover:text-love-800 transition-colors flex flex-col items-center"
            disabled={isTyping}
          >
            <span>&#8594;</span>
            <span>Próxima</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCarousel;
