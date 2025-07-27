import React, { useState } from 'react';
import api from '../api';

const FormularioRestaurante = ({ onSuccess }) => {
  const [nuevo, setNuevo] = useState({ nombre: '', direccion: '' });

  const handleChange = e => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    api.post('/restaurantes', nuevo)
      .then(() => {
        setNuevo({ nombre: '', direccion: '' });
        onSuccess(); // recargar lista
      })
      .catch(error => console.error('Error al añadir restaurante:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={nuevo.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={nuevo.direccion}
        onChange={handleChange}
        required
      />
      <button type="submit">Añadir</button>
    </form>
  );
};

export default FormularioRestaurante;
