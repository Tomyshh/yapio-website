'use client';

import { useState, useEffect } from 'react';
import { seoAnalytics } from '@/lib/seo-analytics';

interface SEOReport {
  score: number;
  issues: string[];
  recommendations: string[];
}

export default function SEODebugger() {
  const [isVisible, setIsVisible] = useState(false);
  const [report, setReport] = useState<SEOReport | null>(null);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    // Afficher uniquement en mode développement
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const updateReport = () => {
      const currentMetrics = seoAnalytics.analyzePage();
      const currentReport = seoAnalytics.generateSEOReport();
      setMetrics(currentMetrics);
      setReport(currentReport);
    };

    // Mise à jour initiale
    setTimeout(updateReport, 2000);

    // Mise à jour périodique
    const interval = setInterval(updateReport, 10000);

    // Raccourci clavier pour afficher/masquer
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isVisible]);

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 backdrop-blur-sm text-white rounded-lg p-4 max-w-md max-h-96 overflow-y-auto shadow-2xl border border-gray-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">🔍 SEO Debugger</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      {report && (
        <div className="space-y-3">
          {/* Score SEO */}
          <div className="bg-gray-800 rounded p-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Score SEO:</span>
              <span className={`font-bold text-xl ${getScoreColor(report.score)}`}>
                {report.score}/100
              </span>
            </div>
          </div>

          {/* Métriques */}
          {metrics && (
            <div className="bg-gray-800 rounded p-3">
              <h4 className="font-medium mb-2">Métriques:</h4>
              <div className="text-sm space-y-1">
                <div>Titre: {metrics.pageTitle.length} chars</div>
                <div>Meta desc: {metrics.metaDescription.length} chars</div>
                <div>H1: {metrics.h1Count} | H2: {metrics.h2Count}</div>
                <div>Images sans alt: {metrics.imagesMissingAlt}</div>
                <div>Mots: {metrics.wordCount}</div>
                <div>Liens int/ext: {metrics.internalLinks}/{metrics.externalLinks}</div>
                {metrics.coreWebVitals.lcp && (
                  <div>LCP: {Math.round(metrics.coreWebVitals.lcp)}ms</div>
                )}
                {metrics.coreWebVitals.cls && (
                  <div>CLS: {metrics.coreWebVitals.cls.toFixed(3)}</div>
                )}
                {metrics.coreWebVitals.fid && (
                  <div>FID: {Math.round(metrics.coreWebVitals.fid)}ms</div>
                )}
              </div>
            </div>
          )}

          {/* Problèmes */}
          {report.issues.length > 0 && (
            <div className="bg-red-900/30 rounded p-3">
              <h4 className="font-medium mb-2 text-red-400">⚠️ Problèmes:</h4>
              <ul className="text-sm space-y-1">
                {report.issues.map((issue, index) => (
                  <li key={index} className="text-red-300">• {issue}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommandations */}
          {report.recommendations.length > 0 && (
            <div className="bg-blue-900/30 rounded p-3">
              <h4 className="font-medium mb-2 text-blue-400">💡 Recommandations:</h4>
              <ul className="text-sm space-y-1">
                {report.recommendations.map((rec, index) => (
                  <li key={index} className="text-blue-300">• {rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-700">
        Ctrl+Shift+S pour afficher/masquer
      </div>
    </div>
  );
}

// Bouton flottant pour activer le debugger
export function SEODebuggerTrigger() {
  const [isVisible, setIsVisible] = useState(false);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 z-40 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
        title="Ouvrir le SEO Debugger (Ctrl+Shift+S)"
      >
        🔍
      </button>
      {isVisible && <SEODebugger />}
    </>
  );
}
