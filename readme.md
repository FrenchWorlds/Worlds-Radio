# Worlds Radio

**Worlds Radio** est un ajout incroyable pour les serveurs Discord, permettant aux utilisateurs de profiter d'une expérience musicale unique en temps réel. Ce bot Discord facilite l'écoute de radio via des intégrations avec des plateformes de streaming populaires.

## Table des matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Développement](#développement)
- [Contributions](#contributions)
- [License](#license)
- [Contact](#contact)

## Installation

Pour installer et configurer **Worlds Radio**, suivez les étapes ci-dessous :

### Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [NPM](https://www.npmjs.com/) (ou [Yarn](https://yarnpkg.com/))

### Étapes

1. **Clonez le dépôt :**

   ```bash
   git clone https://github.com/votre-utilisateur/Worlds-Radio.git
   cd Worlds-Radio
   ```

2. **Installez les dépendances :**

   ```bash
   npm install
   ```

3. **Configurez vos variables d'environnement :**

   Créez un fichier `.env` à la racine du projet et ajoutez les variables suivantes :

   ```plaintext
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_CLIENT_SECRET=your_discord_client_secret
   DISCORD_REDIRECT_URI=http://localhost:3000/auth/discord/callback
   API_KEY=your_api_key
   ```

4. **Démarrez le serveur :**

   ```bash
   npm start
   ```

## Configuration

### Variables d'environnement

Assurez-vous d'ajouter les variables d'environnement nécessaires dans le fichier `.env` :

- `DISCORD_CLIENT_ID`: Votre ID client Discord pour OAuth2.
- `DISCORD_CLIENT_SECRET`: Votre secret client Discord pour OAuth2.
- `DISCORD_REDIRECT_URI`: L'URL de redirection pour le processus d'authentification OAuth2.
- `API_KEY`: Clé API pour accéder aux données externes (par exemple, pour la récupération des guildes).

## Utilisation

### Authentification

1. Cliquez sur le bouton **"Se connecter"** pour commencer le processus d'authentification via Discord.
2. Autorisez l'application à accéder à votre compte Discord.
3. Vous serez redirigé vers la page d'accueil où vous pourrez voir vos guildes.

### Fonctionnalités

- **Afficher les guildes** : Une fois connecté, les guildes de l'utilisateur sont affichées avec des informations supplémentaires.
- **Envoyer des messages** : Utilisez le champ de saisie pour envoyer des messages à un webhook Discord.

## Développement

### Structure du Projet

- **`public/`** : Contient les fichiers statiques tels que les images et les feuilles de style.
- **`scripts/`** : Contient les scripts JavaScript pour le fonctionnement de l'application.

### Tests

Ajoutez des tests pour garantir la qualité du code. Utilisez un framework de test comme Jest ou Mocha pour les tests unitaires.

### Lancer les Tests

```bash
npm test
```

## Contributions

Les contributions sont les bienvenues ! Si vous souhaitez contribuer, veuillez suivre ces étapes :

1. **Forkez le dépôt**.
2. **Créez une branche** pour votre fonctionnalité ou correction de bug (`git checkout -b feature/ma-fonctionnalité`).
3. **Effectuez des modifications** et validez-les (`git commit -am 'Ajout d\'une fonctionnalité'`).
4. **Poussez la branche** (`git push origin feature/ma-fonctionnalité`).
5. **Ouvrez une pull request** sur GitHub.

## License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
