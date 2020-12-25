/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Haarstudio Marita Kraus GmbH",
          "alternateName": "Haarstudio Marita",
          "url": "https://haarstudio-marita.de/",
          "logo": "/src/images/logo.jpg",
          "description": "Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird. ",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+49761484745",
            "contactType": "customer service",
            "contactOption": "HearingImpairedSupported",
            "areaServed": "DE",
            "availableLanguage": "German"
          },
          "sameAs": [
            "https://haarstudio-marita.de/"
          ]
        }
      `}</script>
      {title == "Haarstudio Marita" &&
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@graph":[{
          "@type": "WebPage",
          "name": "Haarstudio Marita Kraus GmbH",
          "alternateName": "Haarstudio Marita Kraus GmbH",
          "url": "https://www.haarstudio-marita.de",
          "description": "Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird. ",
          "inLanguage": "de-DE",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://haarstudio-marita.de/#website",
            "url": "https://haarstudio-marita.de/",
            "name": "Haarstudio Marita Kraus GmbH",
            "inLanguage": "de-DE"
            }
          },{
            "@type": "BreadcrumbList",
            "itemListElement": {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "WebPage",
                "@id": "https://haarstudio-marita.de/",
                "url": "https://haarstudio-marita.de/",
                "name": "Shop"
              }
            }
          }]
        }
      `}</script>
      }
      {title == "Impressum" &&
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@graph":[{
          "@type": "WebPage",
          "name": "Impressum - Haarstudio Marita Kraus GmbH",
          "url": "https://haarstudio-marita.de/impressum",
          "inLanguage": "de-DE",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://haarstudio-marita.de/#website",
            "url": "https://haarstudio-marita.de/",
            "name": "Haarstudio Marita Kraus GmbH",
            "inLanguage": "de-DE"
            }
          },{
            "@type": "BreadcrumbList",
            "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "WebPage",
                "@id": "https://haarstudio-marita.de/",
                "url": "https://haarstudio-marita.de/",
                "name": "Shop"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "WebPage",
                "@id": "https://haarstudio-marita.de/impressum",
                "url": "https://haarstudio-marita.de/impressum",
                "name": "Shop"
              }
            }]
          }]
        }
      `}</script>
      }
      {title == "Datenschutzerklärung" &&
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@graph":[{
          "@type": "WebPage",
          "name": "Datenschutz - Haarstudio Marita Kraus GmbH",
          "url": "https://www.haarstudio-marita.de/datenschutz",
          "inLanguage": "de-DE",
          "isPartOf": {
            "@type": "WebSite",
            "@id": "https://haarstudio-marita.de/#website",
            "url": "https://haarstudio-marita.de/",
            "name": "Haarstudio Marita Kraus GmbH",
            "inLanguage": "de-DE"
            }
          },{
            "@type": "BreadcrumbList",
            "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "WebPage",
                "@id": "https://haarstudio-marita.de/",
                "url": "https://haarstudio-marita.de/",
                "name": "Shop"
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "WebPage",
                "@id": "https://haarstudio-marita.de/#impressum",
                "url": "https://haarstudio-marita.de/impressum",
                "name": "Shop"
              }
            }]
          }]
        }
      `}</script>
      }
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
