const API_URL = 'https://open.er-api.com/v6/latest/USD';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export const FALLBACK_RATE = 0.92;
export const FEE_USD = 4.99;

// In-memory cache — avoids hitting the network on every screen mount
let _cachedRate = null;
let _cachedAt = null;

export const fetchEurRate = async (forceRefresh = false) => {
  const now = Date.now();
  if (!forceRefresh && _cachedRate && _cachedAt && now - _cachedAt < CACHE_TTL_MS) {
    return _cachedRate;
  }
  try {
    const response = await fetch(API_URL);
    if (!response.ok) return _cachedRate || FALLBACK_RATE;
    const data = await response.json();
    if (data.result === 'success' && data.rates && data.rates.EUR) {
      _cachedRate = data.rates.EUR;
      _cachedAt = now;
      return _cachedRate;
    }
    return _cachedRate || FALLBACK_RATE;
  } catch {
    return _cachedRate || FALLBACK_RATE;
  }
};

// Returns { valid: true, error: null } or { valid: false, error: '<message>' }
export const validateAmount = (amountStr) => {
  if (!amountStr) {
    return { valid: false, error: 'Veuillez entrer un montant valide.' };
  }
  const parsed = parseFloat(amountStr);
  if (isNaN(parsed) || parsed <= 0) {
    return { valid: false, error: 'Veuillez entrer un montant valide.' };
  }
  if (parsed <= FEE_USD) {
    return { valid: false, error: `Le montant doit être supérieur aux frais (${FEE_USD} $).` };
  }
  return { valid: true, error: null };
};

// Applies the $4.99 fee and converts at the given rate
export const convertUsdToEur = (amountUsd, rate) => {
  const gross = parseFloat(amountUsd);
  const net = gross - FEE_USD;
  const eur = (net * rate).toFixed(2);
  return {
    gross: gross.toFixed(2),
    net: net.toFixed(2),
    eur,
    rate: rate.toFixed(4),
  };
};
