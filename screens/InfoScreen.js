import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';

const FEE_USD = 4.99;

export default function InfoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.appName}>One Million Global</Text>
      <Text style={styles.version}>Version 1.0.0</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>À propos</Text>
        <Text style={styles.cardText}>
          One Million Global est une application de conversion de devises USD → EUR.
          Chaque conversion applique des frais de service fixes de {FEE_USD} $.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Comment ça fonctionne</Text>
        <View style={styles.step}>
          <Text style={styles.stepNum}>1</Text>
          <Text style={styles.stepText}>Entrez votre montant en USD</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepNum}>2</Text>
          <Text style={styles.stepText}>Des frais de {FEE_USD} USD sont déduits automatiquement</Text>
        </View>
        <View style={styles.step}>
          <Text style={styles.stepNum}>3</Text>
          <Text style={styles.stepText}>Le montant net est converti au taux EUR du jour</Text>
        </View>
        <Text style={styles.formula}>
          Exemple : 100 USD → (100 − {FEE_USD}) × taux = résultat EUR
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Taux de change en temps réel</Text>
        <Text style={styles.cardText}>
          Les taux sont récupérés automatiquement depuis Open Exchange Rates API.
          En cas d'indisponibilité du réseau, un taux de repli (0,92) est utilisé.
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://open.er-api.com')}
          style={styles.linkRow}
        >
          <Text style={styles.link}>open.er-api.com ↗</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Historique persistant</Text>
        <Text style={styles.cardText}>
          Vos 20 dernières conversions sont sauvegardées localement sur votre appareil.
          Elles restent accessibles même après avoir quitté l'application.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Identifiant de l'application</Text>
        <Text style={styles.cardText} selectable>
          com.onemillionglobal.app
        </Text>
      </View>

      <Text style={styles.footer}>© 2024 One Million Global. Tous droits réservés.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f7f8fa',
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e1e32',
    marginTop: 8,
    marginBottom: 4,
  },
  version: {
    fontSize: 13,
    textAlign: 'center',
    color: '#888',
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#c8960c',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 21,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#1e1e32',
    color: '#c8960c',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 10,
    overflow: 'hidden',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
  formula: {
    marginTop: 8,
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    backgroundColor: '#f7f8fa',
    padding: 10,
    borderRadius: 6,
  },
  linkRow: {
    marginTop: 10,
  },
  link: {
    color: '#1565c0',
    fontSize: 14,
  },
  footer: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 12,
    marginTop: 8,
    marginBottom: 24,
  },
});
