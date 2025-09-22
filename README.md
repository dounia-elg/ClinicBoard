# ClinicBoard - Système de Gestion de Cabinet Médical

## 📋 À Propos
ClinicBoard est une application web monopage (SPA) conçue pour la gestion complète d'un cabinet médical. Elle permet de gérer les patients, les rendez-vous et les finances, le tout en local avec persistance des données via LocalStorage.

## 🌟 Fonctionnalités Principales

### 🔐 Authentification & Sécurité
- Protection par mot de passe (hashé)
- Verrouillage après plusieurs tentatives échouées
- Données stockées de manière sécurisée en local

### 👥 Gestion des Patients
- Ajout, modification et suppression de patients
- Recherche par nom ou téléphone
- Historique des rendez-vous par patient
- Informations détaillées (contact, notes)

### 📅 Gestion des Rendez-vous
- Planification complète (patient, praticien, salle)
- Modification des détails et statuts
- Filtrage par praticien/statut
- Vue agenda journalière

### 💰 Finance
- Suivi des recettes et dépenses
- Catégorisation des transactions
- Rapports mensuels
- Objectifs budgétaires

## 🛠 Technologies Utilisées
- HTML5
- CSS3
- JavaScript (ES6+)
- LocalStorage pour la persistance
- Modules ES6

## 🏗 Structure du Projet
```
ClinicBoard/
├── auth/
│   └── auth.js
├── components/
│   ├── appointments.js
│   ├── dashboard.js
│   ├── finance.js
│   ├── login.js
│   └── patients.js
├── router/
│   └── router.js
├── storage/
│   └── dataManager.js
├── styles/
│   └── style.css
├── index.html
└── app.js
|__ README.md
```

## 🚀 Installation et Démarrage

1. Clonez le repository :
```bash
git clone https://github.com/dounia-elg/clinicboard.git
```

2. Ouvrez le projet :
```bash
cd clinicboard
```

3. Lancez l'application avec un serveur local (comme Live Server dans VS Code)

## 💾 Stockage des Données
- Utilisation exclusive du LocalStorage
- Clé unique : `clinicApp:data`
- Structure JSON organisée

## 🔒 Sécurité
- Hachage du mot de passe
- Validation des données
- Protection contre les injections

## 📱 Responsive Design
- Interface adaptative
- Design mobile-first
- Navigation optimisée

## ⚙️ Configuration
Première utilisation :
1. Créez un mot de passe administrateur
2. Configurez les informations du cabinet
3. Commencez à utiliser l'application

## 🤝 Contribution
1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 👥 Contact
Lien du projet : [https://github.com/dounia-elg/clinicboard](https://github.com/votre-username/clinicboard)