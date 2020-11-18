import { AnimatePresence, motion } from "framer-motion"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "./image"
import { beige, black, FlexBox, grey, light, white } from "./styles"

const underline = {
  initial: {scaleX: 0, originX:"right"},
  animate: {scaleX: "100%", originX: "right"},
  exit: {scaleX: 0, originX: "right"}
}

const Header = ({ siteState }) => {
function scrollHandlerAngebot() {
  console.log("scroll?")
  window.scrollTo(0,2000)
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

        <FlexBox css={{gap: "2em", width: "36em"}}> 
          <div css={{position: "relative", width: "6em"}}>
            <div css={{position: "relative", height: "100%", width: "100%"}}>
              <Link className={siteState==="header" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>
                <h6>Start</h6>
               
              </Link>
            </div>
          </div>
          <div css={{position: "relative", width: "6em"}}>
            <div onClick={() => scrollHandlerAngebot()} css={{position: "relative", height: "100%", width: "100%"}}>
              <Link  className={siteState==="angebot" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>
                  <h6>Angebot</h6>                
              </Link>
            </div>
          </div>
          <div css={{position: "relative", width: "6em"}}>
            <div css={{position: "relative", height: "100%", width: "100%"}}>
              <Link className={siteState==="salon" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>

                  <h6>Unser Salon</h6>                
                
              </Link>
            </div>
          </div>
          <div css={{position: "relative", width: "6em"}}>
            <div css={{position: "relative", height: "100%", width: "100%"}}>
              <Link className={siteState==="team" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>

                  <h6>Das Team</h6>                
                
              </Link>
            </div>
          </div>
          <div css={{position: "relative", width: "6em"}}>
            <div css={{position: "relative", height: "100%", width: "100%"}}>
              <Link className={siteState==="kontakt" ? "active" : "not-active"} css={{position: "absolute", cursor: "pointer" }}>
                <h6>Kontakt</h6>
              </Link>
            </div>
          </div>

        </FlexBox>
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
