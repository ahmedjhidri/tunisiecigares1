import { useState, useEffect } from 'react';

export default function AgeVerificationModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    // Session-based age verification (expires when browser closes)
    // Use sessionStorage instead of localStorage for security
    const ageConfirmed = sessionStorage.getItem('ageConfirmed');
    if (!ageConfirmed) {
      setIsVisible(true);
    } else {
      setIsConfirmed(true);
    }
  }, []);

  const handleConfirm = () => {
    // Store in sessionStorage (not localStorage) - expires on browser close
    sessionStorage.setItem('ageConfirmed', 'true');
    setIsConfirmed(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-600 rounded-2xl shadow-2xl p-8">
        {/* Icône d'avertissement */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-yellow-600/20 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-3xl font-bold text-center text-yellow-600 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Vérification d'âge
        </h2>

        {/* Message */}
        <div className="text-center space-y-4 mb-8">
          <p className="text-white text-lg font-semibold">
            Avez-vous 18 ans ou plus ?
          </p>
          <p className="text-gray-400 text-sm">
            La vente de cigares est strictement réservée aux adultes. En confirmant, vous certifiez avoir au moins 18 ans.
          </p>
        </div>

        {/* Avertissement légal */}
        <div className="bg-yellow-600/10 border border-yellow-600/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-200 text-xs leading-relaxed">
            ⚠️ <strong>Avertissement :</strong> Fumer nuit gravement à votre santé et à celle de votre entourage. La vente de tabac aux mineurs est interdite.
          </p>
        </div>

        {/* Boutons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleDecline}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200 border border-gray-700"
          >
            Non, j'ai moins de 18 ans
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-black rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-yellow-600/50"
          >
            Oui, j'ai 18+ ans
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-xs mt-6">
          En continuant, vous acceptez notre politique de vente responsable
        </p>
      </div>
    </div>
  );
}
