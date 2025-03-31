
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  caption?: string;
}

const LightboxModal: React.FC<LightboxModalProps> = ({ 
  isOpen, 
  onClose, 
  src, 
  alt, 
  caption 
}) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute -top-12 right-0 text-white hover:text-love-300 p-2"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <img 
          src={src} 
          alt={alt} 
          className="max-h-[80vh] max-w-full object-contain rounded-lg"
        />
        
        {caption && (
          <div className="text-center mt-3 text-white">
            <p className="font-serif italic">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LightboxModal;
