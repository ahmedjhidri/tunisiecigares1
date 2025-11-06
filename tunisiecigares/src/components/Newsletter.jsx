// src/components/Newsletter.jsx
import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Integrate with your email service (Mailchimp, SendGrid, etc.)
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-gradient-to-r from-gold/10 to-amber/10 border border-gold/20 rounded-xl p-8">
      <div className="max-w-2xl mx-auto text-center">
        <Mail className="w-12 h-12 text-gold mx-auto mb-4" />
        <h3 className="title-gold text-2xl mb-2">Stay in the Loop</h3>
        <p className="text-white/70 mb-6">
          Subscribe to our newsletter for exclusive offers, new arrivals, and cigar tips.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 text-success">
            <CheckCircle className="w-5 h-5" />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 bg-ebony/50 border border-cocoa/60 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-gold"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-error text-sm mt-3">
            Something went wrong. Please try again.
          </p>
        )}

        <p className="text-white/50 text-xs mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}

