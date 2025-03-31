import React, { useState } from 'react';
import { ImageIcon } from 'lucide-react';

// Array de figurinhas locais
const localStickers = [
  {
    id: 1,
    src: "/figurinhas/1.webp",
    alt: "Figurinha 1",
    caption: "Quando brigamos kkk"
  },
  {
    id: 2,
    src: "/figurinhas/2.webp",
    alt: "Figurinha 2",
    caption: "Nosso jeitinho de pedir carinho"
  },
  {
    id: 3,
    src: "/figurinhas/3.webp",
    alt: "Figurinha 3",
    caption: "Feliz um tantão assim"
  },
  {
    id: 4,
    src: "/figurinhas/4.webp",
    alt: "Figurinha 4",
    caption: "Tem certeza?"
  },
  {
    id: 5,
    src: "/figurinhas/5.webp",
    alt: "Figurinha 5",
    caption: "Fefinhoooo"
  },
  {
    id: 6,
    src: "/figurinhas/6.webp",
    alt: "Figurinha 6",
    caption: "Nós dois"
  },
  {
    id: 7,
    src: "/figurinhas/7.webp",
    alt: "Figurinha 7",
    caption: "Nós denovo"
  },
  {
    id: 8,
    src: "/figurinhas/8.webp",
    alt: "Figurinha 8",
    caption: "Fefo tristeee"
  },
];

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
        <div className="grid grid-cols-4 gap-4">
          {localStickers.map((sticker) => (
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
