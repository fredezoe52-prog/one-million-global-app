import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import ConverterScreen from './screens/ConverterScreen';
import HistoryScreen from './screens/HistoryScreen';
import InfoScreen from './screens/InfoScreen';

const Tab = createBottomTabNavigator();

const ICON_MAP = {
  Convertir:  { focused: 'swap-horizontal',          blur: 'swap-horizontal-outline' },
  Historique: { focused: 'time',                      blur: 'time-outline' },
  Info:       { focused: 'information-circle',        blur: 'information-circle-outline' },
};

function tabBarIcon(route) {
  return ({ focused, color, size }) => {
    const icons = ICON_MAP[route.name] || { focused: 'ellipse', blur: 'ellipse-outline' };
    return <Ionicons name={focused ? icons.focused : icons.blur} size={size} color={color} />;
  };
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: tabBarIcon(route),
          tabBarActiveTintColor: '#c8960c',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            backgroundColor: '#1e1e32',
            borderTopColor: '#2e2e4a',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          headerStyle: {
            backgroundColor: '#1e1e32',
          },
          headerTintColor: '#c8960c',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen
          name="Convertir"
          component={ConverterScreen}
          options={{ title: 'One Million Global', tabBarLabel: 'Convertir' }}
        />
        <Tab.Screen
          name="Historique"
          component={HistoryScreen}
          options={{ title: 'Historique', tabBarLabel: 'Historique' }}
        />
        <Tab.Screen
          name="Info"
          component={InfoScreen}
          options={{ title: 'Informations', tabBarLabel: 'Info' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
