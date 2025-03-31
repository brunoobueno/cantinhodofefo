import React, { useState, useEffect } from 'react';
import { CircleDot, CircleOff, Circle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const CONNECTION_STORAGE_KEY = 'love-connection-level';
const EMAIL_RECIPIENT = 'ironboy318@gmail.com';

// Constantes do EmailJS - você precisará se cadastrar e obter estas informações
// https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'service_11ghiem'; // Você precisará substituir por seu service ID
const EMAILJS_TEMPLATE_ID = 'template_aba1sd6'; // Você precisará substituir por seu template ID
const EMAILJS_PUBLIC_KEY = 'vTWRhTf7Kh_33jAIc'; // Você precisará substituir por sua public key

const ConnectionMeter: React.FC = () => {
  // Inicializar com o valor do localStorage ou o padrão 4
  const [connectionLevel, setConnectionLevel] = useState<number>(() => {
    // Verifica se está no navegador antes de acessar localStorage
    if (typeof window !== 'undefined') {
      const savedLevel = localStorage.getItem(CONNECTION_STORAGE_KEY);
      return savedLevel ? parseInt(savedLevel, 10) : 4;
    }
    return 4; // Valor padrão
  });
  
  const maxLevel = 5;
  
  // Função para enviar e-mail quando o nível de conexão muda
  const sendEmailNotification = (newLevel: number) => {
    const connectionText = getConnectionTextByLevel(newLevel);
    
    // Template de parâmetros para o e-mail
    const templateParams = {
      to_email: EMAIL_RECIPIENT,
      connection_level: newLevel,
      connection_text: connectionText,
      date: new Date().toLocaleString('pt-BR'),
    };

    // Enviar e-mail usando EmailJS
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then((response) => {
        console.log('E-MAIL ENVIADO!', response.status, response.text);
      })
      .catch((err) => {
        console.error('ERRO AO ENVIAR E-MAIL:', err);
      });
  };

  // Função auxiliar para obter o texto com base no nível
  const getConnectionTextByLevel = (level: number) => {
    switch (level) {
      case 0: return "Precisamos conversar...";
      case 1: return "Um pouco distantes";
      case 2: return "Conexão estável";
      case 3: return "Sintonia boa";
      case 4: return "Super conectados";
      case 5: return "Almas gêmeas!";
      default: return "Conexão estável";
    }
  };
  
  // Atualiza o localStorage e envia e-mail quando o nível de conexão muda
  useEffect(() => {
    const previousLevel = localStorage.getItem(CONNECTION_STORAGE_KEY);
    
    // Salvar no localStorage
    localStorage.setItem(CONNECTION_STORAGE_KEY, connectionLevel.toString());
    
    // Enviar e-mail apenas se o valor mudou (não na primeira carga)
    if (previousLevel !== null && parseInt(previousLevel, 10) !== connectionLevel) {
      sendEmailNotification(connectionLevel);
    }
  }, [connectionLevel]);
  
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
  
  const getConnectionText = () => getConnectionTextByLevel(connectionLevel);

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
