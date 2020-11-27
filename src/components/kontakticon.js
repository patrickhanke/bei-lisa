import { animate, AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'
import { beige, dark, grey, light, white } from './styles'
import {MdLocalPhone} from 'react-icons/md'
import {VscClose} from 'react-icons/vsc'
import { css } from '@emotion/core'

const popup = {
    initial: {opacity: 0,width: 0, height: 0, scaleX: 0, scaleY:0},
    animate: {opacity: 1,width: 300, height: 500, scaleX: 1, scaleY: -1, transition: { scaleY: {delay: 0.2, duration: 0.3}, scaleX: {delay: 0, duration: 0.15} }},
    exit: {opacity: 0,width: 0, height: 0, scaleX: 0, scaleY:0, transition: { scaleY: {delay: 0, duration: 0.3}, scaleX: {delay: 0.2, duration: 0.15} }},

}

const menuList ={
    initial: {scaleY: 0, transition: {staggerChildren: 0.07, delayChildren: 0.2}},
    animate: {scaleY: -1, transition: {staggerChildren: 0.07, delayChildren: 0.2, delay: 0.1}},
    exit: {scaleY: 0, transition: {staggerChildren: 0.07, delayChildren: 0.2, staggerDirection: -1}},
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

const KontaktIcon = () => {
    const [open, setOpen] = useState(false)
    console.log(open)
    return (
        <motion.div
            initial={false}
            animate={open ? "open" : "closed"}
            custom={500}
            css={{position: "fixed", top: "88%", left: "30px",zIndex: 12, }}
            >

            <AnimatePresence exitBeforeEnter>
                {open === true &&
                <motion.div 
                    variants={popup}  
                    style={{originX: 0, originY: 0, x: 0, y: -20}}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    css={{background: beige,   position: "absolute", boxShadow: "0 0 12px 6px rgba(0,0,0,0.1)"}}>
                    <div css={css`display: block;position: absolute;left: 27px; top: -10px; border-bottom: 10px solid ${beige};border-left: 10px dashed transparent;border-right: 10px dashed transparent; background: transparent;`}></div>
                        <motion.div variants={menuList} css={{position: "relative", height: "100%", padding: "2em", fontSize: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between"}}>
                            <div onClick={() => setOpen(!open)}  css={{padding: "0.5em", fontSize: "1em", lineHeight: "0em", borderRadius: "50%", background: dark, color: beige, cursor: "pointer", [":hover"]: {color: dark, background: beige}}}>
                                    <VscClose /> 
                            </div>
                            <h5> Telefonnummer</h5>
                            <p css={{marginBottom: 0}}> 0761 484745</p>
                            <div css={{width: "100%", height: "1.5px", background: grey, margin: "6px auto 12px auto"}} />
                            <h5>Öffnungszeiten</h5>
                            <p css={{color: dark + " !important"}}>
                                Di:  08.30 - 18.00
                                </p>
                                <p css={{color: dark + " !important"}}>
                                Mi: 08.30 - 18.00
                                </p>
                                <p css={{color: dark + " !important"}}>
                                Do: 08.30 - 20.00
                                </p>
                                <p css={{color: dark + " !important"}}>
                                Fr:  08.00 - 18.00
                                </p>
                                <p css={{color: dark + " !important"}}>
                                Sa:  08.00 - 13.00
                                </p >
                        </motion.div>
                </motion.div>}
            </AnimatePresence>
            
            <motion.div onClick={()=> setOpen(!open)} animate={open ? {background:dark, color: beige }: {background: beige, color: dark}}  css={{padding: "24px",zIndex: 13, borderRadius: "50%", cursor: "pointer", boxShadow: "0 0 12px 6px rgba(0,0,0,0.1)" }}>
                <h4 css={{marginBottom: 0, lineHeight: 0, marginop: 0, marginBlock: 0, fontSize: "24px"}}>
                    <MdLocalPhone />
                </h4>
            </motion.div>
            
            
                
            
            </motion.div>
    )
}

export default KontaktIcon