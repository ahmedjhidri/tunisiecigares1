import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Our Cigars' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-cocoa/60 bg-ebony/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Go to homepage">
          <span className="title-gold text-xl sm:text-2xl">Cigar Lounge Tunisia</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `font-medium transition-base ${isActive ? 'text-gold' : 'text-white/80 hover:text-gold'}`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <a
            href="https://m.me/100093202210414"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            aria-label="Open Messenger to send us a message"
          >
            Message
          </a>
        </nav>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded border border-cocoa/60 text-white/90 hover:text-gold transition-base"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path fillRule="evenodd" d="M3.75 5.25h16.5a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5zm0 6h16.5a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5zm0 6h16.5a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-cocoa/60 bg-ebony">
          <div className="container-page py-3 flex flex-col gap-3">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `py-2 ${isActive ? 'text-gold' : 'text-white/90 hover:text-gold'} transition-base`
                }
                onClick={() => setOpen(false)}
              >
                {n.label}
              </NavLink>
            ))}
            <a
              href="https://m.me/100093202210414"
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full"
              onClick={() => setOpen(false)}
            >
              Message
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


