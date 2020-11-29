import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { beige, black, dark, darkgrey, FlexBox, FlexContainer, grey, light, white, Wrapper } from "../components/styles"
import TeamCard from "../components/teamcard"
import Footer from "../components/footer"
import { motion, useSpring, useTransform, useViewportScroll } from "framer-motion"
import Header from "../components/header"
import SimpleMap from "../components/google-map"
import KontaktIcon from "../components/kontakticon"

let mainscrollheight;
let mainclientheight;
let headerscrollheight;
let footerscrollheight;


const IndexPage = () => {
const [mainHeight, setmainHeight] = useState()
const [siteState, setSiteState] = useState()
const [scrollheight, setScrollheight] = useState()
const [scrollPositions, setScrollPositions] = useState()
const {scrollY, scrollYProgress} = useViewportScroll() 

const scrollYSlowest = useTransform(scrollY, value => -0.1*  value  )
const scrollSlower = useTransform(scrollY, value => -0.2*  value  )
const scrollSlow = useTransform(scrollY, value => -0.6*  value  )
const scrollMedium = useTransform(scrollY, value => -0.7*  value  )
const scrollFast = useTransform(scrollY, value => -0.9*  value  )



const scrollbar = useTransform(scrollYProgress, value => value * 100  )

let ySlowest = useSpring(scrollYSlowest, { damping: 99, stiffness: 200 })
let ySlower = useSpring(scrollSlower, { damping: 99, stiffness: 200 })

let ySlow = useSpring(scrollSlow, { damping: 99, stiffness: 200 })
let yMedium = useSpring(scrollMedium, { damping: 99, stiffness: 200 })
let yFast = useSpring(scrollFast, { damping: 99, stiffness: 200 })

let scrollanimation = useSpring(scrollbar, {damping: 99, stiffness: 100})


const handleScroll = (e) => {
  let headerTop = document.getElementById("header")
  let angebotTop = document.getElementById("angebot")
  let salonTop = document.getElementById("salon")
  let teamTop = document.getElementById("team")
  let kontaktTop = document.getElementById("kontakt")
  function getPosition(el) {
    var xPos = 0;
    var yPos = 0;
   
    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;
   
        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }
   
      el = el.offsetParent;
    }
    return {
      y: yPos
    };
  }
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
  
  let section0 = getPositions(headerTop)
  let section1 = getPositions(angebotTop)
  let section2 = getPositions(salonTop)
  let section3 = getPositions(teamTop)
  let section4 = getPositions(kontaktTop)

  setScrollPositions(
    {
      start: 0,
      angebot: section1.y * 1.1,
      salon: section2.y * 1.1,
      team: section3.y * 1.1,
      kontakt: section4.y * 1.1
    }
  )

  
  if ( window.pageYOffset < section0.y *1.1 ) {
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
  mainclientheight = document.getElementById('wrapper').clientHeight
  mainscrollheight = document.getElementById('wrapper').scrollHeight
  headerscrollheight = document.getElementById('header').scrollHeight
  footerscrollheight = document.getElementById('footer').clientHeight
  

  setScrollheight(window.innerHeight / 100 )
  setmainHeight((mainclientheight + headerscrollheight) *1.1)
  return () => window.removeEventListener("scroll", handleScroll, false);
},[])

useEffect(() => {
  handleScroll()
  return
},[])
return (
  <Layout>
    <SEO title="Home" />
    <Header siteState={siteState} position={scrollPositions} />
    <KontaktIcon /> 
    <Wrapper id="mainwrapper" css={{height: mainHeight + "px"}}> 
    <motion.div style={{scaleY: scrollanimation, originY: 0 }}  css={{position: "fixed", top:0, right: 0, width: "10px", background: dark, zIndex: 12, height: scrollheight + "px" }} />

    <motion.div id="header" style={{y: ySlow}} css={{ width: `100vw`, height: `90vh`, top: 0, left: 0,  zIndex: 2, overflow: "hidden", margin: "auto", position: "fixed"}}>
      <Image image="team01" css={{zIndex: 1}} />
      <div css={{width: "100%", height: "100%", position: "absolute", zIndex: 4,background: "rgba(0,0,0, 0.2)", top: 0 }}></div>
        
        <motion.h1 style={{y: yMedium, x:"-50%"}} css={{position: "absolute", top: "50%", left: "50%", textAlign: "center", transform: "translate(-50%, -50%)", zIndex: 5}}>
          Haarstudio <br />Marita Kraus
          </motion.h1>

    </motion.div>
  
  <motion.div id="wrapper" style={{y: yFast}} css={{position: "fixed",  height: "auto", width: "auto", top: "90vh", left: "auto", right: "auto", zIndex: 5, background: light, width: "100%"}}> 
    <FlexContainer id="angebot" align="center" justify="center">
      <FlexBox direction="column" align="center" justify="center">
        <h2 css={{textAlign: "right", color: beige}}>Wir bieten alles für Ihre Haare:</h2>
        
        <div css={{color: darkgrey}}>
          <motion.div style={{y: ySlower}} css={{width: "8em", height: "8em", background: beige, borderRadius: "50%", position: "absolute", top: "80%", left: "38%", zIndex: -1}}></motion.div>
        <div css={{zIndex: 13}}>
        <h4>
        Damenschnitt
        </h4>
        <h4>
        Herrenschnitt
        </h4>
        <h4>
        Wimpern
        </h4>
        <h4 >
        Extensions
        </h4>
        <h4>
        Dauerwelle
        </h4>
        <h4>
        Make-Up
        </h4>
        <h4>
        Kinderschnitt
        </h4>
        </div>
        </div>
       
      </FlexBox>
     
        
    </FlexContainer>
    <FlexContainer id="salon" direction="column" justify="space-evenly" align="center" css={{color: dark}}>
      <h2 css={{color: beige}}>Das Studio</h2>
      <FlexBox direction="row" justify="space-evenly" align="center" css={{width: "100%", margin: "3em 0"}}>
        
            <div css={{width: "30em"}} >
            <h3>
              Ein Ort um zum Verweilen
            </h3>
            
            <p>
              Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen
            </p>
            </div>
            <div css={{width: "30%", height: "30em"}}>
            <Image image="studio06" />
            </div>
        
          
      </FlexBox>
      <FlexBox css={{height: "auto", width: "100%", margin: "3em 0"}}>
  
        <div  css={{height: "24em", width: "100%"}}>
          <Image image="studio03" />
        </div>
      </FlexBox>
      <FlexBox direction="row" justify="space-evenly" align="center" css={{ width: "100%", margin: "3em 0"}} >
  
        <div css={{width: "30%", height: "30em"}}>
          <Image image="studio07" />
        </div>
        <div css={{width: "30em"}}>
          <h3>
            Der Weg zu ihrem Haarschnitt
          </h3>
          <p>
          Exaktes Zuhören. Das ist das wahre Geheimnis, um wirklich gezielt auf Ihre Wünsche eingehen zu können. Mit professioneller Schnitttechnik bringen wir Ihre Vorstellungen dann in Form. Bei uns können Sie sich inspirieren lassen.
          </p>
        </div>
        
      </FlexBox>
      </FlexContainer>

    <FlexContainer id="team" direction="column" align="center" justify="center" css={{color: dark}}>
      <h2 css={{textAlign: "center", color: beige}}>Das Team</h2>
      <h3 css={{textAlign: "center"}}>Friseurinnen mit Leidenschaft</h3>
      <p css={{textAlign: "center", maxWidth: "60%", marginBottom: "4em"}}>Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.</p>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em", marginBottom: "2em"}}>
        <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team01" margin={0} />
        <TeamCard name="Christine Siebert" titel="Friseurin /Assistentin" bild="team02" margin={4} />
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em", marginBottom: "2em"}}>
        <TeamCard name="Lisa Scheunig" titel="Friseurmeisterin" bild="team03" margin={0} />
        <TeamCard name="Silvia Lickert" titel="Friseurin / Assistentin" bild="team04" margin={4} />
        <TeamCard name="Dann Laur Ott" titel="Friseurin /Gesellin" bild="team05" margin={0} />
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em", marginBottom: "2em"}}>
        <TeamCard name="Dind Romano" titel="Friseurin / Gesellin" bild="team06" margin={4} />
        <TeamCard name="Simone Teetz" titel="Friseurin/ Gesellin" bild="team07" margin={0} />
      </FlexBox>
    </FlexContainer>

    <FlexContainer id="kontakt" direction="column" align="center">
      <h2 css={{color: beige}}>Kontakt</h2>
      <p>
        Rufen Sie einfach an unter
      </p>
      <h3>0761 484745
      </h3>
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
              Haarstudio Marita
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
    <FlexContainer id="footer" direction="column" justify="center" align="center" css={{paddingBottom: 0}}>
    <Footer />

    </FlexContainer>
    </motion.div>
    </Wrapper>
  
  </Layout>
)}

export default IndexPage
