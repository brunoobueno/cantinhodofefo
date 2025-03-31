import React, { useState } from 'react';
import LightboxModal from './LightboxModal';
import { Image } from 'lucide-react';

// Array de fotos locais
const localPhotos = [
  {
    id: 1,
    src: "./fotos/1.jpeg",
    alt: "Foto 1",
    caption: "Nossa primeira foto juntos"
  },
  {
    id: 2,
    src: "./fotos/2.JPG",
    alt: "Foto 2",
    caption: "Você odiando foto kk"
  },
  {
    id: 3,
    src: "./fotos/3.jpg",
    alt: "Foto 3",
    caption: "Dia de comer um BK"
  },
  {
    id: 4,
    src: "./fotos/4.jpg",
    alt: "Foto 4",
    caption: "Na melhor companhia"
  },
  {
    id: 5,
    src: "./fotos/5.jpeg",
    alt: "Foto 5",
    caption: "Nosso dia perfeito"
  },
  {
    id: 6,
    src: "./fotos/6.jpeg",
    alt: "Foto 6",
    caption: "Dia de SkinCare"
  }
];

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof localPhotos[0] | null>(null);
  
  const openLightbox = (photo: typeof localPhotos[0]) => {
    setSelectedPhoto(photo);
  };
  
  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="love-section">
      <h2 className="section-title flex items-center justify-center gap-2">
        <Image size={20} className="text-love-500" />
        Nossa Galeria
      </h2>
      
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {localPhotos.map((photo) => (
          <div 
            key={photo.id} 
            className="aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all"
            onClick={() => openLightbox(photo)}
          >
            <div className="w-full h-full relative group">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                <p className="text-white text-xs truncate font-medium">{photo.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <LightboxModal 
        isOpen={!!selectedPhoto}
        onClose={closeLightbox}
        src={selectedPhoto?.src || ''}
        alt={selectedPhoto?.alt || ''}
        caption={selectedPhoto?.caption}
      />
    </div>
  );
};

export default PhotoGallery;
