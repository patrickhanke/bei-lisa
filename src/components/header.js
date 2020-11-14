import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"
import { white } from "./styles"

const Header = ({ siteTitle }) => (
  <header
      css={{position: "fixed", width: "100vw", height: "100px", background: white, zIndex: 12}}
  >
    <div
      css={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row"}}
    >
      <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", width: "30%"}}> 
        <h6>Start</h6>
        <h6>About</h6>
        <h6>Preise</h6>
        <h6>Kontakt</h6>
      </div>

      <div css={{width: "200px", height: "100px"}}>
        <Image image="logo" />
      </div>

      <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", width: "30%"}}> 
        <h6>Start</h6>
        <h6>About</h6>
        <h6>Preise</h6>
        <h6>Kontakt</h6>
      </div>
     
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
