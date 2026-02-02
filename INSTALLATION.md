# 🎯 GUIDE D'INSTALLATION RAPIDE

## 📋 Prérequis

✅ Node.js installé (version 16+)
✅ Stremio installé

---

## 🚀 Installation en 3 étapes

### ÉTAPE 1 : Installation

**Sur Linux :**
```bash
cd frenchstream-addon
./install.sh
```

**Sur Windows :**
```bash
cd frenchstream-addon
npm install
```

### ÉTAPE 2 : Démarrer l'addon

```bash
npm start
```

Tu devrais voir :
```
╔════════════════════════════════════════════╗
║  🇫🇷 FrenchStream Addon by LeoStream 🇫🇷   ║
╠════════════════════════════════════════════╣
║  ✅ Serveur démarré sur le port 7000       ║
║  🌐 URL locale: http://localhost:7000     ║
╚════════════════════════════════════════════╝
```

### ÉTAPE 3 : Ajouter à Stremio

1. Ouvre **Stremio**
2. Clique sur **🧩 Addons** (en haut)
3. Clique sur l'icône **🔗** (en haut à droite, "Community Addons")
4. Dans le champ "Addon Repository Url", entre :
   ```
   http://localhost:7000/manifest.json
   ```
5. Clique sur **Install**
6. L'addon apparaît dans ta liste !

---

## 🎬 Utilisation

### Regarder un film

1. Cherche "Matrix" dans Stremio
2. Clique sur le film
3. Tu verras apparaître :
   - 🇫🇷 VidSrc FR
   - 🎬 VidSrc.to
   - 🎥 VidSrc.me
4. Clique sur une source
5. Profite ! 🍿

### Regarder une série

1. Cherche "Breaking Bad" dans Stremio
2. Sélectionne S1E1
3. Mêmes sources disponibles
4. Binge watching ! 📺

---

## 🔥 ASTUCES PRO

### Laisser tourner en arrière-plan (Linux)

**Avec screen :**
```bash
screen -S frenchstream
npm start
# Puis CTRL+A puis D pour détacher
```

**Avec pm2 :**
```bash
npm install -g pm2
pm2 start addon.js --name frenchstream
pm2 save
```

### Accéder depuis un autre appareil

Si tu veux utiliser l'addon depuis ton téléphone/TV sur le même réseau :

1. Trouve ton IP locale :
   ```bash
   ip addr show  # Linux
   ipconfig      # Windows
   ```
   
2. Dans Stremio (sur téléphone), utilise :
   ```
   http://192.168.X.X:7000/manifest.json
   ```
   (remplace par ton IP)

---

## ❓ PROBLÈMES ?

### Le serveur ne démarre pas

```bash
# Vérifie si le port 7000 est libre
lsof -i :7000  # Linux
netstat -an | findstr 7000  # Windows

# Change de port si besoin (édite addon.js ligne 152)
```

### "No streams found" dans Stremio

- Vérifie que l'addon tourne (`npm start`)
- Regarde les logs dans le terminal
- Teste l'URL dans le navigateur : `http://localhost:7000/manifest.json`

### Les vidéos ne se lancent pas

- Utilise l'**app Stremio** (pas la version web)
- Essaie une autre source
- Active un VPN si les sources sont bloquées

---

## 🌐 HÉBERGER EN LIGNE (Optionnel)

Pour utiliser l'addon partout (pas juste en local) :

### Render.com (GRATUIT)

1. Crée un compte sur https://render.com
2. "New" → "Web Service"
3. Connecte ton repo GitHub
4. Build Command : `npm install`
5. Start Command : `npm start`
6. Deploy !

Ton addon sera dispo sur : `https://ton-app.onrender.com/manifest.json`

### Railway.app (GRATUIT)

1. Va sur https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Sélectionne le repo
4. Deploy automatique !

---

## 📱 Utiliser sur mobile/TV

Une fois hébergé en ligne :

**Android/iOS :**
- Ouvre Stremio
- Addons → 🔗 → Entre ton URL
- Install

**Android TV :**
- Pareil, mais avec la télécommande ! 🎮

---

## 🎉 C'EST TOUT !

Tu as maintenant un addon Stremio complet avec :
- ✅ Films français
- ✅ Séries françaises  
- ✅ 3 sources de backup
- ✅ Catalogues intégrés
- ✅ 100% gratuit

**Bon streaming ! 🍿🎬**
