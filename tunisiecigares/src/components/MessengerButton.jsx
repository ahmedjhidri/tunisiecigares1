const MESSENGER_URL = 'https://m.me/100093202210414';

export default function MessengerButton() {
  const openMessenger = () => {
    window.open(MESSENGER_URL, '_blank');
  };

  return (
    <button
      onClick={openMessenger}
      aria-label="Open Messenger chat"
      className="fixed bottom-6 right-6 rounded-full bg-gold text-ebony shadow-lg hover:brightness-110 transition-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
      style={{ width: 56, height: 56 }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto">
        <path d="M12 2C6.201 2 1.5 6.159 1.5 11.3c0 2.78 1.378 5.277 3.573 6.961V22l3.27-1.794c1.07.297 2.208.46 3.356.46 5.799 0 10.5-4.159 10.5-9.3S17.799 2 12 2Zm1.013 10.597 2.925-3.105a.75.75 0 0 1 1.06-.03l1.883 1.77a.75.75 0 0 1-.126 1.187l-2.925 1.95a1.5 1.5 0 0 1-1.746-.082l-1.244-.99a.75.75 0 0 0-1.005.06l-2.925 3.105a.75.75 0 0 1-1.06.03l-1.883-1.77a.75.75 0 0 1 .126-1.187l2.925-1.95a1.5 1.5 0 0 1 1.746.082l1.244.99a.75.75 0 0 0 1.005-.06Z" />
      </svg>
    </button>
  );
}


