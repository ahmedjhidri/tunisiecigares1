// Breadcrumbs Navigation Component with Structured Data
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function Breadcrumbs({ items = [] }) {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from path if items not provided
  const generateBreadcrumbs = () => {
    if (items.length > 0) return items;
    
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [
      { label: 'Accueil', path: '/' }
    ];
    
    let currentPath = '';
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      
      // Map route names to French labels
      const labelMap = {
        'products': 'Nos Cigares',
        'product': pathnames[index + 1] || 'Produit',
        'cart': 'Panier',
        'contact': 'Contact',
        'accessories': 'Accessoires',
        'privacy': 'Confidentialité',
        'my-orders': 'Mes Commandes'
      };
      
      const label = labelMap[name] || name.charAt(0).toUpperCase() + name.slice(1);
      breadcrumbs.push({ label, path: currentPath });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbItems = generateBreadcrumbs();
  const isLast = (index) => index === breadcrumbItems.length - 1;
  
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": typeof window !== 'undefined' 
        ? `${window.location.origin}${window.location.pathname.includes('#') ? '#' : ''}${item.path}`
        : item.path
    }))
  };
  
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <nav 
        className="container-page py-4" 
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-2 text-sm flex-wrap">
          {breadcrumbItems.map((item, index) => (
            <li key={item.path} className="flex items-center gap-2">
              {index === 0 ? (
                <Link
                  to={item.path}
                  className="flex items-center gap-1 text-white/60 hover:text-gold transition-base"
                  aria-label="Accueil"
                >
                  <Home className="w-4 h-4" />
                </Link>
              ) : (
                <>
                  <ChevronRight className="w-4 h-4 text-white/40" />
                  {isLast(index) ? (
                    <span className="text-gold font-medium" aria-current="page">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-white/60 hover:text-gold transition-base"
                    >
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

