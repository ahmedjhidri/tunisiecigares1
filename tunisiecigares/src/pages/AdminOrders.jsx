import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminOrders() {
  const [authed, setAuthed] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('');
  const [q, setQ] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const ok = localStorage.getItem('admin_ok') === '1';
    if (!ok) {
      const pass = window.prompt('Admin password');
      if (pass && import.meta.env.VITE_ADMIN_PASSWORD && pass === import.meta.env.VITE_ADMIN_PASSWORD) {
        localStorage.setItem('admin_ok', '1');
        setAuthed(true);
      }
    } else {
      setAuthed(true);
    }
  }, []);

  useEffect(() => { if (authed) fetchOrders(); }, [authed]);

  async function fetchOrders() {
    if (!supabase) return;
    setLoading(true);
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(200);
    if (status) query = query.eq('status', status);
    if (from) query = query.gte('created_at', from);
    if (to) query = query.lte('created_at', to);
    const { data, error } = await query;
    setLoading(false);
    if (error) return console.error(error);
    setOrders(data || []);
  }

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return orders;
    return orders.filter(o => [o.first_name, o.last_name, o.email].filter(Boolean).some(v => String(v).toLowerCase().includes(qq)));
  }, [orders, q]);

  async function markDelivered(id) {
    if (!supabase) return;
    const { error } = await supabase.from('orders').update({ status: 'delivered' }).eq('id', id);
    if (!error) fetchOrders();
  }

  if (!authed) return <div className="container-page py-12"><p className="text-white/80">Unauthorized</p></div>;

  return (
    <div className="container-page py-12">
      <h1 className="title-gold text-3xl">Admin Orders</h1>

      <div className="mt-6 grid gap-3 md:grid-cols-4">
        <input className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white" placeholder="Search name or email" value={q} onChange={e=>setQ(e.target.value)} />
        <select className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white" value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="delivered">Delivered</option>
        </select>
        <input type="date" className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white" value={from} onChange={e=>setFrom(e.target.value)} />
        <input type="date" className="px-3 py-2 rounded bg-cocoa/30 border border-cocoa/60 text-white" value={to} onChange={e=>setTo(e.target.value)} />
      </div>

      <div className="mt-4 flex gap-2">
        <button className="btn-secondary" onClick={fetchOrders} disabled={loading}>{loading ? 'Loading…' : 'Refresh'}</button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-white/60 border-b border-cocoa/60">
              <th className="text-left py-2 pr-4">ID</th>
              <th className="text-left py-2 pr-4">Created</th>
              <th className="text-left py-2 pr-4">Customer</th>
              <th className="text-left py-2 pr-4">Email</th>
              <th className="text-left py-2 pr-4">Phone</th>
              <th className="text-right py-2 pr-4">Total</th>
              <th className="text-left py-2 pr-4">Status</th>
              <th className="text-left py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-b border-cocoa/60 hover:bg-cocoa/20">
                <td className="py-2 pr-4 whitespace-nowrap">{o.order_ref || o.id}</td>
                <td className="py-2 pr-4 whitespace-nowrap">{new Date(o.created_at).toLocaleString()}</td>
                <td className="py-2 pr-4">{o.first_name} {o.last_name}</td>
                <td className="py-2 pr-4">{o.email}</td>
                <td className="py-2 pr-4">{o.phone}</td>
                <td className="py-2 pr-4 text-right text-gold font-semibold">{o.total} TND</td>
                <td className="py-2 pr-4">{o.status || 'pending'}</td>
                <td className="py-2 pr-4 flex gap-2">
                  <button className="btn-secondary" onClick={()=>setSelected(o)}>View</button>
                  <button className="btn-primary" onClick={()=>markDelivered(o.id)}>Mark delivered</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4" onClick={()=>setSelected(null)}>
          <div className="bg-ebony border border-gold/30 rounded-xl max-w-2xl w-full p-6" onClick={e=>e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="title-gold text-xl">Order {selected.order_ref || selected.id}</h3>
                <p className="text-white/60 text-sm">{new Date(selected.created_at).toLocaleString()}</p>
              </div>
              <button className="text-white/70 hover:text-gold" onClick={()=>setSelected(null)}>✕</button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-gold mb-2">Customer</h4>
                <p className="text-white/80 text-sm">{selected.first_name} {selected.last_name}<br/>{selected.email}<br/>{selected.phone}<br/>{selected.address}</p>
              </div>
              <div>
                <h4 className="text-gold mb-2">Amounts</h4>
                <p className="text-white/80 text-sm">Total: {selected.total} TND</p>
                <p className="text-white/50 text-sm">Status: {selected.status || 'pending'}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-gold mb-2">Items</h4>
              <div className="space-y-2">
                {(selected.order_items || []).map((it, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-white/80">{it.quantity} × {it.product_name}</span>
                    <span className="text-gold">{it.subtotal} TND</span>
                  </div>
                ))}
              </div>
            </div>
            {selected.notes && (
              <div className="mt-4">
                <h4 className="text-gold mb-2">Notes</h4>
                <p className="text-white/80 text-sm">{selected.notes}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


