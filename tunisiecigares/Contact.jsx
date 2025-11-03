import { useState } from 'react';
import { showToast } from './Toast.jsx';

const MESSENGER_URL = 'https://m.me/100093202210414';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setForm({ name: '', email: '', message: '' });
      showToast('Message sent (demo) — we will get back to you.');
    }, 800);
  };

  return (
    <div className="container-page py-12">
      <h1 className="title-gold text-3xl">Contact</h1>
      <p className="text-white/80 mt-2">Reach us anytime via Messenger for quick assistance.</p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="font-display text-gold text-xl">Send a message</h2>
          <p className="text-white/70 mt-1">Preferred: Messenger</p>
          <div className="mt-4 flex gap-2">
            <a className="btn-primary" href={MESSENGER_URL} target="_blank" rel="noreferrer">Open Messenger</a>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-1" htmlFor="name">Name</label>
              <input
                id="name"
                className="w-full rounded border border-cocoa/60 bg-transparent px-3 py-2 focus:outline-none focus:border-gold"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full rounded border border-cocoa/60 bg-transparent px-3 py-2 focus:outline-none focus:border-gold"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1" htmlFor="message">Message</label>
              <textarea
                id="message"
                className="w-full rounded border border-cocoa/60 bg-transparent px-3 py-2 h-28 focus:outline-none focus:border-gold"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <button className="btn-secondary" disabled={loading}>{loading ? 'Sending…' : 'Send (demo)'}</button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="card p-6">
            <h3 className="font-display text-gold text-lg">WhatsApp</h3>
            <p className="text-white/70 mt-1">+216 00 000 000 (placeholder)</p>
          </div>
          <div className="card p-6">
            <h3 className="font-display text-gold text-lg">Address</h3>
            <p className="text-white/70 mt-1">Tunis, Tunisia (placeholder)</p>
          </div>
        </div>
      </div>
    </div>
  );
}


