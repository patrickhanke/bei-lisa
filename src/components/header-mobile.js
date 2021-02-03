import { AnimatePresence, motion } from "framer-motion"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import Image from "./image"
import { beige,  dark, light } from "./styles"
import {IoLogoFacebook, IoLogoInstagram} from 'react-icons/io'
import { PreislisteMobile } from "./preislisten"
import styled from "@emotion/styled"

const SelectButtonMobile = styled.button({
  fontSize: "14px",
  padding: "0.3em 0.6em",
  border: "1px solid " +dark,
  cursor: "pointer",
  margin: ".2em 0",
  [":hover"]: {color: beige, background: dark, },
},
props => ({background: props.background}),
props => ({color: props.color})
)

const submenu = {
    initial: {y: 0, opacity: 0},
    animate: {y: 60, opacity: 1},
    exit: {y: 0, opacity: 0}
}


const HeaderMobile = ({position }) => {
const [menuIcon, setMenuIcon] = useState("close")
  const [subMenu, setSubMenu] = useState(false)
const [preisliste, setPreisliste] = useState(false)
function scrollHandlerAngebot(e) {
  window.scrollTo(0,position[e] - 200 )
}
const preislisteHandler = (e) => {
  if (e === "close") {
    setMenuIcon(e)
    setSubMenu(false)
    setPreisliste(false)
  }
  else{
    setSubMenu(!subMenu)
    setMenuIcon(e)
    setPreisliste(!preisliste)
  }
}
const subMenuHandler = () => {
  if (menuIcon === "open") {
    setSubMenu(false)
    setPreisliste(false)
    setMenuIcon("close")
  }
  else {
    setSubMenu(!subMenu)
    setMenuIcon("open")
  }
  
}

return (
    <>
    <header
        css={{position: "fixed", width: "100vw", height: "60px", background: light, zIndex: 9,  boxShadow: "0 0 12px 6px rgba(0,0,0,0.2)", padding: "0 1em" }}
    >
  
      <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%"}}> 
        
        <div css={{width: "100px", padding: "0.7em 0"}}>
          <Image image="logo" />
        </div>
        <motion.div animate={menuIcon === "open" ? {background: dark, color: beige} : {background: beige, color: dark}} onClick={() => subMenuHandler(!subMenu)} css={{background: beige, borderRadius: "50%", width: "36px", height: "36px", position: "relative"}}>
            <div css={{width: "20px", height: "12px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <motion.div animate={menuIcon === "open" ? {background: beige, top: 0, opacity: 0} : {background: dark, opacity: 1}} css={{height: "2px", width: "100%", borderRadius: "3px", position: "absolute"}} />
                <motion.div animate={menuIcon === "open" ? {background: beige, top: 5, transform: "rotate(-45deg)"} : {background: dark, top:5, transform: "rotate(0deg)"}} css={{height: "2px", width: "100%", borderRadius: "3px", position: "absolute"}} />
                <motion.div animate={menuIcon === "open" ? {background: beige, top: 5, transform: "rotate(45deg)"} : {background: dark, top: 10, transform: "rotate(0deg)"}} css={{height: "2px", width: "100%",  borderRadius: "3px", position: "absolute"}} />
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
   <AnimatePresence exitBeforeEnter>
   {subMenu === true &&
   <motion.div key="submenu" variants={submenu} initial="initial" animate="animate" exit="exit" css={{background: beige, boxShadow: "0 0 6px 3px rgba(0,0,0,0.2)", left: 0, zIndex: 6, padding: "0 2em", position: "fixed", height: "60px", width: "100vw", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}> 
     
             <div  onClick={() => scrollHandlerAngebot("angebot")}>
                 Salon
             </div>
           

             <div onClick={() => scrollHandlerAngebot("team")}>
                 Team
             </div>
           
           <div onClick={() => scrollHandlerAngebot("kontakt")}>
               Kontakt
           </div>

           <SelectButtonMobile background={beige} color={dark} onClick={() => preislisteHandler("open")}>
               Preisliste
           </SelectButtonMobile>

   </motion.div>

   }
   {preisliste === true &&
     	<PreislisteMobile plstate={preisliste} preislisteHandler={preislisteHandler} />
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
