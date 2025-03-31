
import React from 'react';
import { Heart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <div className="w-28 h-28 mx-auto mb-4 relative">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-love-400 shadow-lg">
          <img
            src="./fotos/1.jpeg"
            alt="Foto do casal"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md">
          <Heart className="text-love-500 fill-love-500 h-5 w-5" />
        </div>
      </div>
      
      <h1 className="text-3xl font-cursive text-love-600 mb-2 animate-fade-in">Cantinho do Fefo</h1>
      <p className="text-lg font-serif text-love-700 mb-4 animate-fade-in">
        Um lugar só nosso para celebrar nossa história
      </p>
    </header>
  );
};

export default Header;
