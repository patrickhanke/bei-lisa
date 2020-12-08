import { AnimatePresence, motion } from "framer-motion"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import Image from "./image"
import { beige, black, dark, FlexBox, grey, light, white } from "./styles"
import {IoLogoFacebook, IoLogoInstagram} from 'react-icons/io'
import { MdTranslate } from "react-icons/md"

const underline = {
  initial: {scaleX: 0, originX:"right"},
  animate: {scaleX: "100%", originX: "right"},
  exit: {scaleX: 0, originX: "right"}
}
const submenu = {
    initial: {y: 0, opacity: 0},
    animate: {y: 60, opacity: 1},
    exit: {y: 0, opacity: 0}
}


const HeaderMobile = ({ siteState, position }) => {
const [subMenu, setSubMenu] = useState(false)
const [hoverState, setHoverState] = useState()
function scrollHandlerAngebot(e) {
  window.scrollTo(0,position[e] +50 )
}
console.log(subMenu)
return (
    <>
  <header
      css={{position: "fixed", width: "100vw", height: "60px", background: light, zIndex: 9,  boxShadow: "0 0 12px 6px rgba(0,0,0,0.2)", padding: "0 1em" }}
  >
  
      <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}> 
        
        <div css={{width: "120px", padding: "0.5em 0"}}>
          <Image image="logo" />
        </div>
        <motion.div animate={subMenu === true ? {background: dark, color: beige} : {background: beige, color: dark}} onClick={() => setSubMenu(!subMenu)} css={{background: beige, borderRadius: "50%", width: "30px", height: "30px", position: "relative"}}>
            <div css={{width: "18px", height: "12px", position: "absolute", top: "13px", left: "15px", transform: "translate(-50%, -50%)" }}>
                <motion.div animate={subMenu === true ? {background: beige, top: 0, opacity: 0} : {background: dark, opacity: 1}} css={{height: "2px", width: "100%", borderRadius: "3px", position: "absolute"}} />
                <motion.div animate={subMenu === true ? {background: beige, top: 6, transform: "rotate(-45deg)"} : {background: dark, top:6, transform: "rotate(0deg)"}} css={{height: "2px", width: "100%", borderRadius: "3px", position: "absolute"}} />
                <motion.div animate={subMenu === true ? {background: beige, top: 6, transform: "rotate(45deg)"} : {background: dark, top: 12, transform: "rotate(0deg)"}} css={{height: "2px", width: "100%",  borderRadius: "3px", position: "absolute"}} />
            </div>
        </motion.div>

        

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
   <AnimatePresence>
   {subMenu === true &&
   <motion.div variants={submenu} initial="initial" animate="animate" exit="exit" css={{background: beige, boxShadow: "0 0 6px 3px rgba(0,0,0,0.2)", left: 0, zIndex: 6, padding: "0 2em", position: "fixed", height: "60px", width: "100vw", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}> 
     
             <Link to="/#angebot">
                 Angebot
             </Link>

             <Link to="/#salon">
                 Unser Salon
             </Link>
           

             <Link to="/#team">
                 Das Team
             </Link>
           
           <Link to="/#kontakt">
               Kontakt
           </Link>

   </motion.div>

   }
   </AnimatePresence>
   </>
)}

HeaderMobile.propTypes = {
  siteTitle: PropTypes.string,
}

HeaderMobile.defaultProps = {
  siteTitle: ``,
}

export default HeaderMobile
