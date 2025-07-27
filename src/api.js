import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'X-Auth-Token': 'aitorpsw1234',
    "Accept": "application/json"
  }
});

export default api;
