import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { beige, dark, darkgrey, FlexBox, FlexContainer,light, Wrapper, FlexBoxMobile, FlexContainerMobile, mq, white } from "../components/styles"
import TeamCard from "../components/teamcard"
import Footer from "../components/footer"
import { AnimatePresence, motion, useSpring, useTransform, useViewportScroll } from "framer-motion"
import Header from "../components/header"
import SimpleMap from "../components/google-map"
import KontaktIcon, { KontaktIconMobile } from "../components/kontakticon"
import { useMediaQuery } from "react-responsive"
import HeaderMobile from "../components/header-mobile"
import { Preisliste } from "../components/preislisten"
import { VscClose } from "react-icons/vsc"

const navbackground = {
  initial: {backgroundColor: "rgba(0,0,0,0)", transition: {delay: 0, duration: 0.6}},
  animate: {backgroundColor: "rgba(0,0,0,0.3)", transition: {delay: 0, duration: 0.6}},
  exit: {backgroundColor: "rgba(0,0,0,0)", transition: {delay: 0.4, duration: 0.3}}
}

let mainclientheight;
let headerscrollheight;

let section0 = "";
let section1 = "";
let section2 = "";
let section3 = "";
let section4 = "";


const IndexPage = () => {
const [mainHeight, setmainHeight] = useState()
const [siteState, setSiteState] = useState()
const [scrollheight, setScrollheight] = useState()
const [scrollPositions, setScrollPositions] = useState()
const {scrollY, scrollYProgress} = useViewportScroll() 
const [popupState, setPopupState] = useState(false)

const scrollSlow = useTransform(scrollY, value => -0.6*  value  )
const scrollMedium = useTransform(scrollY, value => -0.7*  value  )
const scrollFast = useTransform(scrollY, value => -0.9*  value  )

const yRangeLarge = [-450, 0, 450]
const yRangeNarrow = [-150, 0, 150]
const scrollRange = [1,0.5,0]
const paralaxfast = useTransform(scrollYProgress, scrollRange, yRangeLarge)
const paralaxslow = useTransform(scrollYProgress, scrollRange, yRangeNarrow)
const paralaxFast = useSpring(paralaxfast, {damping: 99, stiffness: 200 })
const paralaxSlow = useSpring(paralaxslow, {damping: 99, stiffness: 200 })

const scrollbar = useTransform(scrollYProgress, value => value * 100  )

let ySlow = useSpring(scrollSlow, { damping: 99, stiffness: 200 })
let yMedium = useSpring(scrollMedium, { damping: 99, stiffness: 200 })
let yFast = useSpring(scrollFast, { damping: 99, stiffness: 200 })

let scrollanimation = useSpring(scrollbar, {damping: 99, stiffness: 100})


const handleScroll = (e) => {

  var headerTop = document.getElementById("header")
  var angebotTop = document.getElementById("angebot")
  var salonTop = document.getElementById("salon")
  var teamTop = document.getElementById("team")
  var kontaktTop = document.getElementById("kontakt")
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)

  mainclientheight = document.getElementById('wrapper').offsetHeight
  headerscrollheight = document.getElementById('header').offsetHeight
  setScrollheight(window.innerHeight / 99 )
  setmainHeight((mainclientheight + headerscrollheight) *1.1)
  
  function getPositions(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
  
  }
  
  section0 = getPositions(headerTop)
  section1 = getPositions(angebotTop)
  section2 = getPositions(salonTop)
  section3 = getPositions(teamTop)
  section4 = getPositions(kontaktTop)
  setScrollPositions(
    {
      start: 0,
      angebot: section1.y * 1.1,
      salon: section2.y * 1.1,
      team: section3.y * 1.1,
      kontakt: section4.y * 1.1
    }
  )

  
  if ( window.pageYOffset < 200 ) {
    setSiteState("header")
    }
  else if ( window.pageYOffset < section2.y *1.1 ) {
    setSiteState("angebot")
    }
  else if ( window.pageYOffset < section3.y *1.1 ) {
    setSiteState("salon")
    }
  else if ( window.pageYOffset < section4.y *1.1 ) {
    setSiteState("team")
    }
  else if ( window.pageYOffset < section4.y *1.1 ) {
    setSiteState("kontakt")
    }
  else setSiteState("kontakt")
  return 
}


useEffect(() => {
  window.addEventListener("scroll", handleScroll, false);
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
  mainclientheight = document.getElementById('wrapper').offsetHeight
  headerscrollheight = document.getElementById('header').offsetHeight
  setScrollheight(window.innerHeight / 100 )
  setmainHeight((mainclientheight + headerscrollheight) *1.1)
  return () => window.removeEventListener("scroll", handleScroll, false);
},[])

useEffect(() => {
  handleScroll()
  return
},[])

useEffect(() => {
  setTimeout(() => {
    setPopupState(true)
  },[2000])
},[])

const isTabletOrMobile = useMediaQuery({ query: '(max-device-width: 1180px)' })
const isDesktopOrLaptop = useMediaQuery({
  query: '(min-device-width: 1180px)'
})
const textblock = "Leider haben wir wegen der gegenwärtigen Corona-Maßnahmen bis einschließlich 28.02.2021 geschlossen. Ab dem 1.3.2021 hat unser Salon wieder für Sie geöffnet."
return (
  <Layout>
    <SEO title="Haarstudio Marita" />
    {isDesktopOrLaptop &&
    <Wrapper id="mainwrapper" css={{height: mainHeight + "px"}}> 
    <Header top="start" siteState={siteState} position={scrollPositions} />
    <KontaktIcon /> 
    <Preisliste />
   
    <AnimatePresence>
       {/* {popupState &&
       <motion.div key="popup" variants={navbackground} initial="initial" animate="animate" exit="exit"  css={{width: "100vw", height: "100vh", position: "fixed", zIndex: 15}} >
          <motion.div 
            key="popupcontent" 
            transition={{duration: 0.5}} 
            onClick={() => null} 
            initial={{background: "rgba(255,255,255,0)", display:"none", scaleY: 0, translateX: "-50%", translateY: "-50%"}} 
            animate={{background: "rgba(255,255,255,1)", display:"flex", scaleY: 1, translateX: "-50%", translateY: "-50%"}} 
            exit={{background: "rgba(255,255,255,0)", display:"none", scaleY: 0, translateX: "-50%", translateY: "-50%"}}  
            css={{position: "fixed", flexDirection: "column", alignItems: "center", top: "50%", left: "50%",  padding: "2em 4em", zIndex: 16, transformOrigin: "50% 50%", background: white}}
            >
              <div onClick={() => setPopupState(false)}  css={{padding: "0.5em", fontSize: "1.6em", lineHeight: "0em", borderRadius: "50%", background: beige, color: dark, border: "1px solid " +dark, cursor: "pointer", [":hover"]: {color: beige, background: dark}}}>
                  <VscClose /> 
              </div>
              <h4> Lieber Besucherin, lieber Besucher,</h4>
              <p css={{textAlign: "center"}}>
              {textblock}
              </p>
              <p css={{textAlign: "center", fontWeight: 600}}>
              Ihr Haarstudio Marita Team
              </p>
        </motion.div>
      </motion.div>  
      } */}
    </AnimatePresence>    
        
    <motion.div style={{scaleY: scrollanimation, originY: 0 }}  css={{position: "fixed", top:0, right: 0, width: "10px", background: dark, zIndex: 12, height: scrollheight + "px" }} />
    
    <motion.div id="header" style={{y: ySlow}} css={{ width: `100vw`, height: `90vh`, top: 0, left: 0,  zIndex: 2, overflow: "hidden", margin: "auto", position: "fixed"}}>
      <Image image="team01" css={{zIndex: 1}} />
      <div css={{width: "100%", height: "100%", position: "absolute", zIndex: 4,background: "rgba(0,0,0, 0.3)", top: 0 }}></div>
        
        <motion.h1 style={{y: yMedium, x:"-50%"}} css={{position: "absolute", top: "50%", left: "50%", textAlign: "center", transform: "translate(-50%, -50%)", zIndex: 5}}>
          Haarstudio <br />Marita
          </motion.h1>

    </motion.div>
  
  <motion.div id="wrapper" style={{y: yFast}} css={{position: "fixed",  height: "auto", width: "auto", top: "90vh", left: "auto", right: "auto", zIndex: 5, background: light, width: "100%"}}> 
    
    <FlexContainer id="angebot" align="center" justify="center">
      <FlexBox direction="column" align="center" justify="center">
      <motion.div style={{y: paralaxFast, x: "-50%"}} css={{width: "8em", height: "8em", background: beige, borderRadius: "50%", position: "absolute", top: "10%", left: "50%",  zIndex: -1}}></motion.div>
        <h2 css={{textAlign: "right", color: beige}}>Wir bieten alles für Ihre Haare:</h2>
        <div css={{color: darkgrey}}>
        <div css={{zIndex: 13}}>
        <h4>
          Damenschnitt
        </h4>
        <h4>
          Herrenschnitt
        </h4>
        <h4>
          Färben & Tönen
        </h4>
        <h4 >
          Balayage & Foilyage
        </h4>
        <h4 >
          Extensions - Hairtalk
        </h4>
        <h4>
          Wimpern & Augenbrauen färben
        </h4>
        <h4>
          Make-Up & Hochzeitsfrisur
        </h4>
        </div>
        </div>
      </FlexBox>
    </FlexContainer>
    <FlexContainer id="salon" direction="column" justify="space-evenly" align="center" css={{color: dark}}>
      <h2 css={{color: beige}}>Das Studio</h2>
      <FlexBox direction="column" justify="center" align="flex-start" css={{width: "100%", margin: "3em 0"}}>
            <div css={{display: "flex", flexDirection: "row", width: "100%", alignItems: "flex-start", justifyContent: "space-evenly"}}>
            <div css={{width: "24em"}} >
            <h3>
              Ein Ort zum Verweilen
            </h3>
            <p css={{marginLeft: "6em"}} >
            Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.
              </p>
            </div>

              <motion.div style={{y: paralaxFast}} css={{width: "40%", height: "30em", marginTop: "-4em"}}>
              <Image image="studio06" />
              </motion.div>
            </div>
      </FlexBox>
      <FlexBox css={{height: "auto", width: "100%", margin: "3em 0"}}>
  
        <motion.div style={{y: paralaxSlow}}  css={{height: "24em", width: "100%"}}>
          <Image image="studio03" />
        </motion.div>
      </FlexBox>
      <FlexBox direction="row" justify="space-evenly" align="flex-start" css={{ width: "100%", margin: "3em 0"}} >
        <div css={{width: "40%"}}>
        <motion.div style={{y: paralaxSlow}} css={{width: "100%", height: "30em", marginTop: "6em"}}>
          <Image image="studio07" />
        </motion.div>
        <motion.div style={{y: paralaxFast, x: 50}} css={{width: "30em", height: "30em", marginTop: "6em"}}>
          <Image image="studio05" />
        </motion.div>
        </div>

        <div css={{width: "24em"}}>
          <h3 >
            Der Weg zu Ihrem Haarschnitt
          </h3>
          <p css={{paddingLeft: "6em"}}>
          Exaktes Zuhören. Das ist das wahre Geheimnis, um wirklich gezielt auf Ihre Wünsche eingehen zu können. Mit professioneller Schnitttechnik bringen wir Ihre Vorstellungen dann in Form. Bei uns können Sie sich inspirieren lassen.
          </p>
          <motion.div style={{y: paralaxSlow}} transition={{duration: 0.4}} css={{width: "100%", height: "30em",marginTop: "3em"}}>
            <Image image="studio02" />
        </motion.div>
        </div>
      </FlexBox>
     
      </FlexContainer>

    <FlexContainer id="team" direction="column" align="center" justify="center" css={{color: dark}}>
      <h2 css={{textAlign: "center", color: beige}}>Das Team</h2>
      <h3 css={{textAlign: "center"}}>Friseurinnen mit Leidenschaft</h3>
      <p css={{textAlign: "center", maxWidth: "60%", marginBottom: "8em"}}>Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird. Ein Erlebnis, das Sie gerne weiterempfehlen und selbst aufs Neue wieder und wieder erleben möchten.</p>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em", marginBottom: "3em"}}>
        <motion.div style={{y:paralaxFast}}>
          <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team01" margin={0} />
        </motion.div>
        <motion.div style={{y:paralaxSlow}}>
          <TeamCard name="Lisa Scheuing" titel="Friseurmeisterin" bild="team03" margin={0} />
        </motion.div>
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-between" css={{width: "54em", marginBottom: "3em"}}>
        <motion.div style={{y:paralaxFast}}>
          <TeamCard name="Dina Romano" titel="Friseurin" bild="team06" margin={0} />
        </motion.div>
        <motion.div style={{y:paralaxSlow}}>
          <TeamCard name="Laura Ott" titel="Friseurin" bild="team05" margin={0} />
        </motion.div>
        <motion.div style={{y:paralaxFast}}>
          <TeamCard name="Simone Teetz" titel="Friseurin" bild="team07" margin={0} />
        </motion.div>
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em"}}>
        <motion.div style={{y:paralaxSlow}}>
          <TeamCard name="Christine Siebert" titel="Assistentin" bild="team02" margin={0} />
        </motion.div>
        <motion.div style={{y:paralaxFast}}>
          <TeamCard name="Silvia Lickert" titel="Assistentin" bild="team04" margin={0} />
        </motion.div>
      </FlexBox>
    </FlexContainer>

    <FlexContainer id="kontakt" direction="column" align="center" css={{paddingTop: 0}}>
      <h2 css={{color: beige}}>Kontakt</h2>
      <p>
        Rufen Sie einfach an unter
      </p>
      <a href="tel:+49761484745">
        <h3 className="linkclass">  0761 484745 
        </h3>
      </a>
     
      <FlexBox direction="row" justify="space-between" align="flex-start" css={{width: "100%",}}>
          <div css={{width: "24em", height: "18em", display: "none"}}>
            <Image image="studio08" />
          </div>
          
          <div css={{background: "transparent" , color: dark, padding: "2em 2em"}}>
            <h4 css={{textAlign: "left"}}>Unsere <br />Öffnungszeiten</h4>
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

          </div>
          <div css={{background: "transparent" , color: dark, padding: "2em 2em"}}>
            <h4 css={{textAlign: "left"}}>Hier finden Sie uns</h4>
            <p>
              Haarstudio Marita Kraus GmbH
            </p>
            <p>
              Andreas-Hofer-Str. 69b
            </p>
            <p>
              79111 Freiburg im Breisgau
            </p>

          </div>
          <div css={{background: "transparent" , color: dark, padding: "2em 2em"}}>
            <h4  css={{textAlign: "left"}}>Anfahrt</h4>
            <div css={{width: "400px", height: "400px", padding: "2em", background: beige}}>
              <SimpleMap />
            </div>
          </div>
      </FlexBox>
    </FlexContainer>
    <FlexContainer id="footer" direction="column" justify="center" align="center" css={{padding: "0 2em"}}>
        <Footer />

    </FlexContainer>
    </motion.div> 
    
    </Wrapper>
    }
    {
      isTabletOrMobile &&
      <Wrapper id="mainwrapper"  css={{scrollBehavior: "smooth"}}> 
      <HeaderMobile siteState={siteState} position={scrollPositions} />
      <KontaktIconMobile />

      <AnimatePresence>
       {/* {popupState &&
       <motion.div key="popup" variants={navbackground} initial="initial" animate="animate" exit="exit"  css={{width: "100vw", height: "100vh", position: "fixed", zIndex: 15}} >
          <motion.div 
            key="popupcontent" 
            transition={{duration: 0.5}} 
            onClick={() => null} 
            initial={{background: "rgba(255,255,255,0)", display:"none", scaleY: 0, translateX: "-50%", translateY: "-50%"}} 
            animate={{background: "rgba(255,255,255,1)", fontSize: "14px", display:"flex", scaleY: 1, translateX: "-50%", translateY: "-50%"}} 
            exit={{background: "rgba(255,255,255,0)", display:"none", scaleY: 0, translateX: "-50%", translateY: "-50%"}}  
            css={{position: "fixed", fontSize: "14px",width: "80vw", overflow: "hidden", flexDirection: "column", alignItems: "center", top: "50%", left: "50%",  padding: "1em 2em", zIndex: 16, transformOrigin: "50% 50%", background: white, maxHeight: "80vh"}}
            >
              <div onClick={() => setPopupState(false)}  css={{padding: "0.5em", fontSize: "1.6em", lineHeight: "0em", borderRadius: "50%", background: beige, color: dark, border: "1px solid " +dark, cursor: "pointer", [":hover"]: {color: beige, background: dark}}}>
                  <VscClose /> 
              </div>
              <h4 css={{fontSize: "1.6em"}}> Lieber Besucherin, lieber Besucher,</h4>
              <p css={{textAlign: "center"}}>
              {textblock}
              
              </p>
              <p css={{textAlign: "center", fontWeight: 600}}>
              Ihr Haarstudio Marita Team
              </p>
        </motion.div>
      </motion.div>  
      } */}
      </AnimatePresence>
      
      <motion.div id="header"  css={mq({ width: `100vw`, height: [`300px`, `300px`, `50vh`, `80vh`], top: 0, left: 0,  zIndex: 2, overflow: "hidden", margin: "auto", position: "relative"})}>
        <Image image="team01" css={{zIndex: 1}} />
        <div css={{width: "100%", height: "100%", position: "absolute", zIndex: 4,background: "rgba(0,0,0, 0.2)", top: 0 }}></div>
          
          <motion.h1 css={{position: "absolute", fontSize: ["1.2em", "2.4em"], bottom: "0", left: "50%", width: "100%", textAlign: "center", transform: "translate(-50%, 0)", zIndex: 5}}>
            Haarstudio Marita
          </motion.h1>

      </motion.div>
    
    <motion.div id="wrapper" css={{position: "relative",  height: "auto", width: "auto", left: "auto", right: "auto", zIndex: 5, background: light, width: "100%", ["h2"]: {marginTop: "6em"}}}> 
      <FlexContainerMobile id="angebot" align="center" justify="center">
        <FlexBoxMobile direction="column" align="center" justify="center" css={{position: "relative"}}>
          <motion.div style={{y: paralaxFast, x: "-50%"}} css={{width: "8em", height: "8em", background: beige, borderRadius: "50%", position: "absolute", top: "10%", left: "50%", zIndex: -1}}></motion.div>

          <h2 css={{textAlign: "center", color: beige}}>Wir bieten alles für Ihre Haare:</h2>
          
          <div css={{color: darkgrey, position: "relative"}}>
          <div css={{zIndex: 13}}>
          <h4>
            Damenschnitt
          </h4>
          <h4>
            Herrenschnitt
          </h4>
          <h4>
            Färben & Tönen
          </h4>
          <h4 >
            Balayage & Foilyage
          </h4>
          <h4 >
            Extensions - Hairtalk
          </h4>
          <h4>
            Wimpern & Augenbrauen färben
          </h4>
          <h4>
            Make-Up & Hochzeitsfrisur
          </h4>
          </div>
          </div>
        
        </FlexBoxMobile>
      
        
    </FlexContainerMobile>
    <FlexContainerMobile id="salon" css={{color: dark}}>
      <FlexBoxMobile>
      <h2 css={{color: beige}}>Das Studio</h2>
            <div css={{width: "auto"}} >
            <h3>
              Ein Ort zum Verweilen
            </h3>
            <p css={{maxWidth: "42em"}}>
            Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.
            </p>
            </div>
      </FlexBoxMobile>

      <FlexBoxMobile css={{height: "auto", width: "100%", margin: "3em 0"}}>
        <div  css={{height: "24em", width: "100%"}}>
          <Image image="studio03" />
        </div>  
      </FlexBoxMobile>
      <FlexBoxMobile >
        <div>
          <h3>
            Der Weg zu ihrem Haarschnitt
          </h3>
          <p css={{maxWidth: "42em"}}>
          Exaktes Zuhören. Das ist das wahre Geheimnis, um wirklich gezielt auf Ihre Wünsche eingehen zu können. Mit professioneller Schnitttechnik bringen wir Ihre Vorstellungen dann in Form. Bei uns können Sie sich inspirieren lassen.
          </p>
        </div>
      </FlexBoxMobile>
      <FlexBoxMobile>
        <div css={{width: "100%", height: "24em", marginTop: "4em"}}>
          <Image image="studio08" />
        </div>
      </FlexBoxMobile>
      </FlexContainerMobile>

    <FlexContainerMobile id="team" direction="column" align="center" justify="center" css={{color: dark}}>
      <h2 css={{textAlign: "center", color: beige}}>Das Team</h2>
      <h3 css={{textAlign: "center"}}>Friseurinnen mit Leidenschaft</h3>
      <p css={{textAlign: "center", marginBottom: "4em", maxWidth: "42em"}}>Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird. Ein Erlebnis, das Sie gerne weiterempfehlen und selbst aufs Neue wieder und wieder erleben möchten.</p>
      <FlexBoxMobile css={{ marginBottom: "2em"}}>
        <div css={{display: "flex", flexDirection: "row", justifyContent:"space-evenly", flexWrap: "wrap"}}> 
          <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team01" margin={2} />
          <TeamCard name="Lisa Scheuing" titel="Friseurmeisterin" bild="team03" margin={2} />
          <TeamCard name="Dina Romano" titel="Friseurin" bild="team06" margin={2} />
          <TeamCard name="Laura Ott" titel="Friseurin" bild="team05" margin={2} />
          <TeamCard name="Simone Teetz" titel="Friseurin" bild="team07" margin={2} />
          <TeamCard name="Christine Siebert" titel="Assistentin" bild="team02" margin={2} />
          <TeamCard name="Silvia Lickert" titel="Assistentin" bild="team04" margin={2} />
        </div>
      </FlexBoxMobile>
    </FlexContainerMobile>

    <FlexContainer id="kontakt" direction="column" align="center">
      <FlexBoxMobile>
        <h2 css={{color: beige}}>Kontakt</h2>
        <p>
        Rufen Sie einfach an unter
        </p>
        <a href="tel:+49761484745">
          <h3 className="linkclass">  0761 484745 
        </h3>
        </a>
         
      </FlexBoxMobile>

      <FlexBoxMobile>
          <div css={{width: "24em", height: "18em", display: "none"}}>
            <Image image="studio08" />
          </div>
          <div css={{display: "flex", flexDirection: "row", justifyContent:"space-evenly", flexWrap: "wrap"}}>
          <div css={{background: "transparent" , color: dark, padding: "2em 2em"}}>
            <h4 css={{textAlign: "center"}}>Unsere <br />Öffnungszeiten</h4>
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

          </div>
          <div css={{background: "transparent" , color: dark, padding: "2em 2em"}}>
            <h4 css={{textAlign: "center"}}>Hier finden Sie uns</h4>
            <p>
              Haarstudio Marita Kraus GmbH
            </p>
            <p>
              Andreas-Hofer-Str. 69b
            </p>
            <p>
              79111 Freiburg im Breisgau
            </p>

          </div>
          <div css={{background: "transparent" , color: dark, padding: "2em 2em"}}>
            <h4  css={{textAlign: "center"}}>Anfahrt</h4>
            <div css={{width: "300px", height: "300px", padding: "2em", background: beige}}>
              <SimpleMap />
            </div>
          </div>
          </div>
      </FlexBoxMobile>
    </FlexContainer>
    <FlexContainer id="footer" direction="column" justify="center" align="center" css={mq({padding: ["0 1em", "0 1em", "0 2em", "0 2em"]})}>
    <Footer />

    </FlexContainer>
    </motion.div> 
    
    </Wrapper>
    }
  </Layout>
)}

export default IndexPage
