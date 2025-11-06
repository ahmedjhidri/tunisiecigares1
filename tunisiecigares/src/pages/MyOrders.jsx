import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function MyOrders() {
  const [email, setEmail] = useState('');
  const [ref, setRef] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    if (!supabase) return;
    setLoading(true);
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(50);
    if (email) query = query.ilike('email', email);
    if (ref) query = query.eq('order_ref', ref);
    const { data, error } = await query;
    setLoading(false);
    if (error) return console.error(error);
    setOrders(data || []);
  }

  useEffect(() => { /* no-op */ }, []);

  return (
    <div className="container-page py-12">
      <h1 className="title-gold text-3xl">My Orders</h1>
      <p className="text-white/70 mt-2">Enter your email and/or order reference.</p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white" />
        <input type="text" placeholder="Order reference (e.g., CLT-...)" value={ref} onChange={e=>setRef(e.target.value)} className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white" />
        <button className="btn-primary" onClick={search} disabled={loading}>{loading ? 'Loading…' : 'Search'}</button>
      </div>

      <div className="mt-8 space-y-4">
        {orders.map(o => (
          <div key={o.id} className="card p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white/80 text-sm">{new Date(o.created_at).toLocaleString()}</div>
                <div className="text-gold font-semibold">Order {o.order_ref || o.id} • {o.total} TND</div>
                <div className="text-white/60 text-sm">Status: {o.status || 'pending'}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1">
              {(o.order_items || []).map((it, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-white/80">{it.quantity} × {it.product_name}</span>
                  <span className="text-gold">{it.subtotal} TND</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {orders.length === 0 && !loading && (
          <p className="text-white/60">No orders found.</p>
        )}
      </div>
    </div>
  );
}


