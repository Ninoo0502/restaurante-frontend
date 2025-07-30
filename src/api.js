import axios from 'axios';

const api = axios.create({
  baseURL: 'https://restaurante-api-production-005e.up.railway.app/api',
  headers: {
    'X-Auth-Token': 'aitorpsw1234',
    "Accept": "application/json"
  }
});

export default api;
