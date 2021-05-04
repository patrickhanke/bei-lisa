import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { beige, dark, mq, } from './styles'
import {VscClose} from 'react-icons/vsc'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

const SelectButton = styled.button({
    fontSize: "16px",
    padding: "0.6em 1.2em",
    border: "1px solid " +dark,
    cursor: "pointer",
    [":hover"]: {color: beige, background: dark, },
},
props => ({background: props.background}),
props => ({color: props.color})
)
const SelectButtonMobile = styled.button(mq({
    fontSize: ["12px","14px","14px","14px"],
    padding: "0.3em 0.6em",
    border: "1px solid " +dark,
    cursor: "pointer",
    margin: ".2em 0",
    [":hover"]: {color: beige, background: dark, },
}),
props => ({background: props.background}),
props => ({color: props.color})
)
const popup = {
    initial: {opacity: 0,width: 0, height: 0, scaleX: 0, scaleY:0},
    animate: {opacity: 1,width: 550, height: "70vh", scaleX: -1, scaleY: -1, transition: { scaleY: {delay: 0.2, duration: 0.3}, scaleX: {delay: 0, duration: 0.15} }},
    exit: {opacity: 0,width: 0, height: 0, scaleX: 0, scaleY:0, transition: { scaleY: {delay: 0, duration: 0.3}, scaleX: {delay: 0.2, duration: 0.15} }},
}
const slidein = {
    initial: {opacity: 0,width: "100vw", y: "-100%", height: 700, },
    animate: {opacity: 1,width: "100vw", y: 0, height: 700,  transition: { width: {delay: 0.2, duration: 0.3}, height: {delay: 0, duration: 0.15} }},
    exit: {opacity: 0,width: "100vw", y: "-100%", height: 700, transition: { width: {delay: 0, duration: 0.3}, height: {delay: 0.2, duration: 0.15} }},
}
const menuList ={
    initial: {scaleY: 0, scaleX: -1, transition: {staggerChildren: 0.07, delayChildren: 0.2}},
    animate: {scaleY: -1, scaleX: -1, transition: {staggerChildren: 0.07, delayChildren: 0.2, delay: 0.1}},
    exit: {scaleY: 0, scaleX: -1, transition: {staggerChildren: 0.07, delayChildren: 0.2, staggerDirection: -1}},
  }
const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

export const Preisliste = () => {
    const [open, setOpen] = useState(false)
    const [sliderState, setSliderState] = useState("frisuren")
    return (
        <motion.div
            initial={false}
            animate={open ? "open" : "closed"}
            custom={500}
            css={{position: "fixed", bottom: "30px", right: "30px",zIndex: 12, }}
            >

            <AnimatePresence exitBeforeEnter>
                {open === true &&
                <motion.div 
                    variants={popup}  
                    style={{originX: 0, originY: 0, x: 200, y: -20}}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    css={css`background-color: #EDD6C6; position: absolute; box-shadow: 0 0 12px 6px rgba(0,0,0,0.1)`}>
                    <div css={css`display: block;position: absolute;left: 27px; top: -10px; border-bottom: 10px solid ${beige};border-left: 10px dashed transparent;border-right: 10px dashed transparent; background: transparent;`}></div>
                        <motion.div variants={menuList} css={{position: "relative", height: "100%", paddingBottom: "1em", fontSize: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"}}>
                            <div css={{width: "100%", display: "flex", padding: "1em", flexDirection: "row", alignItems: "center", justifyContent: "space-between", }}>
                                <h5> Preisliste</h5>

                                <div onClick={() => setOpen(!open)}  css={{padding: "0.5em", fontSize: "1em", lineHeight: "0em", borderRadius: "50%", background: beige, color: dark, border: "1px solid " +dark, cursor: "pointer", [":hover"]: {color: beige, background: dark}}}>
                                <VscClose />
                                </div>
                            </div> 
                            <div css={{width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", padding: "0 1em 1em 1em", borderBottom: "1px solid " + dark}}>
                                <SelectButton background={sliderState === "frisuren" ? dark : "transparent"} color={sliderState === "frisuren" ? beige : dark} onClick={() => setSliderState("frisuren")}>Frisuren</SelectButton>
                                <SelectButton background={sliderState === "faerben" ?  dark :  "transparent"} color={sliderState === "faerben" ? beige : dark} onClick={() => setSliderState("faerben")}>Färben & Tönen</SelectButton>
                                <SelectButton background={sliderState === "extensions" ? dark : "transparent"} color={sliderState === "extensions" ? beige : dark} onClick={() => setSliderState("extensions")}>Pflege & Make-up</SelectButton>
                            </div>
                            <AnimatePresence exitBeforeEnter> 
                            {sliderState === "frisuren" &&
                            <motion.div className="preiscontainer" key="frisuren" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} css={{overflowY: "scroll", width: "100%", padding: "1em"}}> 
                                
                                <h4 css={{marginTop: "0.5em"}}>Damen</h4>
                                <div css={{width: "100%"}}>
                                <div css={{width: "100%"}}> 
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Schneiden
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 35 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Neuschnitt Plus
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            10 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen oder Legen kurz
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            16 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen oder Legen mittel
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            20 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen oder Legen lang
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            25 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Hochsteckfrisur                                    
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 20 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Hochzeits-Paket inkl Probetermin                                    
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            150 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "1em"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Dauerwelle
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            38 - 58 €
                                        </p>
                                    </div>
                                </div> 
                                <h4>Herren</h4>
                                <div css={{width: "100%"}}>
                                <div css={{width: "100%"}}> 
                                    <div className="preiscontainer" css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Haarkranz schneiden
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            14 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Maschinenschnitt
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            14 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Konturenschnitt
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            20 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Haarschnitt
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            28 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Vollbart schneiden
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            15 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Americen Crew Farbe                                    
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            7 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "1em"}}>
                                        <p css={{color: dark + " !important", fontWeight: 600}}>
                                            Alles inkl. Shampoo, Gel, Wachs oder Haarspray sowie eine Gesichts-Kompresse Heiß oder Kalt                                 
                                        </p>
                                        
                                    </div>
                                </div> 
                               
                                
                            </div>
                            <h4>Kinder</h4>
                                <div css={{width: "100%"}}> 
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Mädchen und Jungen bis 6 Jahre
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            17 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Jungen bis 12 Jahre
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            24 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Mädchen von 6 bis 10 Jahre
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            22 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Mädchen von 10 bis 12 Jahre
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            28 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 10 €
                                        </p>
                                    </div>
                                    
                                </div> 
              
                            </div>
                            

                            </motion.div>
                            }
                            {
                                sliderState === "faerben" && 
                                <motion.div className="preiscontainer" key="faerben" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} css={{overflowY: "scroll", width: "100%", padding: "1em"}}> 
                                
                                
                                <h4 css={{marginTop: "0.5em"}}>Färben & Tönen</h4>
                                <div css={{marginTop: "1em"}}>
                                    
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Intensiv Tönen und Färben
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 35 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Blondieren
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 35 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Brett Strähnen
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 30 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Folien Str. Kurz Kinnlänge 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 40 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Folien Str. Schulterlänge
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 55 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Folien Str. ab Schulterlänge bis Brustbein
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 70 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Balayage 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            70 - 130 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Painting 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 50 - 110 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Freihandtechnik ab Menge
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            25 - 45 €
                                        </p>
                                    </div>
                                    
                                    <div css={{marginTop: "1em"}}>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Wimpern färben
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            12 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Augenbrauen färben 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            6 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Im Paket
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            16 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", marginTop: "1em"}}>
                                        <p css={{color: dark + " !important", fontWeight: 600}}>
                                            Alles inkl. Friseurexquisite Produkte
                                        </p>
                                        <p css={{color: dark + " !important", fontWeight: 600}}>
                                            Shampoo, Conditioner, Festiger, Wachs oder Gel und Haarspray
                                        </p>
                                    </div>
                                    
                                </div>
                                    
                                </div>
                            

                            </motion.div>
                            }
                            {
                                sliderState === "extensions" && 
                                <motion.div className="preiscontainer" key="extensions" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} css={{overflowY: "scroll", width: "100%", padding: "1em"}}> 
                                 <h4 css={{marginTop: "0.5em"}}>Haar- und Kopfhautpflege</h4>
                                <div >
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Haarkur
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            10 - 16 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Protection Cheveux
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            18 - 27 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Olaplex Treatment
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            20 - 30 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important", fontWeight: 600}}>
                                            Alles inkl. Kopfmassage
                                        </p>
                                    </div>
                                    
                                    
                                    <div css={{marginTop: "1em"}}>
                                        <h4>Make-up</h4>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                           Tages Make-up
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            18 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Abend Make-up  
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            23 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Braut Make-up
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            25 - 30 €
                                        </p>
                                    </div>
        
                                </div>
                                    
                                </div>
                                </motion.div>
                            }
                            </AnimatePresence>
                        </motion.div>
                </motion.div>}
            </AnimatePresence>
            
            <motion.div onClick={()=> setOpen(!open)} animate={open ? {backgroundColor:dark, color: beige }: {backgroundColor: beige, color: dark}}  css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "24px",zIndex: 13, borderRadius: "10px", cursor: "pointer", boxShadow: "0 0 12px 6px rgba(0,0,0,0.1)" }}>
                <h4 css={{marginBottom: 0, lineHeight: 0, marginTop: 0, marginBlockEnd: 0, fontSize: "16px",}}>
                    Leistungen & Preise
                </h4>
            </motion.div>
            
            
                
            
            </motion.div>
    )
}
export const PreislisteMobile = ({plstate, preislisteHandler}) => {
    const [sliderState, setSliderState] = useState("frisuren")
    return (
                <motion.div 
                    variants={slidein}  
                    style={{x: 0}}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    css={css`position: fixed; background-color: #EDD6C6; box-shadow: 0 0 12px 6px rgba(0,0,0,0.1); z-index: 7; max-height: 90vh; overflow: hidden; padding-bottom: 2em;`}>
                    <div css={css`display: block;position: absolute;left: 27px; top: -10px; border-bottom: 10px solid ${beige};`}></div>
                        <motion.div css={mq({position: "relative", height: "100%", padding: ["0em 0em 3em 0em", "0em 0em 3em 0em", "0em 4em 3em 4em", "0em 4em 3em 4em"],fontSize: "14px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", marginTop: "60px"})}>
                            <div css={{width: "100%", display: "flex", padding: "1em", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <h5> Preisliste</h5>

                                <div onClick={() => preislisteHandler("close")}  css={{padding: "0.5em", fontSize: "1em", lineHeight: "0em", borderRadius: "50%", background: beige, color: dark, border: "1px solid " +dark, cursor: "pointer", [":hover"]: {color: beige, background: dark}}}>
                                <VscClose />
                                </div>
                            </div> 
                            <div css={{width: "100%", display: "flex", flexWrap: "wrap", flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "0 1em 1em 1em", borderBottom: "1px solid " + dark}}>
                                <SelectButtonMobile background={sliderState === "frisuren" ? dark : "transparent"} color={sliderState === "frisuren" ? beige : dark} onClick={() => setSliderState("frisuren")}>Frisuren</SelectButtonMobile>
                                <SelectButtonMobile background={sliderState === "faerben" ?  dark :  "transparent"} color={sliderState === "faerben" ? beige : dark} onClick={() => setSliderState("faerben")}>Färben & Tönen</SelectButtonMobile>
                                <SelectButtonMobile background={sliderState === "extensions" ? dark : "transparent"} color={sliderState === "extensions" ? beige : dark} onClick={() => setSliderState("extensions")}>Pflege & Make-up</SelectButtonMobile>
                            </div>
                            <AnimatePresence exitBeforeEnter> 
                            {sliderState === "frisuren" &&
                            <motion.div className="preiscontainer" key="frisuren" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} css={{overflowY: "scroll", width: "100%", padding: "1em"}}> 
                                
                                <h4 css={{marginTop: "0.5em"}}>Damen</h4>
                                <div css={{width: "100%"}}>
                                <div css={{width: "100%"}}> 
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Schneiden
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 35 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Neuschnitt Plus
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            10 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen oder Legen kurz
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            16 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen oder Legen mittel
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            20 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen oder Legen lang
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            25 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Hochsteckfrisur                                    
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 20 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Hochzeits-Paket inkl Probetermin                                    
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            150 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "1em"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Dauerwelle
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            38 - 58 €
                                        </p>
                                    </div>
                                </div> 
                                <h4>Herren</h4>
                                <div css={{width: "100%"}}>
                                <div css={{width: "100%"}}> 
                                    <div className="preiscontainer" css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Haarkranz schneiden
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            12 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Maschinenschnitt
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            12 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Konturenschnitt
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            20 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Haarschnitt
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            26 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Vollbart schneiden
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            9 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Americen Crew Farbe                                    
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            7 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "1em"}}>
                                        <p css={{color: dark + " !important", fontWeight: 600}}>
                                            Alles inkl. Shampoo, Gel, Wachs oder Haarspray sowie eine Gesichts-Kompresse Heiß oder Kalt                                 
                                        </p>
                                    </div>
                                </div> 
                               
                                
                            </div>
                            <h4>Kinder</h4>
                                <div css={{width: "100%"}}> 
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Mädchen und Jungen bis 6 Jahre
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            15 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Mädchen und Jungen bis 12 Jahre
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            20 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 10 €
                                        </p>
                                    </div>
                                    
                                </div> 
              
                            </div>
                            

                            </motion.div>
                            }
                            {
                                sliderState === "faerben" && 
                                <motion.div className="preiscontainer" key="faerben" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} css={{overflowY: "scroll", width: "100%", padding: "1em"}}> 
                                
                                
                                <h4 css={{marginTop: "0.5em"}}>Färben & Tönen</h4>
                                <div css={{marginTop: "1em"}}>
                                    
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Intensiv Tönen und Färben
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 35 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Blondieren
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 35 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Brett Strähnen
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 30 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Folien Str. Kurz Kinnlänge 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 40 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Folien Str. Schulterlänge
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 55 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Folien Str. ab Schulterlänge bis Brustbein
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 70 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Balayage 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            70 - 130 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Painting 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 50 - 110 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Freihandtechnik ab Menge
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            25 - 45 €
                                        </p>
                                    </div>
                                    
                                    <div css={{marginTop: "1em"}}>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Wimpern färben
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            12 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Augenbrauen färben 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            6 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Im Paket
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            16 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", marginTop: "1em"}}>
                                        <p css={{color: dark + " !important", fontWeight: 600}}>
                                            Alles inkl. Friseurexquisite Produkte
                                        </p>
                                        <p css={{color: dark + " !important", fontWeight: 600}}>
                                            Shampoo, Conditioner, Festiger, Wachs oder Gel und Haarspray
                                        </p>
                                    </div>
                                    
                                </div>
                                    
                                </div>
                            

                            </motion.div>
                            }
                            {
                                sliderState === "extensions" && 
                                <motion.div className="preiscontainer" key="extensions" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} css={{overflowY: "scroll", width: "100%", padding: "1em"}}> 
                                 <h4 css={{marginTop: "0.5em"}}>Haar- und Kopfhautpflege</h4>
                                <div css={{marginTop: "1em"}}>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Haarkur
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            10 - 16 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Protection Cheveux
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            18 - 27 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Olaplex Treatment
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            20 - 30 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important", fontWeight: 600}}>
                                            Alles inkl. Kopfmassage
                                        </p>
                                    </div>
                                    
                                    
                                    <div css={{marginTop: "1em"}}>
                                        <h4>Make-up</h4>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                           Tages Make-up
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            18 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Abend Make-up  
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            23 €
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Braut Make-up
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            25 - 30 €
                                        </p>
                                    </div>
                                    
                                    
                                </div>
                                    
                                </div>
                                
                            

                                </motion.div>
                            }
                            </AnimatePresence>
                        </motion.div>
                </motion.div>
            
    )
}

