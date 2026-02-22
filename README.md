# One Million Global

Application mobile de conversion de devises (USD → EUR) construite avec React Native et Expo.

## Fonctionnalités

- Conversion USD → EUR (frais de 4,99 $)
- Historique des conversions persistant (sauvegardé localement)
- Possibilité de copier les résultats directement depuis l'historique
- Bouton "Effacer" pour réinitialiser l'historique

## Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

```bash
npm install -g expo-cli
```

## Installation

```bash
# Cloner le projet
git clone https://github.com/fredezoe52-prog/one-million-global-app.git
cd one-million-global-app

# Installer les dépendances
npm install
```

## Démarrage

```bash
# Lancer l'application
npm start

# Lancer sur Android
npm run android
```

Scannez le QR code avec l'application **Expo Go** sur votre téléphone.

## Structure du projet

```
one-million-global-app/
├── App.js           # Composant principal de l'application
├── app.json         # Configuration Expo
├── babel.config.js  # Configuration Babel
├── package.json     # Dépendances et scripts
├── .gitignore       # Fichiers ignorés par Git
└── .github/
    └── workflows/   # Pipelines CI/CD
```

## Build Android (via Codemagic)

Le projet est configuré pour générer un APK Android via [Codemagic](https://codemagic.io). Voir `codemagic.yaml` pour la configuration.

## Licence

© 2024 One Million Global. Tous droits réservés.
