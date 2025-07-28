import React from 'react';
import '../Restaurante.css';

const EliminarBoton = ({ restauranteId, onEliminar }) => {
  const manejarClick = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este restaurante?')) {
      onEliminar(restauranteId);
    }
  };

  return (
    <button className='boton-eliminar' onClick={manejarClick}>
      Eliminar
    </button>
  );
};

export default EliminarBoton;
