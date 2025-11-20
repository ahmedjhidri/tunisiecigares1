// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';

// Generate dynamic meta description from product data
export function generateProductMetaDescription(product) {
  if (!product) return '';
  
  const name = product.name_fr || product.name;
  const price = product.price_TND;
  const stock = product.stock > 0 ? 'En stock' : 'Épuisé';
  const origin = product.origin || '';
  const brand = product.brand || '';
  
  // Create optimized description (150-160 characters)
  let desc = `${name} - ${brand}`;
  if (origin) desc += ` (${origin})`;
  desc += `. Prix: ${price} TND. ${stock}.`;
  if (product.short_desc) {
    const short = product.short_desc.substring(0, 80);
    desc = `${short}... Prix: ${price} TND. ${stock}.`;
  }
  
  // Ensure length is optimal for SEO
  if (desc.length > 160) {
    desc = desc.substring(0, 157) + '...';
  }
  
  return desc;
}

export default function SEO({ 
  title = 'Cigar Lounge Tunisia - Premium Cigars',
  description = 'Discover an elegant selection of premium Cuban, Nicaraguan, and Dominican cigars. Concierge ordering via Messenger.',
  keywords = 'cigars, premium cigars, cuban cigars, tunisia, cigar lounge, cohiba, montecristo',
  image = '/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : '',
  product = null // Optional product for dynamic meta
}) {
  const siteName = 'Cigar Lounge Tunisia';
  
  // Use dynamic description if product provided
  const finalDescription = product 
    ? generateProductMetaDescription(product)
    : description;
  
  // Generate keywords from product if available
  const finalKeywords = product
    ? `${product.brand}, ${product.origin}, cigare ${product.brand.toLowerCase()}, ${keywords}`
    : keywords;
  
  // Use product image if available
  const finalImage = product && product.images && product.images.length > 0
    ? product.images[0]
    : image;
  
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="fr_TN" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={finalDescription} />
      <meta property="twitter:image" content={finalImage} />

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
          "description": finalDescription,
          "url": url,
          "logo": "/logo.png",
          "image": finalImage,
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

