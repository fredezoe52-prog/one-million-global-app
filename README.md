# One Million Global

Application mobile de conversion de devises USD → EUR construite avec React Native et Expo.

---

## ✅ État des 9 modules — 100% terminés

| # | Module | Fichier(s) | Statut |
|---|---|---|---|
| 1 | **Navigation** — conteneur + 3 onglets (Convertir / Historique / Info) | `App.js` | ✅ Terminé |
| 2 | **Convertisseur** — saisie, validation, calcul avec frais, résultat détaillé | `screens/ConverterScreen.js` | ✅ Terminé |
| 3 | **Historique** — liste persistante, rechargée à chaque visite, effacement confirmé | `screens/HistoryScreen.js` | ✅ Terminé |
| 4 | **Informations** — taux live, explication des frais, lien API | `screens/InfoScreen.js` | ✅ Terminé |
| 5 | **Backend API** — taux live open.er-api.com, cache 10 min, rafraîchissement forcé, validation, calcul | `utils/api.js` | ✅ Terminé |
| 6 | **Stockage local** — AsyncStorage partagé, chargement / sauvegarde / effacement | `utils/storage.js` | ✅ Terminé |
| 7 | **Configuration Expo** — nom, icônes, splash, orientations, identifiants iOS + Android | `app.json`, `babel.config.js`, `eas.json` | ✅ Terminé |
| 8 | **Assets visuels** — icône 1024×1024, splash 1242×2436, adaptive-icon, favicon (thème marine/or) | `assets/` | ✅ Terminé |
| 9 | **CI/CD & Build** — GitHub Actions EAS + Codemagic, `.gitignore`, dépendances | `.github/workflows/expo.yml`, `codemagic.yaml`, `package.json` | ✅ Terminé |

> **Une seule action manuelle requise pour le build automatique :**
> Ajouter le secret `EXPO_TOKEN` dans **GitHub → Settings → Secrets → Actions → New secret**
> (voir section *Build automatique* plus bas)

---

## Fonctionnalités

- Conversion USD → EUR avec frais de service de **4,99 $** déduits automatiquement _(défini dans `utils/api.js` — `FEE_USD`)_
- Taux de change en **temps réel** (open.er-api.com) avec indicateur live/repli
- Bouton **↻ rafraîchir** le taux sans redémarrer l'application
- **Historique persistant** des 20 dernières conversions — conservé après fermeture de l'app _(limite définie dans `screens/ConverterScreen.js` — `MAX_HISTORY`)_
- Chaque entrée d'historique est **copiable** (long-appui)
- **Effacement avec confirmation** de tout l'historique
- Écran d'information complet avec explication de la formule

---

## Architecture

```
App.js                          ← Module 1 : Navigation (NavigationContainer + BottomTabs)
│
├── screens/
│   ├── ConverterScreen.js      ← Module 2 : Convertisseur (frontend)
│   ├── HistoryScreen.js        ← Module 3 : Historique (frontend)
│   └── InfoScreen.js           ← Module 4 : Informations (frontend)
│
├── utils/
│   ├── api.js                  ← Module 5 : Backend API (taux, validation, calcul, cache)
│   └── storage.js              ← Module 6 : Stockage local (AsyncStorage)
│
├── app.json / babel.config.js / eas.json   ← Module 7 : Configuration Expo
├── assets/                                  ← Module 8 : Assets visuels
└── .github/workflows/ + codemagic.yaml     ← Module 9 : CI/CD & Build
```

---

## Flux de données

```
Utilisateur saisit un montant
       │
       ▼
ConverterScreen.js
  → validateAmount(str)         [utils/api.js — Module 5]
  → convertUsdToEur(usd, rate)  [utils/api.js — Module 5]
  → saveHistory(entries)        [utils/storage.js — Module 6]
       │
       ▼
HistoryScreen.js
  → loadHistory()               [utils/storage.js — Module 6]  ← recharge à chaque visite d'onglet
```

---

## Prérequis

- [Node.js](https://nodejs.org/) v18+
- [EAS CLI](https://docs.expo.dev/build/introduction/) : `npm install -g eas-cli`

## Installation

```bash
git clone https://github.com/fredezoe52-prog/one-million-global-app.git
cd one-million-global-app
npm install
```

## Démarrage

```bash
npm start          # QR code Expo Go (Android + iOS)
npm run android    # Émulateur Android
npm run ios        # Simulateur iOS (macOS requis)
npm run web        # Navigateur web
```

---

## Identifiants de l'application

| Plateforme | Identifiant |
|---|---|
| Android (`package`) | `com.onemillionglobal.app` |
| iOS (`bundleIdentifier`) | `com.onemillionglobal.app` |

---

## Build automatique (Module 9 — CI/CD)

À chaque push sur `main`, GitHub Actions génère automatiquement un APK Android via EAS.

**Pour activer :**
1. Créez un compte sur [expo.dev](https://expo.dev)
2. Générez un token : **Account Settings → Access Tokens → Create Token**
3. Ajoutez-le dans GitHub : **Settings → Secrets → Actions → New secret**
   - Nom : `EXPO_TOKEN`
   - Valeur : votre token Expo

Le projet est également configuré pour Codemagic (`codemagic.yaml`).

---

© 2024 One Million Global. Tous droits réservés.
