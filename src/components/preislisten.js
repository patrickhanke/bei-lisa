import { animate, AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { beige, dark, grey, light, white } from './styles'
import {MdLocalPhone} from 'react-icons/md'
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


const popup = {
    initial: {opacity: 0,width: 0, height: 0, scaleX: 0, scaleY:0},
    animate: {opacity: 1,width: 500, height: 700, scaleX: -1, scaleY: -1, transition: { scaleY: {delay: 0.2, duration: 0.3}, scaleX: {delay: 0, duration: 0.15} }},
    exit: {opacity: 0,width: 0, height: 0, scaleX: 0, scaleY:0, transition: { scaleY: {delay: 0, duration: 0.3}, scaleX: {delay: 0.2, duration: 0.15} }},

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
                    style={{originX: 0, originY: 0, x: 60, y: -20}}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    css={css`background-color: #EDD6C6; position: absolute; box-shadow: 0 0 12px 6px rgba(0,0,0,0.1)`}>
                    <div css={css`display: block;position: absolute;left: 27px; top: -10px; border-bottom: 10px solid ${beige};border-left: 10px dashed transparent;border-right: 10px dashed transparent; background: transparent;`}></div>
                        <motion.div variants={menuList} css={{position: "relative", height: "100%", padding: "2em", fontSize: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start"}}>
                            <div css={{width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <h5> Preisliste</h5>

                                <div onClick={() => setOpen(!open)}  css={{padding: "0.5em", fontSize: "1em", lineHeight: "0em", borderRadius: "50%", background: dark, color: beige, cursor: "pointer", [":hover"]: {color: dark, background: beige}}}>
                                <VscClose />
                                </div>
                            </div> 
                            <div css={{width: "100%", height: "1.5px", background: grey, margin: "6px auto 12px auto"}} />
                            <div css={{width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}}>
                                <SelectButton background={sliderState === "frisuren" ? dark : "transparent"} color={sliderState === "frisuren" ? beige : dark} onClick={() => setSliderState("frisuren")}>Friesuren</SelectButton>
                                <SelectButton background={sliderState === "faerben" ?  dark :  "transparent"} color={sliderState === "faerben" ? beige : dark} onClick={() => setSliderState("faerben")}>Färben & Tönen</SelectButton>
                                <SelectButton background={sliderState === "extensions" ? dark : "transparent"} color={sliderState === "extensions" ? beige : dark} onClick={() => setSliderState("extensions")}>Extensions</SelectButton>
                            </div>
                            <AnimatePresence exitBeforeEnter> 
                            {sliderState === "frisuren" &&
                            <motion.div key="frisuren" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} css={{overflowY: "scroll", width: "100%"}}> 
                                
                                <h4>Damen</h4>
                                <div css={{width: "100%"}}>
                                <div css={{width: "100%"}}> 
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Schneiden
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            30-35 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Neuschnitt Plus
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            10 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen oder Legen kurz
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            16 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen oder Legen mittel
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            20 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen oder Legen lang
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            25 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Hochsteckfrisur                                    
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            ab 20 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Hochzeits-Paket inkl Probetermin                                    
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            150 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "1em"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Dauerwelle ab
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            38-58 Euro
                                        </p>
                                    </div>
                                </div> 
                                <h4>Herren</h4>
                                <div css={{width: "100%"}}>
                                <div css={{width: "100%"}}> 
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Haarkranz schneiden
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            12 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Maschinenschnitt
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            12 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Konturenschnitt
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            20 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Haarschnitt
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            26 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Vollbart schneiden
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            9 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Americen Crew Farbe                                    
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            7 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: "1em"}}>
                                        <h6 css={{color: dark + " !important"}}>
                                            Alles inkl. Shampoo, Gel, Wachs oder Haarspray sowie eine Gesichts-Kompresse Heiß oder Kalt                                 
                                        </h6>
                                        
                                    </div>
                                </div> 
                               
                                
                            </div>
                            <h4>Kinder</h4>
                                <div css={{width: "100%"}}>
                                <div css={{width: "100%"}}> 
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Mädchen und Jugen bis 6 Jahre
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            15 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Mädchen und Jugen bis 12 Jahre
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            20 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Föhnen ab
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            10 Euro
                                        </p>
                                    </div>
                                    
                                </div> 
                               
                                
                            </div>


                                
                            </div>
                            

                            </motion.div>
                            }
                            {
                                sliderState === "faerben" && 
                                <motion.div key="faerben" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} css={{overflowY: "scroll", width: "100%"}}> 
                                
                                
                                <h4>Tönen und Färben</h4>
                                <div css={{marginTop: "1em"}}>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Cellophanes / tönen ab 50ml
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            30 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Intensiv Tönen und Färben ab
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            35 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Blondieren ab
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            35 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Brett Strähnen ab
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            30 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Folien Pro Päckchen 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            3 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Folien Str. Kurz Kinnlänge 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            40 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Folien Str. Schulterlänge
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            55 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Folien Str. ab Schulterlänge bis Brustbein
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            70 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Balayage ab
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            70-130 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Painting ab
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            50 - 110 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Freihandtechnik ab Menge
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            25-25 Euro
                                        </p>
                                    </div>
                                    
                                    <div css={{marginTop: "1em"}}>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Wimpern färben
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            12 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Augenbrauen färben 
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            6 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <p css={{color: dark + " !important"}}>
                                            Im Paket
                                        </p>
                                        <p css={{color: dark + " !important"}}>
                                            16 Euro
                                        </p>
                                    </div>
                                    <div css={{display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between", marginTop: "1em"}}>
                                        <h5 css={{color: dark + " !important"}}>
                                            Alles inkl.Friseurexquisite Produkte
                                        </h5>
                                        <h6 css={{color: dark + " !important"}}>
                                            Shampoo, Conditioner, Festiger, Wachs oder Gel und Haarspray
                                        </h6>
                                    </div>
                                    
                                </div>
                                    
                                </div>
                            

                            </motion.div>
                            }
                            {
                                sliderState === "extensions" && 
                                <motion.div key="extensions" initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}} css={{overflowY: "scroll", width: "100%"}}> 
                                
                                
                            

                            </motion.div>
                            }
                            </AnimatePresence>
                        </motion.div>
                </motion.div>}
            </AnimatePresence>
            
            <motion.div onClick={()=> setOpen(!open)} animate={open ? {backgroundColor:dark, color: beige }: {backgroundColor: beige, color: dark}}  css={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "24px",zIndex: 13, borderRadius: "50%", cursor: "pointer", boxShadow: "0 0 12px 6px rgba(0,0,0,0.1)" }}>
                <h4 css={{marginBottom: 0, lineHeight: 0, marginTop: 0, marginBlockEnd: 0, fontSize: "24px", width: "24px", height: "24px"}}>
                    €
                </h4>
            </motion.div>
            
            
                
            
            </motion.div>
    )
}

