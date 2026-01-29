import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import { GatsbyImage } from "gatsby-plugin-image";

interface TeamImageProps {
    bild?: string;
    name: string;
}

interface TeamImageQueryData {
    team01: any;
    team02: any;
    team03: any;
    team04: any;
    team05: any;
    team06: any;
    team07: any;
}

const TeamImage: React.FC<TeamImageProps> = ({ bild, name }) => {
    const image = useStaticQuery<TeamImageQueryData>(graphql`
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
        team05: file(relativePath: {eq: "team/teampicture05.jpg"}) {
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
    `);

    if (bild === "team01") return <GatsbyImage image={image.team01} alt={name} css={{ width: "auto", height: "100%" }} />;
    else if (bild === "team02") return <GatsbyImage image={image.team02} alt={name} css={{ width: "auto", height: "100%" }} />;
    else if (bild === "team03") return <GatsbyImage image={image.team03} alt={name} css={{ width: "auto", height: "100%" }} />;
    else if (bild === "team04") return <GatsbyImage image={image.team04} alt={name} css={{ width: "auto", height: "100%" }} />;
    else if (bild === "team05") return <GatsbyImage image={image.team05} alt={name} css={{ width: "auto", height: "100%" }} />;
    else if (bild === "team06") return <GatsbyImage image={image.team06} alt={name} css={{ width: "auto", height: "100%" }} />;
    else if (bild === "team07") return <GatsbyImage image={image.team07} alt={name} css={{ width: "auto", height: "100%" }} />;
    else return null;
};

export default TeamImage;
