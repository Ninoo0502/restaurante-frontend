import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaRestaurantes from './components/ListaRestaurantes';
import EditarRestaurante from './components/EditarRestaurante';
import api from './api';
import { useEffect, useState } from 'react';
import './App.css';

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <ListaRestaurantes
                restaurantes={restaurantes}
                onDeleteSuccess={cargarRestaurantes}
              />
            </div>
          }
        />
        <Route path="/editar/:id" element={<EditarRestaurante />} />
      </Routes>
    </Router>
  );
}

export default App;
