import React, { useState } from 'react';
import api from '../api';
import '../Restaurante.css';

const FormularioRestaurante = ({ onSuccess }) => {
  const [nuevo, setNuevo] = useState({ nombre: '', direccion: '', telefono: '' });
  const [errores, setErrores] = useState({});

  const handleChange = e => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!nuevo.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!nuevo.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria.';
    if (!/^\d{4,15}$/.test(nuevo.telefono)) nuevosErrores.telefono = 'El teléfono debe tener entre 4 y 15 dígitos.';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validar()) return;

    api.post('/restaurantes', nuevo)
      .then(() => {
        setNuevo({ nombre: '', direccion: '', telefono: '' });
        setErrores({});
        onSuccess();
      })
      .catch(err => {
        if (err.response && err.response.data?.error) {
          alert(err.response.data.error);
        } else {
          console.error('Error al añadir restaurante:', err);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-restaurante">
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={nuevo.nombre}
        onChange={handleChange}
        className="input-restaurante"
      />
      {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}

      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={nuevo.direccion}
        onChange={handleChange}
        className="input-restaurante"
      />
      {errores.direccion && <p className="mensaje-error">{errores.direccion}</p>}

      <input
        type="tel"
        name="telefono"
        placeholder="Teléfono"
        value={nuevo.telefono}
        onChange={handleChange}
        className="input-restaurante"
      />
      {errores.telefono && <p className="mensaje-error">{errores.telefono}</p>}

      <button type="submit" className="boton-primario">Añadir</button>
    </form>
  );
};

export default FormularioRestaurante;
