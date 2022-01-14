const BASE_URL = `https://api.coinpaprika.com/v1`

export const fetchCoins = ()=>{
    return fetch(`${BASE_URL}/coins`).then(response=>response.json());
}

export const fetchCoinInfo = (id:string) => {
    return fetch(`${BASE_URL}/coins/${id}`).then(response=>response.json());
}

export const fetchCoinPrice = (id:string) => {
    return fetch(`${BASE_URL}/tickers/${id}`).then(response=>response.json());
}

export const fetchCoinHistory=(id:string) => {
    const endDate = Math.floor(Date.now() / 1000)
    const startDate = endDate - 60*60*24*7*2;
    return fetch(`${BASE_URL}/coins/${id}/ohlcv/historical?start=${startDate}&end=${endDate}`).then(response=>response.json());
}