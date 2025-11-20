// Trust Badges Component - Badges de confiance
import { Truck, Shield, Clock, Award } from 'lucide-react';

export default function TrustBadges({ variant = 'default', className = '' }) {
  const badges = [
    {
      icon: Truck,
      title: 'Livraison Rapide',
      description: 'Livraison sous 24-48h',
      color: 'text-blue-400'
    },
    {
      icon: Shield,
      title: 'Garantie Qualité',
      description: 'Produits authentiques garantis',
      color: 'text-green-400'
    },
    {
      icon: Clock,
      title: 'Service 24/7',
      description: 'Disponible sur Messenger',
      color: 'text-gold'
    },
    {
      icon: Award,
      title: 'Premium Selection',
      description: 'Cigares sélectionnés',
      color: 'text-purple-400'
    }
  ];
  
  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div key={index} className="flex items-center gap-2 text-white/70 text-xs">
              <Icon className={`w-4 h-4 ${badge.color}`} />
              <span>{badge.title}</span>
            </div>
          );
        })}
      </div>
    );
  }
  
  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap items-center gap-6 ${className}`}>
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div key={index} className="flex items-center gap-2">
              <Icon className={`w-5 h-5 ${badge.color}`} />
              <div>
                <div className="text-white font-medium text-sm">{badge.title}</div>
                <div className="text-white/60 text-xs">{badge.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  
  // Default: Grid layout
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 rounded-lg bg-cocoa/20 border border-cocoa/40 hover:border-gold/50 transition-base"
          >
            <Icon className={`w-8 h-8 ${badge.color} mb-2`} />
            <h3 className="text-white font-semibold text-sm mb-1">{badge.title}</h3>
            <p className="text-white/60 text-xs">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}

