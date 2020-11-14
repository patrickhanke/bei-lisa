import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image/withIEPolyfill"
import {css} from '@emotion/core'


const TeamImage = ({bild}) => {
  const image = useStaticQuery(graphql`
    query {
        team01: file(relativePath: {eq: "team/team01.jpg"}) {
            childImageSharp {
                fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        team02: file(relativePath: {eq: "team/team02.jpg"}) {
            childImageSharp {
                fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        team03: file(relativePath: {eq: "team/team03.jpg"}) {
            childImageSharp {
                fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        team04: file(relativePath: {eq: "team/team04.jpg"}) {
            childImageSharp {
                fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        team05: file(relativePath: {eq: "team/team05.jpg"}) {
            childImageSharp {
                fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        team06: file(relativePath: {eq: "team/team06.jpg"}) {
            childImageSharp {
                fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
        team07: file(relativePath: {eq: "team/team07.jpg"}) {
            childImageSharp {
                fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid
                }
            }
        },
    }
    `)
  
console.log(image) 
console.log(bild) 
 if      (bild === "team01") return <Img fluid={image.team01.childImageSharp.fluid} css={{width: "auto", height: "100%"}} />
 else if (bild === "team02") return <Img fluid={image.team02.childImageSharp.fluid} css={{width: "auto", height: "100%"}}/>
 else if (bild === "team03") return <Img fluid={image.team03.childImageSharp.fluid} css={{width: "auto", height: "100%"}}/>
 else if (bild === "team04") return <Img fluid={image.team04.childImageSharp.fluid} css={{width: "auto", height: "100%"}}/>
 else if (bild === "team05") return <Img fluid={image.team05.childImageSharp.fluid} css={{width: "auto", height: "100%"}}/>
 else if (bild === "team06") return <Img fluid={image.team06.childImageSharp.fluid} css={{width: "auto", height: "100%"}}/>
 else if (bild === "team07") return <Img fluid={image.team07.childImageSharp.fluid} css={{width: "auto", height: "100%"}}/>
 else return null
}

export default TeamImage
