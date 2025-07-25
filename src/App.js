import React, { useEffect, useState } from 'react';
import api from './api';

function App() {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    api.get('/restaurantes')
      .then(response => setRestaurantes(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Restaurantes</h1>
      <ul>
        {restaurantes.map(restaurante => (
          <li key={restaurante.id}>
            {restaurante.nombre} - {restaurante.direccion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
