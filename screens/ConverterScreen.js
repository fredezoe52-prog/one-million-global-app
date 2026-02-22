import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchEurRate, FALLBACK_RATE, FEE_USD, validateAmount, convertUsdToEur } from '../utils/api';
import { loadHistory, saveHistory } from '../utils/storage';

const MAX_HISTORY = 20;

export default function ConverterScreen() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(null);
  const [rateLoading, setRateLoading] = useState(true);
  const [rateLive, setRateLive] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  const loadRate = useCallback((forceRefresh = false) => {
    setRateLoading(true);
    fetchEurRate(forceRefresh)
      .then((r) => {
        setRate(r);
        setRateLive(r !== FALLBACK_RATE);
      })
      .catch(() => {
        setRate(FALLBACK_RATE);
        setRateLive(false);
      })
      .finally(() => {
        setRateLoading(false);
      });
  }, []);

  useEffect(() => {
    loadRate();
  }, [loadRate]);

  useFocusEffect(
    useCallback(() => {
      loadHistory().then(setHistory);
    }, [])
  );

  const handleAmountChange = (v) => {
    setAmount(v);
    setError('');
    setResult(null);
  };

  const handleConvert = async () => {
    setError('');
    setResult(null);

    const { valid, error: validationError } = validateAmount(amount);
    if (!valid) {
      setError(validationError);
      return;
    }

    const conversion = convertUsdToEur(amount, rate);
    setResult(conversion);

    const entry = {
      id: Date.now().toString(),
      usd: conversion.gross,
      eur: conversion.eur,
      rate: conversion.rate,
      date: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }),
    };
    const updated = [entry, ...history].slice(0, MAX_HISTORY);
    setHistory(updated);
    await saveHistory(updated);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Convertir USD → EUR</Text>

      <View style={styles.rateRow}>
        {rateLoading ? (
          <>
            <ActivityIndicator size="small" color="#c8960c" />
            <Text style={styles.rateText}>  Chargement du taux...</Text>
          </>
        ) : (
          <>
            <View style={[styles.rateDot, { backgroundColor: rateLive ? '#4caf50' : '#ff9800' }]} />
            <Text style={styles.rateText}>
              {rateLive ? 'Taux live' : 'Taux de repli'} : 1 USD = {rate.toFixed(4)} EUR
            </Text>
            <TouchableOpacity onPress={() => loadRate(true)} style={styles.refreshBtn}>
              <Text style={styles.refreshBtnText}>↻</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Montant en USD"
        keyboardType="decimal-pad"
        value={amount}
        onChangeText={handleAmountChange}
        editable={!rateLoading}
        returnKeyType="done"
      />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, (rateLoading || !amount) && styles.buttonDisabled]}
        onPress={handleConvert}
        disabled={rateLoading || !amount}
      >
        <Text style={styles.buttonText}>Convertir (frais {FEE_USD} $)</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLine}>Montant brut :{' '}
            <Text style={styles.resultBold}>{result.gross} USD</Text>
          </Text>
          <Text style={styles.resultLine}>Frais déduits :{' '}
            <Text style={styles.resultBold}>− {FEE_USD} USD</Text>
          </Text>
          <Text style={styles.resultLine}>Net converti :{' '}
            <Text style={styles.resultBold}>{result.net} USD</Text>
          </Text>
          <View style={styles.resultDivider} />
          <Text style={styles.resultValue} selectable>{result.eur} EUR</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f7f8fa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e1e32',
    marginBottom: 16,
    marginTop: 8,
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
    minHeight: 44,
  },
  rateDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  rateText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
  },
  refreshBtn: {
    marginLeft: 10,
    paddingHorizontal: 6,
  },
  refreshBtnText: {
    fontSize: 20,
    color: '#c8960c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    fontSize: 18,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  error: {
    color: '#d32f2f',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#c8960c',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 18,
    borderWidth: 1,
    borderColor: '#c8960c',
  },
  resultLine: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
  },
  resultBold: {
    fontWeight: '600',
    color: '#1e1e32',
  },
  resultDivider: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginVertical: 12,
  },
  resultValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1e1e32',
    textAlign: 'center',
  },
});
