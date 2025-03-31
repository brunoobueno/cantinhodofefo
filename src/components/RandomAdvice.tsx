
import React, { useState, useEffect } from 'react';
import { loveAdvice } from '@/lib/data';
import { Heart } from 'lucide-react';

const RandomAdvice: React.FC = () => {
  const [advice, setAdvice] = useState('');
  
  const getRandomAdvice = () => {
    const randomIndex = Math.floor(Math.random() * loveAdvice.length);
    setAdvice(loveAdvice[randomIndex]);
  };
  
  useEffect(() => {
    getRandomAdvice();
  }, []);

  return (
    <div className="love-section pb-16">
      <h2 className="section-title">Conselho do Dia</h2>
      
      <div className="love-card text-center">
        <div className="mb-4 flex justify-center">
          <Heart className="text-love-500 fill-love-300 h-8 w-8 animate-pulse-slow" />
        </div>
        
        <p className="font-serif text-lg italic text-love-700 mb-6">"{advice}"</p>
        
        <button 
          onClick={getRandomAdvice}
          className="inline-flex items-center px-4 py-2 rounded-full bg-love-500 text-white hover:bg-love-600 transition-colors shadow-md hover:shadow-lg"
        >
          <span>Novo conselho</span>
        </button>
      </div>
    </div>
  );
};

export default RandomAdvice;
