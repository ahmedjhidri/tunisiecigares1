// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = 'Cigar Lounge Tunisia - Premium Cigars',
  description = 'Discover an elegant selection of premium Cuban, Nicaraguan, and Dominican cigars. Concierge ordering via Messenger.',
  keywords = 'cigars, premium cigars, cuban cigars, tunisia, cigar lounge, cohiba, montecristo',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : ''
}) {
  const siteName = 'Cigar Lounge Tunisia';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="fr_TN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English, French" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Cigar Lounge Tunisia" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Store",
          "name": siteName,
          "description": description,
          "url": url,
          "logo": "/logo.png",
          "image": image,
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "TN",
            "addressLocality": "Tunis"
          }
        })}
      </script>
    </Helmet>
  );
}

