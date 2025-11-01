# 🛠️ Guide de Dépannage - Serveurs Next.js Multiples

## Problème : Versions différentes sur différents ports

### Symptômes
- Le site affiche une version sur `localhost:3000`
- Une autre version sur `localhost:3001`, `3002`, etc.
- Les modifications ne se reflètent pas malgré les redémarrages
- Plusieurs serveurs Next.js tournent simultanément

### Cause
Plusieurs instances de serveurs Next.js tournent en parallèle sur différents ports, chacune servant une version différente du code (souvent mise en cache).

---

## 🚨 Solution Rapide

### Méthode 1 : Script automatique
```bash
./kill-and-run.sh
```

### Méthode 2 : Commandes manuelles

#### 1. Identifier les processus
```bash
# Voir tous les processus Next.js/Node
ps aux | grep -E "next|node.*dev" | grep -v grep

# Voir quels ports sont occupés
lsof -i :3000,3001,3002,3003,3004,3005
```

#### 2. Tuer TOUS les serveurs
```bash
# Tuer par nom de processus
pkill -f "next"
pkill -f "postcss"

# Tuer par PID (remplacer par les vrais PID)
kill -9 [PID1] [PID2] [PID3]

# Tuer par port
lsof -ti:3000,3001,3002,3003,3004,3005 | xargs kill -9 2>/dev/null || true
```

#### 3. Nettoyer le cache
```bash
cd /Users/olimservice/yapio-website/yapio-website
rm -rf .next
rm -rf node_modules/.cache
```

#### 4. Redémarrer proprement
```bash
PORT=3000 npm run dev
```

---

## 🔧 Solution Détaillée

### Étape 1 : Diagnostic complet
```bash
# 1. Lister tous les processus Node/Next
echo "=== Processus Next.js actifs ==="
ps aux | grep -E "next|node.*dev" | grep -v grep

# 2. Vérifier les ports occupés
echo "=== Ports occupés ==="
lsof -i :3000,3001,3002,3003,3004,3005

# 3. Vérifier l'état du cache
echo "=== Taille du cache ==="
du -sh .next 2>/dev/null || echo "Pas de cache .next"
du -sh node_modules/.cache 2>/dev/null || echo "Pas de cache node_modules"
```

### Étape 2 : Nettoyage agressif
```bash
# 1. Tuer TOUS les processus liés
echo "🔪 Arrêt de tous les serveurs..."
pkill -f "next" 2>/dev/null || true
pkill -f "postcss" 2>/dev/null || true
ps aux | grep -E "next.*dev|node.*next" | grep -v grep | awk '{print $2}' | xargs kill -9 2>/dev/null || true

# 2. Libérer tous les ports
echo "🔓 Libération des ports..."
for port in 3000 3001 3002 3003 3004 3005; do
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
done

# 3. Attendre que tout se termine
sleep 3

# 4. Vérifier qu'il n'y a plus rien
echo "✅ Vérification..."
ps aux | grep -E "next|node.*dev" | grep -v grep || echo "Aucun serveur trouvé"
```

### Étape 3 : Nettoyage du cache
```bash
echo "🧹 Nettoyage du cache..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo 2>/dev/null || true
echo "✅ Cache nettoyé"
```

### Étape 4 : Redémarrage propre
```bash
echo "🚀 Redémarrage du serveur..."
PORT=3000 npm run dev
```

---

## 🚀 Scripts Utiles

### Script de diagnostic (`check-servers.sh`)
```bash
#!/bin/bash
echo "=== DIAGNOSTIC SERVEURS NEXT.JS ==="
echo ""
echo "📊 Processus actifs :"
ps aux | grep -E "next|node.*dev" | grep -v grep || echo "Aucun processus trouvé"
echo ""
echo "🔌 Ports occupés :"
for port in 3000 3001 3002 3003 3004 3005; do
    if lsof -i :$port >/dev/null 2>&1; then
        echo "Port $port : OCCUPÉ"
        lsof -i :$port
    else
        echo "Port $port : libre"
    fi
done
echo ""
echo "💾 Cache :"
du -sh .next 2>/dev/null || echo ".next : n'existe pas"
du -sh node_modules/.cache 2>/dev/null || echo "node_modules/.cache : n'existe pas"
```

### Script de nettoyage complet (`deep-clean.sh`)
```bash
#!/bin/bash
echo "🧹 NETTOYAGE COMPLET"

# Tuer tous les processus
echo "Arrêt des processus..."
pkill -f "next" 2>/dev/null || true
pkill -f "postcss" 2>/dev/null || true
for port in 3000 3001 3002 3003 3004 3005; do
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
done

# Nettoyer tous les caches
echo "Nettoyage des caches..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .turbo
rm -rf out

# Réinstaller les dépendances si nécessaire
echo "Vérification des dépendances..."
npm ci

echo "✅ Nettoyage terminé"
```

---

## 🔍 Prévention

### Bonnes pratiques
1. **Toujours utiliser le même port** : `PORT=3000 npm run dev`
2. **Un seul terminal** : N'ouvrez qu'un seul terminal pour le serveur
3. **Fermer proprement** : Utilisez `Ctrl+C` pour arrêter le serveur
4. **Vérifier avant de relancer** : `ps aux | grep next` avant de redémarrer

### Alias utiles à ajouter dans votre `.zshrc` ou `.bashrc`
```bash
# Alias pour le développement Next.js
alias next-check="ps aux | grep -E 'next|node.*dev' | grep -v grep"
alias next-kill="pkill -f next && lsof -ti:3000,3001,3002,3003 | xargs kill -9 2>/dev/null || true"
alias next-clean="rm -rf .next node_modules/.cache && echo 'Cache nettoyé'"
alias next-start="next-kill && next-clean && sleep 2 && PORT=3000 npm run dev"
```

---

## ⚠️ En cas d'urgence

Si rien ne fonctionne, redémarrage complet :

```bash
# 1. Tuer TOUT ce qui touche à Node
sudo pkill -f node

# 2. Nettoyer complètement
rm -rf .next node_modules/.cache .turbo out

# 3. Réinstaller
npm ci

# 4. Redémarrer
PORT=3000 npm run dev
```

---

## 📞 Aide supplémentaire

- **Vérifier les processus en arrière-plan** : `jobs`
- **Tuer un job spécifique** : `kill %1` (remplacer 1 par le numéro du job)
- **Voir tous les ports occupés** : `netstat -tulpn | grep :300`
- **Redémarrer complètement le système** si tout échoue

---

*Dernière mise à jour : Novembre 2024*
