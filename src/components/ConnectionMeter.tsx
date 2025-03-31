
import React, { useState } from 'react';
import { CircleDot, CircleOff, Circle } from 'lucide-react';

const ConnectionMeter: React.FC = () => {
  const [connectionLevel, setConnectionLevel] = useState(4);
  const maxLevel = 5;
  
  const decreaseLevel = () => {
    if (connectionLevel > 0) {
      setConnectionLevel(prev => prev - 1);
    }
  };
  
  const increaseLevel = () => {
    if (connectionLevel < maxLevel) {
      setConnectionLevel(prev => prev + 1);
    }
  };
  
  const getConnectionText = () => {
    switch (connectionLevel) {
      case 0: return "Precisamos conversar...";
      case 1: return "Um pouco distantes";
      case 2: return "Conexão estável";
      case 3: return "Sintonia boa";
      case 4: return "Super conectados";
      case 5: return "Almas gêmeas!";
      default: return "Conexão estável";
    }
  };

  return (
    <div className="love-section">
      <h2 className="section-title">Nível de Conexão</h2>
      
      <div className="love-card">
        <p className="text-center text-love-700 mb-4 font-medium">{getConnectionText()}</p>
        
        <div className="flex justify-center items-center space-x-2 mb-4">
          {Array.from({ length: maxLevel + 1 }).map((_, index) => (
            <button 
              key={index} 
              onClick={() => setConnectionLevel(index)}
              className="focus:outline-none"
            >
              {index === connectionLevel ? (
                <CircleDot className="w-6 h-6 text-love-600 fill-love-200" />
              ) : index < connectionLevel ? (
                <CircleDot className="w-6 h-6 text-love-500 fill-love-100" />
              ) : (
                <Circle className="w-6 h-6 text-love-300" />
              )}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between">
          <button 
            onClick={decreaseLevel}
            disabled={connectionLevel === 0}
            className={`px-3 py-1 rounded-md ${
              connectionLevel === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-love-600 hover:text-love-800'
            }`}
          >
            Diminuir
          </button>
          <button 
            onClick={increaseLevel}
            disabled={connectionLevel === maxLevel}
            className={`px-3 py-1 rounded-md ${
              connectionLevel === maxLevel 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-love-600 hover:text-love-800'
            }`}
          >
            Aumentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionMeter;
