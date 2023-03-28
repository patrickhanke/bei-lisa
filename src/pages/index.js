import React, { useEffect, useState } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { beige, dark, darkgrey, FlexBox, FlexContainer,light, Wrapper, FlexBoxMobile, FlexContainerMobile, mq, white, teamcontainer } from "../components/styles"
import TeamCard from "../components/teamcard"
import Footer from "../components/footer"
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion"
import Header from "../components/header"
import KontaktMap from "../components/google-map"
import KontaktIcon, { KontaktIconMobile } from "../components/kontakticon"
import { useMediaQuery } from "react-responsive"
import HeaderMobile from "../components/header-mobile"
import { Preisliste } from "../components/preislisten"
import { StaticImage } from "gatsby-plugin-image"
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
const {scrollY, scrollYProgress} = useScroll() 
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

const isTabletOrMobile = useMediaQuery({ query: '(max-device-width: 1180px)' })
const isDesktopOrLaptop = useMediaQuery({
  query: '(min-device-width: 1180px)'
})

const textblock = "Du möchtest Teil unseres Teams werden? Dann bewirb dich jetzt bei uns. Wir freuen uns mir dir von Dienstag bis Freitag zusammen zu arbeiten."
return (
  <Layout>
    <SEO title="Haarstudio Marita" />
    {isDesktopOrLaptop &&
    <Wrapper id="mainwrapper" css={{height: mainHeight + "px"}}> 
    <Header top="start" siteState={siteState} position={scrollPositions} popupHandler={setPopupState} />
    <KontaktIcon /> 
    <Preisliste />
   
    {/* <AnimatePresence>
       {popupState &&
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
              <h4> Wir suchen Dich</h4>
              <p css={{textAlign: "center"}}>
              {textblock}
              </p>
              <p css={{textAlign: "center", fontWeight: 600}}>
              Melde dich bei uns unter 0761 484745
              </p>
        </motion.div>
      </motion.div>  
      }
    </AnimatePresence>     */}
        
    {/* <motion.div style={{scaleY: scrollanimation, originY: 0 }}  css={{position: "fixed", top:0, right: 0, width: "10px", background: dark, zIndex: 12, height: scrollheight + "px" }} /> */}
    
    <motion.div id="header" style={{y: ySlow}} css={{ width: `100vw`, height: `90vh`, top: 0, left: 0,  zIndex: 2, overflow: "hidden", margin: "auto", position: "fixed"}}>
      <StaticImage 
        src={`../images/Haarstudio-Marita-Interieur-2020-web-9.jpg`} 
        alt="Haarstudio Marita Team" 
        objectFit="cover"
        layout="constrained"
        style={{width: '100%', height: '100%', position: 'relative'}}
      />
      <div css={{width: "100%", height: "100%", position: "absolute", zIndex: 4, top: 0 }}></div>
        
        <motion.h1 style={{y: yMedium, x:"-50%"}} css={{position: "absolute", color: white, top: "50%", left: "50%", textAlign: "center", transform: "translate(-50%, -50%)", zIndex: 5}}>
          Haarstudio <br />Marita
          </motion.h1>

    </motion.div>
  
  <motion.div id="wrapper" style={{y: yFast}} css={{position: "fixed",  height: "auto", width: "auto", top: "90vh", left: "auto", right: "auto", zIndex: 5, background: light, width: "100%"}}> 
    
    <FlexContainer id="angebot" align="center" justify="center">
      <FlexBox direction="column" align="center" justify="center">
      <motion.div  style={{y: paralaxFast || 450, x: "-50%"}} css={{width: "8em", height: "8em", backgroundColor: beige, borderRadius: "50%", position: "absolute", top: "10%", left: "50%",  zIndex: -1}}></motion.div>
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
              <StaticImage 
                src={`../images/Haarstudio-Marita-Interieur-2020-web-5.jpg`} 
                alt={"Haarstudio Marita"} 
                objectFit="fill"
                layout="constrained"
                transformOptions={{fit: "cover", cropFocus: "center"}}
              />
            </motion.div>
            </div>
      </FlexBox>
      <FlexBox css={{height: "auto", width: "100%", margin: "3em 0"}}>
  
        <motion.div style={{y: paralaxSlow}}  css={{height: "24em", width: "100%", overflow: "hidden"}}>
          <StaticImage 
            src={`../images/Haarstudio-Marita-Interieur-2020-web-11.jpg`} 
            alt="Haarstudio Marita"
            height={1200}
            width={3600}
            // width="100%"
            // height="100%"
            // objectPosition="50% 50%"
            layout="constrained"
            transformOptions={{fit: "cover", cropFocus: "center"}}
          />
        </motion.div>
      </FlexBox>
      <FlexBox direction="row" justify="space-evenly" align="flex-start" css={{ width: "100%", margin: "3em 0"}} >
        <div css={{width: "40%"}}>
        <motion.div style={{y: paralaxSlow}} css={{width: "100%", height: "30em", marginTop: "2em"}}>
          <StaticImage 
            src={`../images/Haarstudio-Marita-Interieur-2020-web-17.jpg`} 
            alt="Haarstudio Marita"

            objectFit="fill"
            layout="constrained"
            transformOptions={{fit: "cover", cropFocus: "center",}}
          />
        </motion.div>
        <motion.div style={{y: paralaxFast, x: 50}} css={{width: "30em", height: "30em", marginTop: "2em"}}>
          <StaticImage 
            src={`../images/Haarstudio-Marita-Interieur-2020-web-12.jpg`} 
            alt="Haarstudio Marita"
            objectFit="fill"
            layout="constrained"
            transformOptions={{fit: "cover", cropFocus: "center"}}
          />
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
            <StaticImage 
              src={`../images/Haarstudio-Marita-Interieur-2020-web-2.jpg`} 
              alt="Haarstudio Marita"
              width={500}
              height={600}
              // objectFit="cover"
              // objectPosition="50% 50%"
              layout="constrained"
              transformOptions={{fit: "cover", cropFocus: "center"}}
            />
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
          <div css={teamcontainer}>
            <StaticImage 
                src={`../images/team/team01.jpg`} 
                alt="Marita Schindler"
                width={360}
                height={500}
                objectFit="fill"
                layout="constrained"
                transformOptions={{fit: "cover", cropFocus: "center"}}
            />
          </div>
          <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team01" margin={0} />
        </motion.div>
        <motion.div style={{y:paralaxSlow}}>
          <div css={teamcontainer}>
            <StaticImage 
                src={`../images/team/team03.jpg`} 
                alt={"Lisa Scheuing"} 
                width={360}
                height={500}
                objectFit="fill"
                layout="constrained"
                transformOptions={{fit: "cover", cropFocus: "center"}}
            />
          </div>
          <TeamCard name="Lisa Scheuing" titel="Friseurmeisterin" bild="team03" margin={0} />
        </motion.div>
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-between" css={{width: "54em", marginBottom: "6em"}}>
        <motion.div style={{y:paralaxFast}}>
          <div css={teamcontainer}>
            <StaticImage 
                src={`../images/team/havva_figlestahler.jpg`} 
                alt={"Havva Figlestahler"} 
                width={360}
                height={500}
                objectFit="fill"
                layout="constrained"
                transformOptions={{fit: "cover", cropFocus: "center"}}
            />
          </div>
          <TeamCard name="Havva Figlestahler" titel="Friseurmeisterin" bild="havva_figlestahler" margin={0} />
        </motion.div>
        <motion.div style={{y:paralaxSlow}}>
          <div css={teamcontainer}>
            <StaticImage 
                src={`../images/team/lirije_berisa.jpg`} 
                alt="Lirije Berisa" 
                width={360}
                height={500}
                objectFit="fill"
                layout="constrained"
                transformOptions={{fit: "cover", cropFocus: "center"}}
            />
          </div>
          <TeamCard name="Lirije Berisa" titel="Gesellin" bild="lirije_berisa" margin={0} />
        </motion.div>
        <motion.div style={{y:paralaxFast}}>
          <div css={teamcontainer}>
            <StaticImage 
                src={`../images/team/team05.jpg`} 
                alt="Laura Ott" 
                width={360}
                height={500}
                objectFit="fill"
                layout="constrained"
                transformOptions={{fit: "cover", cropFocus: "center"}}
            />
          </div>
          <TeamCard name="Laura Ott" titel="Friseurin" />
        </motion.div>
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em"}}>
        <motion.div style={{y:paralaxSlow}}>
          <div css={teamcontainer}>
            <StaticImage 
                src={`../images/team/christine_siebert.jpg`} 
                alt="Christine Siebert" 
                width={360}
                height={500}
                objectFit="fill"
                layout="constrained"
                transformOptions={{fit: "cover", cropFocus: "center"}}
            />
          </div>
          <TeamCard name="Christine Siebert" titel="Assistentin" bild="christine_siebert" margin={0} />
        </motion.div>
        <motion.div style={{y:paralaxFast}}>
          <div css={teamcontainer}>
            <StaticImage 
                src={`../images/team/team04.jpg`} 
                alt={"Silvia Lickert"} 
                width={360}
                height={500}
                objectFit="fill"
                layout="constrained"
                transformOptions={{fit: "cover", cropFocus: "center"}}
            />
          </div>
          <TeamCard name="Silvia Lickert" titel="Assistentin" bild="team04" />
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
                  Dienstag: 08:30 - 18:30
                </p>
                <p css={{color: dark + " !important"}}>
                  Mittwoch: 08:30 - 19:00
                </p>
                <p css={{color: dark + " !important"}}>
                  Donnerstag: 08:30 - 20:00
                </p>
                <p css={{color: dark + " !important"}}>
                  Freitag: 08:00 - 18:00
                </p>

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
              <KontaktMap />
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
      <HeaderMobile popupHandler={setPopupState} siteState={siteState} position={scrollPositions} />
      <KontaktIconMobile />

      <AnimatePresence>
       {popupState &&
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
              <h4 css={{fontSize: "1.6em"}}> Wir suchen Dich</h4>
              <p css={{textAlign: "center"}}>
              {textblock}
              
              </p>
              <p css={{textAlign: "center", fontWeight: 600}}>
              Melde dich bei uns unter 0761 484745
              </p>
        </motion.div>
      </motion.div>  
      }
      </AnimatePresence>
      
      <motion.div id="header"  css={mq({ width: `100vw`, height: [`auto`, `auto`, `50vh`, `80vh`], top: 0, left: 0,  zIndex: 2, overflow: "hidden", margin: "auto", position: "relative"})}>
        <StaticImage 
          src={`../images/Haarstudio-Marita-Interieur-2020-web-9.jpg`} 
          alt="Haarstudio Marita Team"
          height={300}
          width={400}
          objectFit="cover"
          layout="fullWidth"
          transformOptions={{fit: "cover", cropFocus: "center", position: "center"}}
        />
        <div css={{width: "100%", height: "100%", position: "absolute", zIndex: 4,background: "rgba(0,0,0, 0.2)", top: 0 }}></div>
          
          <motion.h1 css={{position: "absolute", fontSize: ["1.8rem", "2.4rem"], bottom: "0", left: "50%", width: "100%", textAlign: "center", transform: "translate(-50%, 0)", zIndex: 5}}>
            Haarstudio Marita
          </motion.h1>

      </motion.div>
    
    <motion.div id="wrapper" css={{position: "relative",  height: "auto", width: "auto", left: "auto", right: "auto", zIndex: 5, background: light, width: "100%", ["h2"]: {marginTop: "2em"}}}> 
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
        <div  css={{height: "auto", width: "100%"}}>
          <StaticImage 
            src={`../images/Haarstudio-Marita-Interieur-2020-web-11.jpg`} 
            alt="Haarstudio Marita"
            height={2400}
            width={3600}
            layout="constrained"
            transformOptions={{fit: "cover", cropFocus: "center"}}
          />
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
        <StaticImage 
            src={`../images/Haarstudio-Marita-Interieur-2020-web-16.jpg`} 
            alt="Haarstudio Marita"
            height={2400}
            width={3600}
            layout="constrained"
            transformOptions={{fit: "cover", cropFocus: "center"}}
          />
        </div>
      </FlexBoxMobile>
      </FlexContainerMobile>

    <FlexContainerMobile id="team" direction="column" align="center" justify="center" css={{color: dark}}>
      <h2 css={{textAlign: "center", color: beige}}>Das Team</h2>
      <h3 css={{textAlign: "center"}}>Friseurinnen mit Leidenschaft</h3>
      <p css={{textAlign: "center", marginBottom: "4em", maxWidth: "42em"}}>Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird. Ein Erlebnis, das Sie gerne weiterempfehlen und selbst aufs Neue wieder und wieder erleben möchten.</p>
      <FlexBoxMobile css={{ marginBottom: "2em"}}>
        <div css={{display: "flex", flexDirection: "row", justifyContent:"space-evenly", flexWrap: "wrap"}}> 
          <div css={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div css={teamcontainer}>
              <StaticImage 
                  src={`../images/team/team01.jpg`} 
                  alt="Marita Schindler"
                  width={360}
                  height={500}
                  objectFit="fill"
                  layout="constrained"
                  transformOptions={{fit: "cover", cropFocus: "center"}}
              />
              </div>
              <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team01" margin={0} />
          </div>
          <div css={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div css={teamcontainer}>
            <StaticImage 
                src={`../images/team/team03.jpg`} 
                alt={"Lisa Scheuing"} 
                width={360}
                height={500}
                objectFit="fill"
                layout="constrained"
                transformOptions={{fit: "cover", cropFocus: "center"}}
            />
          </div>
            <TeamCard name="Lisa Scheuing" titel="Friseurmeisterin" bild="team03" margin={2} />
          </div>
          <div css={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <div css={teamcontainer}>
            <StaticImage 
                src={`../images/team/havva_figlestahler.jpg`} 
                alt={"Havva Figlestahler"} 
                width={360}
                height={500}
                objectFit="fill"
                layout="constrained"
                transformOptions={{fit: "cover", cropFocus: "center"}}
              />
            </div>
            <TeamCard name="Havva Figlestahler" titel="Friseurmeisterin" bild="havva_figlestahler" margin={0} />
          </div>
          <div css={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          <div css={teamcontainer}>
              <StaticImage 
                  src={`../images/team/lirije_berisa.jpg`} 
                  alt="Lirije Berisa" 
                  width={360}
                  height={500}
                  objectFit="fill"
                  layout="constrained"
                  transformOptions={{fit: "cover", cropFocus: "center"}}
              />
            </div>
            <TeamCard name="Lirije Berisa" titel="Gesellin" />
          </div>
          <div css={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div css={teamcontainer}>
              <StaticImage 
                  src={`../images/team/team05.jpg`} 
                  alt="Laura Ott" 
                  width={360}
                  height={500}
                  objectFit="fill"
                  layout="constrained"
                  transformOptions={{fit: "cover", cropFocus: "center"}}
              />
            </div>
            <TeamCard name="Laura Ott" titel="Friseurin" />
          </div>
          <div css={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div css={teamcontainer}>
              <StaticImage 
                  src={`../images/team/christine_siebert.jpg`} 
                  alt="Christine Siebert" 
                  width={360}
                  height={500}
                  objectFit="fill"
                  layout="constrained"
                  transformOptions={{fit: "cover", cropFocus: "center"}}
              />
            </div>
            <TeamCard name="Christine Siebert" titel="Assistentin" bild="christine_siebert" margin={2} />
          </div>
          <div css={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div css={teamcontainer}>
              <StaticImage 
                  src={`../images/team/team04.jpg`} 
                  alt={"Silvia Lickert"} 
                  width={360}
                  height={500}
                  objectFit="fill"
                  layout="constrained"
                  transformOptions={{fit: "cover", cropFocus: "center"}}
              />
            </div>
            <TeamCard name="Silvia Lickert" titel="Assistentin" bild="team04" margin={2} />
          </div>
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
                  Dienstag 08:30 - 18:30
                </p>
                <p css={{color: dark + " !important"}}>
                  Mittwoch 08:30 - 19:.00
                </p>
                <p css={{color: dark + " !important"}}>
                  Donnerstag 08:30 - 20:00
                </p>
                <p css={{color: dark + " !important"}}>
                  Freitag 08:00 - 18:00
                </p>
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
              <KontaktMap />
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
