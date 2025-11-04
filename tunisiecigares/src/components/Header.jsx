import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartIcon from './CartIcon.jsx'; // ← AJOUTE

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
          <CartIcon /> {/* ← AJOUTE L'ICÔNE PANIER */}
          
            href="https://m.me/100093202210414"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            aria-label="Open Messenger to send us a message"
          >
            Message
          </a>
        </nav>

        {/* Menu mobile reste pareil... */}
      </div>
    </header>
  );
}
