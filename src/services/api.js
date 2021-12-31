import axios from 'axios';

const api = axios.create({
  //  baseURL: 'https://apidelivery.ltai.com.br',
  // baseURL: 'https://api.glindoor.com.br',
  // baseURL: 'http://192.168.1.4:3333/',
  // baseURL: 'http://10.0.2.2:3333/',
  baseURL: 'http://10.0.3.2:3333',
  // baseURL: 'http://10.0.12.114:3333/',
});

export default api;
