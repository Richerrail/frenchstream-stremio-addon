# 🇫🇷 FrenchStream Addon pour Stremio

Addon Stremio pour regarder des films et séries en français via VidSrc et autres sources.

## ✨ Fonctionnalités

- ✅ Films en français (HD)
- ✅ Séries en français (toutes saisons/épisodes)
- ✅ Intégration TMDB pour métadonnées
- ✅ 3 sources de backup (VidSrc, VidSrc.to, VidSrc.me)
- ✅ Catalogue de films/séries populaires français
- ✅ Interface Stremio native

## 🚀 Installation

### Prérequis

- Node.js 16+ installé
- Stremio installé sur ton PC/Linux

### Étape 1 : Installation des dépendances

```bash
cd frenchstream-addon
npm install
```

### Étape 2 : Lancer l'addon

```bash
npm start
```

Le serveur démarre sur le port **7000**.

### Étape 3 : Ajouter à Stremio

1. Ouvre **Stremio**
2. Va dans **Addons** (🧩 en haut)
3. Clique sur l'icône **🔗** en haut à droite
4. Entre cette URL :
   ```
   http://localhost:7000/manifest.json
   ```
5. Clique sur **Install**

## 🎬 Utilisation

### Films

1. Cherche un film dans Stremio
2. Clique dessus
3. Tu verras 3 sources disponibles :
   - 🇫🇷 VidSrc FR
   - 🎬 VidSrc.to
   - 🎥 VidSrc.me
4. Clique sur une source pour regarder !

### Séries

1. Cherche une série dans Stremio
2. Sélectionne la saison et l'épisode
3. Tu verras les mêmes 3 sources
4. Profite !

## 📚 Catalogues

L'addon ajoute aussi 2 catalogues :
- **Films Populaires FR** : Top films français
- **Séries Populaires FR** : Top séries françaises

Trouve-les dans l'onglet "Discover" de Stremio.

## ⚙️ Configuration

### Changer le port

Édite `addon.js` ligne 152 :
```javascript
const PORT = 8000; // Change 7000 par ce que tu veux
```

### Ajouter d'autres sources

Dans `addon.js`, tu peux ajouter d'autres serveurs dans la fonction `defineStreamHandler`.

## 🔧 Développement

### Mode développement (auto-reload)

```bash
npm run dev
```

### Structure du projet

```
frenchstream-addon/
├── addon.js         # Fichier principal
├── package.json     # Dépendances
└── README.md        # Ce fichier
```

## 🌐 Héberger en ligne (optionnel)

Pour utiliser l'addon depuis n'importe où :

### Option 1 : Heroku

```bash
# Installer Heroku CLI
heroku create mon-frenchstream-addon
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

Ton URL sera : `https://mon-frenchstream-addon.herokuapp.com/manifest.json`

### Option 2 : Render (gratuit)

1. Va sur https://render.com
2. Connecte ton repo GitHub
3. Crée un nouveau "Web Service"
4. Build Command : `npm install`
5. Start Command : `npm start`
6. Deploy !

### Option 3 : Serveur VPS

```bash
# Sur ton VPS
git clone <ton-repo>
cd frenchstream-addon
npm install
npm install -g pm2
pm2 start addon.js
pm2 save
pm2 startup
```

## 📱 Utiliser sur Android/TV

Si tu héberges l'addon en ligne, tu peux l'utiliser sur :
- Stremio Android
- Stremio Android TV
- Stremio iOS

Même URL : `https://ton-serveur.com/manifest.json`

## 🐛 Problèmes courants

### "No streams found"

- Vérifie que le serveur tourne (`npm start`)
- Vérifie l'URL dans Stremio : `http://localhost:7000/manifest.json`
- Regarde les logs dans le terminal

### "Cannot connect to addon"

- Vérifie que le port 7000 n'est pas bloqué
- Essaie de redémarrer l'addon
- Vérifie ton firewall

### Les streams ne se lancent pas

- Certains navigateurs bloquent les iframes
- Utilise l'app Stremio (pas le web)
- Essaie une autre source (VidSrc.to ou VidSrc.me)

## 💡 Astuces

1. **VPN recommandé** : Utilise un VPN si les sources sont bloquées
2. **Qualité** : Les sources s'adaptent automatiquement
3. **Sous-titres** : Disponibles sur la plupart des contenus
4. **Multi-sources** : Si une source ne marche pas, essaie les autres
5. Prend mon lien render ci-dessous clique sur le lien et clique sur install et voila!!
6. lien render: https://frenchstream-stremio-addon.onrender.com

## 🎯 Fonctionnalités futures

- [ ] Plus de sources françaises
- [ ] Recherche avancée
- [ ] Filtres par genre
- [ ] Cache des résultats
- [ ] Support torrents français

## 📄 Licence

MIT - Fais-en ce que tu veux ! 🎉

## 🙏 Crédits

- **TMDB** pour les métadonnées
- **VidSrc** pour les streams
- **Stremio** pour la plateforme
- **LeoStream** pour l'addon 🚀

---

**Bon streaming ! 🍿🎬**
