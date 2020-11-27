import { AnimatePresence, motion } from "framer-motion"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import Image from "./image"
import { beige, black, dark, FlexBox, grey, light, white } from "./styles"
import {IoLogoFacebook, IoLogoInstagram} from 'react-icons/io'

const underline = {
  initial: {scaleX: 0, originX:"right"},
  animate: {scaleX: "100%", originX: "right"},
  exit: {scaleX: 0, originX: "right"}
}

const Header = ({ siteState, position }) => {
const [hoverState, setHoverState] = useState()
function scrollHandlerAngebot(e) {
  window.scrollTo(0,position[e])
}
return (
  <header
      css={{position: "fixed", width: "100vw", height: "80px", background: light, zIndex: 12, boxShadow: "0 0 12px 6px rgba(0,0,0,0.1)", padding: "0 1em" }}
  >
  
      <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}> 
        
        <div css={{width: "200px", height: "auto"}}>
          <Image image="logo" />
        </div>

        <FlexBox css={{gap: "2em",height: "100%", zIndex: 13}}> 
          
          <div css={{position: "relative", width: "6em"}}>
            <div onClick={() => scrollHandlerAngebot("angebot")} css={{position: "relative", height: "100%", width: "100%"}}>
              <h6  className={siteState==="angebot" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>
                  Angebot           
              </h6>
            </div>
          </div>
          <div css={{position: "relative", width: "6em"}}>
            <div onClick={() => scrollHandlerAngebot("salon")} css={{position: "relative", height: "100%", width: "100%"}}>
              <h6 className={siteState==="salon" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>

                  Unser Salon           
                
              </h6>
            </div>
          </div>
          <div css={{position: "relative", width: "6em"}}>
            <div onClick={() => scrollHandlerAngebot("team")} css={{position: "relative", height: "100%", width: "100%"}}>
              <h6 className={siteState==="team" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>

                  Das Team           
                
              </h6>
            </div>
          </div>
          <div css={{position: "relative", width: "6em"}}>
            <div onClick={() => scrollHandlerAngebot("kontakt")} css={{position: "relative", height: "100%", width: "100%"}}>
              <h6 className={siteState==="kontakt" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>
                Kontakt
              </h6>
            </div>
          </div>

        </FlexBox>
        <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "7em", paddingRight: "1em"}}>
        
          <div css={{padding: "0.5em", borderRadius: "50%", transition: "background 0.2s ease-in", [":hover"]: {background: beige, color: dark }}}>
            <h6 css={{marginBottom: 0, fontSize: "1.4em", cursor: "pointer", }}>
              <a target="_blank" href="https://www.instagram.com/haarstudio_marita/"><IoLogoInstagram /></a>
            </h6>
          </div>
          <div css={{padding: "0.5em", borderRadius: "50%", transition: "background 0.2s ease-in", [":hover"]: {background: beige, color: dark }}}>
            <h6 css={{marginBottom: 0, fontSize: "1.4em", cursor: "pointer", }}>
              <a target="_blank" href="https://www.facebook.com/haarstudiomarita"><IoLogoFacebook /></a>
            </h6>
          </div>
        </div>
      </div>
     
  </header>
)}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
