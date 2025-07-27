import React, { useEffect, useState } from 'react';
import FormularioRestaurante from './components/FormularioRestaurante';
import ListaRestaurantes from './components/ListaRestaurantes';
import api from './api';

function App() {
  const [restaurantes, setRestaurantes] = useState([]);

  const cargarRestaurantes = () => {
    api.get('/restaurantes')
      .then(response => setRestaurantes(response.data))
      .catch(error => console.error('Error al cargar restaurantes:', error));
  };

  useEffect(() => {
    cargarRestaurantes();
  }, []);

  return (
    <div>
      <h1>Lista de Restaurantes</h1>
      <FormularioRestaurante onSuccess={cargarRestaurantes} />
      <ListaRestaurantes
        restaurantes={restaurantes}
        onDeleteSuccess={cargarRestaurantes}
      />
    </div>
  );
}

export default App;
