import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'conversion_history';

export default function App() {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(HISTORY_KEY)
      .then((stored) => {
        if (stored) setHistory(JSON.parse(stored));
      })
      .catch(() => {});
  }, []);

  const saveHistory = async (newHistory) => {
    setHistory(newHistory);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const convertCurrency = () => {
    if (!amount) return;
    const converted = parseFloat(amount) * 0.92; // exemple USD → EUR
    const res = converted.toFixed(2);
    setResult(res);
    const entry = { id: Date.now().toString(), usd: amount, eur: res, date: new Date().toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) };
    saveHistory([entry, ...history].slice(0, 20));
  };

  const clearHistory = () => saveHistory([]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>One Million Global</Text>

      <TextInput
        style={styles.input}
        placeholder="Montant en USD"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Button title="Convertir (4.99$ frais)" onPress={convertCurrency} />

      {result && <Text style={styles.result}>Résultat: {result} EUR</Text>}

      {history.length > 0 && (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Historique des conversions</Text>
            <TouchableOpacity onPress={clearHistory}>
              <Text style={styles.clearBtn}>Effacer</Text>
            </TouchableOpacity>
          </View>
          {history.map((item) => (
            <Text key={item.id} style={styles.historyItem} selectable>
              {item.date} — {item.usd} USD → {item.eur} EUR
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center'
  },
  historyContainer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 15
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  clearBtn: {
    color: 'red',
    fontSize: 14
  },
  historyItem: {
    fontSize: 14,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});
