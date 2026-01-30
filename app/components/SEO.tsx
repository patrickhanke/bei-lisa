import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description?: string;
  lang?: string;
}

const siteMetadata = {
  title: 'Haarstudio Bi Lisa',
  description: 'Ihr Friseursalon in Freiburg St. Georgen',
  author: '@PH',
};

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description = siteMetadata.description, 
  lang = 'de' 
}) => {
  const fullTitle = `${title} | ${siteMetadata.title}`;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Haarstudio Marita Kraus GmbH',
    'alternateName': 'Haarstudio Marita',
    'url': 'https://haarstudio-marita.de/',
    'logo': '/images/bei_lisa_square.png',
    'description': 'Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird.',
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+49761484745',
      'contactType': 'customer service',
      'contactOption': 'HearingImpairedSupported',
      'areaServed': 'DE',
      'availableLanguage': 'German',
    },
    'sameAs': ['https://haarstudio-marita.de/'],
  };

  const pageSchema = title === 'Haarstudio Marita' ? {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        'name': 'Haarstudio Marita Kraus GmbH',
        'alternateName': 'Haarstudio Marita Kraus GmbH',
        'url': 'https://www.haarstudio-marita.de',
        'description': 'Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird.',
        'inLanguage': 'de-DE',
        'isPartOf': {
          '@type': 'WebSite',
          '@id': 'https://haarstudio-marita.de/#website',
          'url': 'https://haarstudio-marita.de/',
          'name': 'Haarstudio Marita Kraus GmbH',
          'inLanguage': 'de-DE',
        },
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': {
          '@type': 'ListItem',
          'position': 1,
          'item': {
            '@type': 'WebPage',
            '@id': 'https://haarstudio-marita.de/',
            'url': 'https://haarstudio-marita.de/',
            'name': 'Shop',
          },
        },
      },
    ],
  } : null;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={siteMetadata.author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {pageSchema && (
        <script type="application/ld+json">
          {JSON.stringify(pageSchema)}
        </script>
      )}
    </Helmet>
  );
};
