import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"


import Header from "./header"
import "./layout.css"
import "../fonts/fonts.css"
import Footer from "./footer"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
     
        <main>{children}</main>
        

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
