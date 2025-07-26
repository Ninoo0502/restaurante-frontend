import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/restaurantes',
  headers: {
    'X-AUTH-TOKEN': 'aitorpsw1234'
  }
});

export default api;
