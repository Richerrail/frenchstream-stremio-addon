#!/bin/bash

echo "╔════════════════════════════════════════════╗"
echo "║  🇫🇷 Installation FrenchStream Addon 🇫🇷   ║"
echo "╚════════════════════════════════════════════╝"
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js n'est pas installé !"
    echo "📥 Installe Node.js : https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Installation des dépendances
echo "📦 Installation des dépendances..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation réussie !"
    echo ""
    echo "🚀 Pour démarrer l'addon :"
    echo "   npm start"
    echo ""
    echo "📺 Puis dans Stremio, ajoute cette URL :"
    echo "   http://localhost:7000/manifest.json"
    echo ""
    echo "🎬 Bon streaming !"
else
    echo ""
    echo "❌ Erreur lors de l'installation"
    echo "Vérifie ta connexion internet et réessaie"
    exit 1
fi
