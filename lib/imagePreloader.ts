/**
 * Utilitaire pour précharger les images critiques
 * Améliore les performances en préchargeant les images importantes
 */

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Précharge les logos des 3 premiers projets
 */
export function preloadProjectLogos(projects: Array<{ logo: string }>) {
  if (typeof window === 'undefined') return;
  
  const criticalProjects = projects.slice(0, 3);
  criticalProjects.forEach((project) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = project.logo;
    document.head.appendChild(link);
  });
}
