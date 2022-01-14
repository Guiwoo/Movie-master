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