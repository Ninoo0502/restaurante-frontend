import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import '../App.css';
import '../Restaurante.css';

const EditarRestaurante = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurante, setRestaurante] = useState(null);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    api.get(`/restaurantes/${id}`)
      .then(res => setRestaurante(res.data))
      .catch(err => console.error('Error al cargar restaurante:', err));
  }, [id]);

  const handleChange = e => {
    setRestaurante({ ...restaurante, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: '' });
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!restaurante.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio.';
    if (!restaurante.direccion.trim()) nuevosErrores.direccion = 'La dirección es obligatoria.';
    if (!/^\d{4,15}$/.test(restaurante.telefono)) nuevosErrores.telefono = 'El teléfono debe tener entre 4 y 15 dígitos.';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validar()) return;

    api.put(`/restaurantes/${id}`, restaurante)
      .then(() => navigate('/'))
      .catch(err => {
        if (err.response && err.response.data?.error) {
          alert(err.response.data.error);
        } else {
          console.error('Error al actualizar restaurante:', err);
        }
      });
  };

  if (!restaurante) return <p className="mensaje-cargando">Cargando datos del restaurante...</p>;

  return (
    <div className="editar-restaurante">
      <h2>Editar Restaurante</h2>
      <form onSubmit={handleSubmit} className="formulario-restaurante">
        <input
          type="text"
          name="nombre"
          value={restaurante.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="input-restaurante"
        />
        {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}

        <input
          type="text"
          name="direccion"
          value={restaurante.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          className="input-restaurante"
        />
        {errores.direccion && <p className="mensaje-error">{errores.direccion}</p>}

        <input
          type="tel"
          name="telefono"
          value={restaurante.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          className="input-restaurante"
        />
        {errores.telefono && <p className="mensaje-error">{errores.telefono}</p>}

        <button type="submit" className="boton-primario">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarRestaurante;
