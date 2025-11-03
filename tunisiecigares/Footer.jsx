export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-cocoa/60 bg-ebony">
      <div className="container-page py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="title-gold text-xl mb-2">Cigar Lounge Tunisia</h3>
          <p className="text-white/70">Premium selection, concierge ordering via Messenger.</p>
        </div>
        <div>
          <h4 className="font-display text-gold mb-2">Follow</h4>
          <ul className="space-y-1 text-white/80">
            <li><a className="hover:text-gold transition-base" href="#" aria-label="Facebook">Facebook</a></li>
            <li><a className="hover:text-gold transition-base" href="#" aria-label="Instagram">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-gold mb-2">Legal & Notice</h4>
          <p className="text-sm text-white/70">Sales reserved for adults — enjoy responsibly. No online payment — orders via Messenger only.</p>
        </div>
      </div>
      <div className="border-t border-cocoa/60 text-center py-4 text-white/60 text-sm">
        © {year} Cigar Lounge Tunisia
      </div>
    </footer>
  );
}


