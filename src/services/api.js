import customAxios from './axios';

export default function login(request) {
  return customAxios.post(`api/v1/auth/login`, request);
}

export function userCreat(request) {
  return customAxios.post(`api/v1/users`, request);
}

export function getUsers() {
  return customAxios.get(`api/v1/users/userDetails`);
}

export function getAllUsers(body) {
  return customAxios.post(`api/v1/users/all`, body);
}

export function editUser(userId, body) {
  return customAxios.patch(`api/v1/users/${userId}`, body);
}

export function deleteUser(userId) {
  return customAxios.delete(`api/v1/users/${userId}`);
}

export function strategyAPI(request) {
  return customAxios.post(`api/v1/strategy`, request);
}

export function getStrategyList(request) {
  return customAxios.post(`api/v1/strategy/all`, request);
}

export function getBackTestRecords(request) {
  return customAxios.post(`api/v1/strategy/backtest`, request);
}

export function getCryptoCoinsList() {
  return customAxios.get('api/v1/strategy/coinsList');
}

export function sellCoinForStrategy(request) {
  return customAxios.post('api/v1/customStrategy/sellCoin', request);
}

export function ordersAll(request) {
  return customAxios.post('api/v1/orders/all', request);
}

// admin dashboard
export function getCustomStrategies() {
  return customAxios.get('api/v1/customStrategy/list');
}

// admin dashboard
export function getActiveDormantCoinAllocations(request) {
  // old url is 'api/v1/budget/coinAllocation'
  return customAxios.post('api/v1/budget/getCoins', request);
}

// admin dashboard
export function postAllocateBudgetToCoin(request) {
  return customAxios.post('api/v1/budget/allocateBudget', request);
}

export function getBudgetBankAllocationForCoin(coin) {
  return customAxios.get(`api/v1/budget/bankallocations/${coin}`);
}

export function getWalletBalance() {
  return customAxios.get(`api/v1/budget/walletBalance`);
}

export function getProfitForCoin(coin) {
  return customAxios.get(`api/v1/budget/profits/${coin}`);
}

export function getCoinPriceInfo(req) {
  return customAxios.post('api/v1/budget/coinsPriceInfo', req);
}

export function getSpecificCoinData(coin) {
  return customAxios.get(`api/v1/budget/getCoinStartegies/${coin}`);
}

export function getCryptoPrices(coin) {
  return customAxios.post(`api/v1/OhlcData/getPriceChangeData/${coin}`);
}
