import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import {css} from '@emotion/core'
/*
 * This component is built using `gatsby-image` to automatically serve optimized
 * images with lazy loading and reduced file sizes. The image is loaded using a
 * `useStaticQuery`, which allows us to load the image from directly within this
 * component, rather than having to pass the image data down from pages.
 *
 * For more information, see the docs:
 * - `gatsby-image`: https://gatsby.dev/gatsby-image
 * - `useStaticQuery`: https://www.gatsbyjs.com/docs/use-static-query/
 */

const Image = ({image}) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      team01: file(relativePath: { eq: "Haarstudio-Marita-Portraits-2020-high-res-26.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 3000) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      team02: file(relativePath: { eq: "Haarstudio-Marita-Portraits-2020-web-30.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      studio01: file(relativePath: { eq: "Haarstudio-Marita-Interieur-2020-web-1.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      studio02: file(relativePath: { eq: "Haarstudio-Marita-Interieur-2020-web-2.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      studio03: file(relativePath: { eq: "Haarstudio-Marita-Interieur-2020-web-11.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      studio04: file(relativePath: { eq: "Haarstudio-Marita-Interieur-2020-web-18.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      studio05: file(relativePath: { eq: "Haarstudio-Marita-Interieur-2020-web-12.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      studio06: file(relativePath: { eq: "Haarstudio-Marita-Interieur-2020-web-5.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      studio07: file(relativePath: { eq: "Haarstudio-Marita-Interieur-2020-web-17.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      },
      studio08: file(relativePath: { eq: "Haarstudio-Marita-Interieur-2020-web-16.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1400) {
            ...GatsbyImageSharpFluid
          }
        }
      },

    }
  `)
  
 
 if (image === "team01") return <Img fluid={data.team01.childImageSharp.fluid} css={{width: "100%", height: "100%", zIndex: 1}} />
 else if (image === "team02") return <Img fluid={data.team02.childImageSharp.fluid} />
 else if (image === "gb") return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
 else if (image === "logo") return <Img fluid={data.logo.childImageSharp.fluid} />
 else if (image === "studio01") return <Img fluid={data.studio01.childImageSharp.fluid} css={{width: "100%", height: "100%"}}/>
 else if (image === "studio02") return <Img fluid={data.studio02.childImageSharp.fluid} css={{width: "100%", height: "100%"}}/>
 else if (image === "studio03") return <Img fluid={data.studio03.childImageSharp.fluid} css={{width: "auto", height: "100%"}}/>
 else if (image === "studio04") return <Img fluid={data.studio04.childImageSharp.fluid} css={{width: "100%", height: "100%"}}/>
 else if (image === "studio05") return <Img fluid={data.studio05.childImageSharp.fluid} css={{width: "100%", height: "100%"}}/>
 else if (image === "studio06") return <Img fluid={data.studio06.childImageSharp.fluid} css={{width: "auto", height: "100%"}}/>
 else if (image === "studio07") return <Img fluid={data.studio07.childImageSharp.fluid} css={{width: "auto", height: "100%"}} objectFit="cover" objectPosition="90% 80%"/>
 else if (image === "studio08") return <Img fluid={data.studio08.childImageSharp.fluid} css={{width: "auto", height: "100%"}} objectFit="cover" objectPosition="90% 80%"/>
 else return null
}

export default Image
