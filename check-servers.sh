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
        lsof -i :$port | head -3
    else
        echo "Port $port : libre"
    fi
done
echo ""
echo "💾 Cache :"
du -sh .next 2>/dev/null || echo ".next : n'existe pas"
du -sh node_modules/.cache 2>/dev/null || echo "node_modules/.cache : n'existe pas"
echo ""
echo "🚀 Pour nettoyer et redémarrer : ./kill-and-run.sh"
