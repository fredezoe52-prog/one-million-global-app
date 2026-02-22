import AsyncStorage from '@react-native-async-storage/async-storage';

export const HISTORY_KEY = 'conversion_history';

export const loadHistory = async () => {
  try {
    const stored = await AsyncStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveHistory = async (newHistory) => {
  try {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  } catch {}
};

export const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch {}
};
