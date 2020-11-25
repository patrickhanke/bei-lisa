import { AnimatePresence, motion } from "framer-motion"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"
import { beige, black, FlexBox, grey, light, white } from "./styles"
import {IoLogoFacebook, IoLogoInstagram} from 'react-icons/io'

const underline = {
  initial: {scaleX: 0, originX:"right"},
  animate: {scaleX: "100%", originX: "right"},
  exit: {scaleX: 0, originX: "right"}
}

const Header = ({ siteState, position }) => {
function scrollHandlerAngebot(e) {
  window.scrollTo(0,position[e])
}
return (
  <header
      css={{position: "fixed", width: "100vw", height: "60px", background: light, zIndex: 12, }}
  >
    <div
      css={{width: "100%", height: "100%",position: "relative"}}
    >
      <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}> 
        
        <div css={{width: "140px", height: "auto"}}>
          <Image image="logo" />
        </div>

        <FlexBox css={{gap: "2em", width: "36em", height: "100%"}}> 
          <div css={{position: "relative", width: "6em"}}>
            <div  onClick={() => scrollHandlerAngebot("start")} css={{position: "relative", height: "100%", width: "100%"}}>
              <h6 className={siteState==="header" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>
                Start
               
              </h6>
            </div>
          </div>
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
            <div css={{position: "relative", height: "100%", width: "100%"}}>
              <h6 className={siteState==="kontakt" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>
                Kontakt
              </h6>
            </div>
          </div>

        </FlexBox>
        <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "6em", paddingRight: "2em"}}>
        
          <p css={{marginBottom: 0, fontSize: "1.4em"}}>
            <IoLogoInstagram />
          </p>
          <p css={{marginBottom: 0, fontSize: "1.4em"}}>
            <IoLogoFacebook />
          </p>
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
