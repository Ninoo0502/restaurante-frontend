import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useLocation } from 'react-router-dom';
import EliminarBoton from './EliminarBoton';
import FormularioRestaurante from './FormularioRestaurante';
import '../Restaurante.css';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]);
  const [mensajeExito, setMensajeExito] = useState('');
  const location = useLocation();

  const cargarRestaurantes = () => {
    api.get('/restaurantes')
      .then(res => setRestaurantes(res.data))
      .catch(err => console.error('Error al obtener restaurantes:', err));
  };

  useEffect(() => {
    cargarRestaurantes();
  }, [location]);

  const eliminarRestaurante = (id) => {
    api.delete(`/restaurantes/${id}`)
      .then(() => {
        setRestaurantes(prev => prev.filter(r => r.id !== id));
        setMensajeExito('Restaurante eliminado correctamente');
        setTimeout(() => setMensajeExito(''), 3000);
      })
      .catch(err => console.error('Error al eliminar restaurante:', err));
  };

  const handleAgregarExito = () => {
    cargarRestaurantes();
    setMensajeExito('Restaurante añadido correctamente');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  return (
    <div className="contenedor-principal">
      <h2>Lista de Restaurantes</h2>

      {mensajeExito && (
        <div className="mensaje-exito">
          {mensajeExito}
        </div>
      )}

      <FormularioRestaurante onSuccess={handleAgregarExito} />

      <ul>
        {restaurantes.map(rest => (
          <li key={rest.id} className="tarjeta-restaurante">
            <div>
              <h3>{rest.nombre}</h3>
              <p> - {rest.direccion}</p>
              <p> - {rest.telefono}</p>
            </div>
            <div>
              <Link className="boton-editar" to={`/editar/${rest.id}`}>Editar</Link>
              <EliminarBoton restauranteId={rest.id} onEliminar={eliminarRestaurante} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaRestaurantes;
