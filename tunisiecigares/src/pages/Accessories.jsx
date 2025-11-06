export default function Accessories() {
  const items = [
    { id: 'lighter', name: 'Butane Lighter', price_TND: 35, desc: 'Windproof lighter with adjustable flame.' },
    { id: 'cutter', name: 'Double Guillotine Cutter', price_TND: 25, desc: 'Stainless steel, sharp and precise.' },
    { id: 'humidor', name: 'Desktop Humidor (25ct)', price_TND: 220, desc: 'Spanish cedar lining, hygrometer included.' },
  ];

  return (
    <div className="container-page py-12">
      <h1 className="title-gold text-3xl">Accessories</h1>
      <p className="text-white/80 mt-2">Complete your experience with premium accessories.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {items.map(i => (
          <div key={i.id} className="card p-5 flex flex-col gap-2">
            <div className="font-display text-lg text-gold">{i.name}</div>
            <div className="text-white/70 text-sm">{i.desc}</div>
            <div className="text-gold font-semibold mt-2">{i.price_TND} TND</div>
          </div>
        ))}
      </div>
    </div>
  );
}


