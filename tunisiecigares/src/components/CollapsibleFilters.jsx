// Collapsible Filters Component - Accordion-style filters for mobile
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CollapsibleFilters({ children, title = 'Filters', defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-cocoa/60 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-cocoa/20 hover:bg-cocoa/30 transition-base text-left"
        aria-expanded={isOpen}
        aria-controls="filters-content"
      >
        <span className="font-semibold text-white">{title}</span>
        <ChevronDown
          className={`w-5 h-5 text-gold transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div
        id="filters-content"
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
