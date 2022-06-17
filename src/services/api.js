import axios from 'axios';

// const baseURL = 'http://localhost:3000';
// const baseURL = `192.168.1.18`;
const baseURL = 'https://petite-eagles-cough-43-242-224-139.loca.lt/';

export default function getStockName(stockName) {
  return axios.get(`${baseURL}/instrumentTokens/${stockName}`);
}

export function getStockData(request) {
  return axios.post(`${baseURL}/backTest`, request);
}

export function getHistoricalData(data) {
  return axios.post(`${baseURL}/getHistoricalData`, data);
}
