# One Million Global

Application mobile de conversion de devises (USD → EUR) construite avec React Native et Expo.

## ✅ État du projet — 100% configuré

| Composant | Statut |
|---|---|
| `App.js` — logique de conversion + historique persistant | ✅ Terminé |
| `app.json` — configuration Expo (identifiants iOS/Android) | ✅ Terminé |
| `babel.config.js` — configuration Babel | ✅ Terminé |
| `package.json` — dépendances + scripts | ✅ Terminé |
| `.gitignore` — exclusions Git | ✅ Terminé |
| `eas.json` — profils de build EAS | ✅ Terminé |
| `codemagic.yaml` — build automatique (EAS CLI) | ✅ Terminé |
| `assets/` — icônes et splash screen (tailles Expo) | ✅ Terminé |
| `.github/workflows/expo.yml` — CI/CD GitHub Actions | ✅ Terminé |

> **Une seule action manuelle requise :** ajouter le secret `EXPO_TOKEN` dans les paramètres GitHub du dépôt pour activer le build automatique. Voir ci-dessous.

## Fonctionnalités

- Conversion USD → EUR (frais de 4,99 $)
- Historique des conversions persistant (sauvegardé localement)
- Possibilité de copier les résultats directement depuis l'historique
- Bouton "Effacer" pour réinitialiser l'historique

## Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [EAS CLI](https://docs.expo.dev/build/introduction/)

```bash
npm install -g eas-cli
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
# Lancer l'application (QR code Expo Go)
npm start

# Lancer sur Android
npm run android

# Lancer sur iOS
npm run ios

# Lancer dans le navigateur
npm run web
```

Scannez le QR code avec l'application **Expo Go** sur votre téléphone.

## Structure du projet

```
one-million-global-app/
├── App.js               # Composant principal de l'application
├── app.json             # Configuration Expo (identifiants Android/iOS inclus)
├── eas.json             # Profils de build EAS (preview, production)
├── babel.config.js      # Configuration Babel
├── package.json         # Dépendances et scripts
├── codemagic.yaml       # Build automatique via Codemagic (EAS)
├── .gitignore           # Fichiers ignorés par Git
├── assets/
│   ├── icon.png         # Icône de l'application (1024×1024)
│   ├── splash.png       # Écran de démarrage (1242×2436)
│   ├── adaptive-icon.png# Icône adaptive Android (1024×1024)
│   └── favicon.png      # Favicon web (196×196)
└── .github/
    └── workflows/
        └── expo.yml     # CI/CD GitHub Actions — build EAS automatique
```

## Identifiants de l'application

| Plateforme | Identifiant |
|---|---|
| Android (`package`) | `com.onemillionglobal.app` |
| iOS (`bundleIdentifier`) | `com.onemillionglobal.app` |

Ces identifiants sont déjà configurés dans `app.json`.

## Build automatique (GitHub Actions + EAS)

À chaque push sur `main`, GitHub Actions génère automatiquement un APK Android via EAS.

**Pour activer le build automatique :**
1. Créez un compte sur [expo.dev](https://expo.dev)
2. Générez un token : **Account Settings → Access Tokens → Create Token**
3. Ajoutez-le dans GitHub : **Settings → Secrets → Actions → New secret**
   - Nom : `EXPO_TOKEN`
   - Valeur : votre token Expo

## Build Android (via Codemagic)

Le projet est également configuré pour générer un APK Android via [Codemagic](https://codemagic.io). Voir `codemagic.yaml` pour la configuration.

## Licence

© 2024 One Million Global. Tous droits réservés.
