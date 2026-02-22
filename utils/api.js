const API_URL = 'https://open.er-api.com/v6/latest/USD';
export const FALLBACK_RATE = 0.92;

export const fetchEurRate = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return FALLBACK_RATE;
    const data = await response.json();
    if (data.result === 'success' && data.rates && data.rates.EUR) {
      return data.rates.EUR;
    }
    return FALLBACK_RATE;
  } catch {
    return FALLBACK_RATE;
  }
};
