import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section
      className="relative"
      aria-label="Tunisie Cigares hero section"
    >
      <div
        className="h-[60vh] min-h-[420px] w-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/images/products/fondécrant1.webp')",
        }}
        role="img"
        aria-label="Elegant cigar background"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ebony/80 via-ebony/20 to-transparent" />
      <div className="container-page absolute inset-0 flex items-end pb-12">
        <div className="relative z-10 bg-black/40 backdrop-blur-sm px-6 py-4 rounded-lg border border-gold/20">
          <h1 className="title-gold text-4xl sm:text-5xl md:text-6xl drop-shadow-lg">Tunisie Cigares</h1>
          <p className="mt-3 text-white/90 max-w-2xl drop-shadow-md">
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


