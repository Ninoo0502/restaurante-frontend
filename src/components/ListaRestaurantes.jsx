import React from 'react';
import api from '../api';

const ListaRestaurantes = ({ restaurantes, onDeleteSuccess }) => {

  const eliminarRestaurante = id => {
    api.delete(`/restaurantes/${id}`)
      .then(() => onDeleteSuccess())
      .catch(error => console.error('Error al eliminar restaurante:', error));
  };

  return (
    <ul>
      {restaurantes.map(r => (
        <li key={r.id}>
          {r.nombre} - {r.direccion}
          <button onClick={() => eliminarRestaurante(r.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  );
};

export default ListaRestaurantes;
