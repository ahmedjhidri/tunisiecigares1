import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section
      className="relative"
      aria-label="Cigar Lounge Tunisia hero section"
    >
      <div
        className="h-[60vh] min-h-[420px] w-full bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516570161787-2fd917215a3d?q=80&w=2400&auto=format&fit=crop')",
        }}
        role="img"
        aria-label="Elegant cigar background"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ebony via-ebony/40 to-transparent" />
      <div className="container-page absolute inset-0 flex items-end pb-12">
        <div>
          <h1 className="title-gold text-4xl sm:text-5xl md:text-6xl">Cigar Lounge Tunisia</h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            Discover an elegant selection of premium cigars. Order easily via Messenger.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <Link to="/products" className="btn-primary">View Our Products</Link>
            <a href="https://m.me/100093202210414" target="_blank" rel="noreferrer" className="btn-secondary">Message Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}


