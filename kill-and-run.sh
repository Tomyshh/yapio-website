#!/bin/bash

# Script pour tuer tous les serveurs Next.js et relancer

echo "🔪 Arrêt de tous les serveurs Next.js..."

# Tuer les processus sur les ports communs
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
lsof -ti:3002 | xargs kill -9 2>/dev/null || true
lsof -ti:3003 | xargs kill -9 2>/dev/null || true

# Tuer tous les processus Node liés à Next.js
ps aux | grep -E "next.*dev|node.*next" | grep -v grep | awk '{print $2}' | xargs kill -9 2>/dev/null || true

echo "✅ Anciens serveurs arrêtés"
echo "🧹 Nettoyage du cache Next.js..."

# Supprimer le cache Next.js
rm -rf .next 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

echo "✅ Cache nettoyé"
echo "🚀 Démarrage du serveur de développement..."

sleep 1

# Redémarrer le serveur
npm run dev

