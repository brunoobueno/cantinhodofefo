
import React, { useState } from 'react';
import { stickers } from '@/lib/data';
import { ImageIcon } from 'lucide-react';

const StickerGallery: React.FC = () => {
  const [activeSticker, setActiveSticker] = useState<number | null>(null);
  
  const toggleSticker = (id: number) => {
    if (activeSticker === id) {
      setActiveSticker(null);
    } else {
      setActiveSticker(id);
    }
  };

  return (
    <div className="love-section">
      <h2 className="section-title flex items-center justify-center gap-2">
        <ImageIcon size={20} className="text-love-500" />
        Nossas Figurinhas
      </h2>
      
      <div className="love-card">
        <div className="grid grid-cols-3 gap-4">
          {stickers.map((sticker) => (
            <div key={sticker.id} className="relative">
              <div 
                className={`cursor-pointer transition-all duration-300 ${
                  activeSticker === sticker.id 
                    ? 'scale-125 z-10' 
                    : 'hover:scale-110'
                }`}
                onClick={() => toggleSticker(sticker.id)}
              >
                <img 
                  src={sticker.src} 
                  alt={sticker.alt}
                  className="w-full h-auto"
                />
              </div>
              
              {activeSticker === sticker.id && (
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white shadow-md rounded-lg p-2 w-32 text-center z-20">
                  <p className="text-xs font-medium text-love-700">{sticker.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickerGallery;
