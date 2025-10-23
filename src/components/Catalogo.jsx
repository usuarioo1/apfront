import React from 'react';

const Catalogo = ({ imageUrl }) => {
  return (
    <div>
      <div className="relative w-full h-64 flex items-center justify-center text-white text-7xl font-bold">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <span className="relative">Catálogo</span>
      
    </div>
    
    </div>
    
  );
};

export default Catalogo;
