import axios from 'axios';

const baseURL = 'http://192.168.1.18:3000';

export default function getStockName(stockName) {
  return axios.get(`${baseURL}/instrumentTokens/${stockName}`);
}

export function getStockData(request) {
  return axios.post(`${baseURL}/backTest`, request);
}

export function getHistoricalData(data) {
  return axios.post(`${baseURL}/getHistoricalData`, data);
}
