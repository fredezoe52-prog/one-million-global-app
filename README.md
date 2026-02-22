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

## 🚀 Prochaines étapes pour vous — dans l'ordre

Le code est 100% prêt sur GitHub. Voici exactement ce qu'il vous reste à faire vous-même :

---

### Étape 1 — Fusionner la Pull Request sur GitHub

Le code se trouve sur la branche `copilot/fix-conversation-loss-issue`. Pour le mettre sur `main` :

1. Allez sur [github.com/fredezoe52-prog/one-million-global-app](https://github.com/fredezoe52-prog/one-million-global-app)
2. Cliquez sur **"Compare & pull request"** (ou **"Pull requests"**)
3. Cliquez sur **"Merge pull request"** → **"Confirm merge"**

---

### Étape 2 — Cloner et installer le projet sur votre ordinateur

Ouvrez un terminal et tapez :

```bash
git clone https://github.com/fredezoe52-prog/one-million-global-app.git
cd one-million-global-app
npm install
```

---

### Étape 3 — Tester l'application sur votre téléphone

1. Installez **Expo Go** sur votre téléphone :
   - Android : [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - iPhone : [App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Dans le terminal :
   ```bash
   npm start
   ```

3. Scannez le **QR code** affiché avec Expo Go → l'application s'ouvre sur votre téléphone.

---

### Étape 4 — Créer un compte Expo (gratuit)

Nécessaire pour générer l'APK officiel.

1. Allez sur [expo.dev](https://expo.dev) → **Sign up** (gratuit)
2. Dans le terminal, connectez-vous :
   ```bash
   eas login
   ```
3. Liez votre projet :
   ```bash
   eas init
   ```

---

### Étape 5 — Ajouter le secret EXPO_TOKEN pour le build automatique

Une seule fois, dans GitHub :

1. Sur [expo.dev](https://expo.dev) → **Account Settings → Access Tokens → Create Token**
2. Copiez le token
3. Sur GitHub → **Settings → Secrets and variables → Actions → New repository secret**
   - Nom : `EXPO_TOKEN`
   - Valeur : votre token Expo
4. Désormais, chaque push sur `main` génère automatiquement un APK Android

---

### Étape 6 — Générer votre APK Android (fichier d'installation)

Dans le terminal, depuis le dossier du projet :

```bash
eas build --platform android --profile preview
```

Cela génère un fichier `.apk` que vous pouvez :
- Installer directement sur votre téléphone Android
- Partager avec d'autres personnes

---

### Étape 7 — Publier sur le Google Play Store (optionnel)

Pour rendre l'app disponible publiquement sur Android :

1. Créez un compte **Google Play Developer** : [play.google.com/console](https://play.google.com/console) _(frais d'inscription uniques — vérifiez le montant actuel sur le site)_
2. Générez un build de production :
   ```bash
   eas build --platform android --profile production
   ```
3. Soumettez avec EAS :
   ```bash
   eas submit --platform android
   ```

---

### Résumé

| Étape | Action | Où |
|---|---|---|
| 1 | Fusionner la Pull Request | GitHub |
| 2 | Cloner + `npm install` | Votre ordinateur |
| 3 | Tester avec Expo Go | Votre téléphone |
| 4 | Créer compte Expo + `eas init` | expo.dev + terminal |
| 5 | Ajouter `EXPO_TOKEN` | GitHub Secrets |
| 6 | Générer APK : `eas build --platform android --profile preview` | Terminal |
| 7 | Publier sur Google Play *(optionnel)* | play.google.com/console |

---

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

© 2024 One Million Global. Tous droits réservés.
