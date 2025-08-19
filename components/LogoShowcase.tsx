'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import { Download, Eye } from 'lucide-react';

interface LogoVariant {
  name: string;
  variant: 'full' | 'icon' | 'text';
  theme: 'default' | 'white' | 'grayscale';
  filename: string;
  description: string;
}

const logoVariants: LogoVariant[] = [
  {
    name: 'Logo Complet',
    variant: 'full',
    theme: 'default',
    filename: 'fulllogo_nobuffer.png',
    description: 'Version complète avec couleurs originales'
  },
  {
    name: 'Logo Complet Transparent',
    variant: 'full',
    theme: 'white',
    filename: 'fulllogo_transparent_nobuffer.png',
    description: 'Version complète avec fond transparent'
  },
  {
    name: 'Icône Seule',
    variant: 'icon',
    theme: 'default',
    filename: 'icononly_nobuffer.png',
    description: 'Icône seule pour les petits espaces'
  },
  {
    name: 'Texte Seul',
    variant: 'text',
    theme: 'default',
    filename: 'textonly_nobuffer.png',
    description: 'Texte seul pour les utilisations minimalistes'
  },
  {
    name: 'Version Niveaux de Gris',
    variant: 'full',
    theme: 'grayscale',
    filename: 'grayscale_nobuffer.png',
    description: 'Version en niveaux de gris'
  }
];

export default function LogoShowcase() {
  const [selectedLogo, setSelectedLogo] = useState<LogoVariant | null>(null);

  const downloadLogo = (filename: string) => {
    const link = document.createElement('a');
    link.href = `/branding/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-dark-100 rounded-xl p-6">
      <h3 className="text-2xl font-bold gradient-text mb-6">Ressources de Branding</h3>
      
      {/* Grille des logos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {logoVariants.map((logoVar, index) => (
          <div 
            key={index}
            className="glass p-4 rounded-lg hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedLogo(logoVar)}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white/5 p-4 rounded-lg group-hover:bg-white/10 transition-colors">
                <Logo 
                  variant={logoVar.variant}
                  theme={logoVar.theme}
                  size="lg"
                  className="opacity-90 group-hover:opacity-100"
                />
              </div>
              
              <div className="text-center">
                <h4 className="font-semibold text-white mb-1">{logoVar.name}</h4>
                <p className="text-sm text-gray-400">{logoVar.description}</p>
              </div>
              
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLogo(logoVar);
                  }}
                  className="flex items-center space-x-1 text-primary hover:text-primary-600 transition-colors"
                >
                  <Eye size={16} />
                  <span className="text-sm">Voir</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadLogo(logoVar.filename);
                  }}
                  className="flex items-center space-x-1 text-green-400 hover:text-green-300 transition-colors"
                >
                  <Download size={16} />
                  <span className="text-sm">Télécharger</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de prévisualisation */}
      {selectedLogo && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedLogo(null)}
        >
          <div 
            className="glass max-w-2xl w-full p-6 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedLogo.name}</h3>
                <p className="text-gray-400">{selectedLogo.description}</p>
              </div>
              <button
                onClick={() => setSelectedLogo(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="flex flex-col items-center space-y-6">
              <div className="bg-white/5 p-8 rounded-lg">
                <Logo 
                  variant={selectedLogo.variant}
                  theme={selectedLogo.theme}
                  size="xl"
                />
              </div>
              
              <button
                onClick={() => downloadLogo(selectedLogo.filename)}
                className="gradient-primary text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center space-x-2"
              >
                <Download size={20} />
                <span>Télécharger {selectedLogo.filename}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
