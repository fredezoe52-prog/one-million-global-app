import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);

  const convertCurrency = () => {
    if (!amount) return;
    const converted = parseFloat(amount) * 0.92; // exemple USD → EUR
    setResult(converted.toFixed(2));
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  }
});
