import axios from 'axios';

// const getCandleDataOld = async () => {
//   const apiUrl = `http://localhost:4000/markets/getCandleData`;

//   const candlesData = await axios.get(apiUrl);

//   // format candle data

//   return candlesData.data;
// };

const formatBinanceData = (unFormattedData: any) => {
  const formattedData = unFormattedData.map((d: any) => {
    const candleData: any = {
      close: parseFloat(d[4]),
      date: parseFloat(d[0]),
      high: parseFloat(d[2]),
      low: parseFloat(d[3]),
      open: parseFloat(d[1]),
      volume: parseFloat(d[5]),
    };

    return candleData;
  });

  return formattedData;
};
// const someDate = new Date(); // add arguments as needed
// const lastTwoMothDay = new Date(someDate.getFullYear(), someDate.getMonth() - 1);
const getCandleData = async (
  coin: any = 'BTC',
  interval = '1h',
  limit = '1000',
  // startTime: any = `${Math.round(new Date('April 7, 2022').setSeconds(0, 0))}`,
  // endTime: any = `${Math.round(new Date().setSeconds(0, 0))}`,
) => {
  const apiUrl = `https://api.binance.com/api/v3/klines?symbol=${coin.toUpperCase()}&interval=${interval}&limit=${limit}`;

  const candlesData = await axios.get(apiUrl);
  // format candle data

  return formatBinanceData(candlesData.data);
};

function getCurrentPrice(coins = []) {
  return axios.get(`https://api.binance.com/api/v1/ticker/price?symbols=${JSON.stringify(coins)}`);
}

// function getCryptoPrices(coin = 'BTC') {
//   return axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coin.toUpperCase()}`, {
//     headers: {
//       'X-CMC_PRO_API_KEY': '0e14f09c-66c2-41d2-8d99-ee730d9f53f3',
//     },
//   });
// }

const serviceMethods = { getCandleData, getCurrentPrice };
export default serviceMethods;
