// tunisiecigares/src/components/Header.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartIcon from './CartIcon.jsx';
import Logo from './Logo.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Our Cigars' },
    { to: '/accessories', label: 'Accessories' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-cocoa/60 bg-ebony/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" aria-label="Go to homepage">
          <Logo size="md" variant="full" />
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
          <CartIcon />
          <a
            href="https://facebook.com/CigarLoungeTunisia"
            target="_blank"
            rel="noreferrer"
            className="text-white/80 hover:text-gold transition-base"
            aria-label="Ouvrir la page Facebook officielle"
            title="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.01 3.66 9.17 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.77 8.44-4.93 8.44-9.94Z" />
            </svg>
          </a>
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

        <div className="md:hidden flex items-center gap-3">
          <CartIcon />
          <button
            className="inline-flex items-center justify-center p-2 rounded border border-cocoa/60 text-white/90 hover:text-gold transition-base"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path fillRule="evenodd" d="M3.75 5.25h16.5a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5zm0 6h16.5a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5zm0 6h16.5a.75.75 0 010 1.5H3.75a.75.75 0 010-1.5z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
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
            <a
              href="https://facebook.com/CigarLoungeTunisia"
              target="_blank"
              rel="noreferrer"
              className="text-white/90 hover:text-gold transition-base"
              onClick={() => setOpen(false)}
            >
              Facebook
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
