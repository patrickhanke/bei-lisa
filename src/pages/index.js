import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { beige, black, dark, darkgrey, FlexBox, FlexContainer, grey, light, white, Wrapper, FlexBoxMobile, FlexContainerMobile } from "../components/styles"
import TeamCard from "../components/teamcard"
import Footer from "../components/footer"
import { motion, useSpring, useTransform, useViewportScroll } from "framer-motion"
import Header from "../components/header"
import SimpleMap from "../components/google-map"
import KontaktIcon, { KontaktIconMobile } from "../components/kontakticon"
import { useMediaQuery } from "react-responsive"
import HeaderMobile from "../components/header-mobile"

let mainclientheight;
let headerscrollheight;

let section0 = "";
let section1 = "";
let section2 = "";
let section3 = "";
let section4 = "";

const cicleposition = "calc(50%-4em)";

const IndexPage = () => {
const [mainHeight, setmainHeight] = useState()
const [siteState, setSiteState] = useState()
const [scrollheight, setScrollheight] = useState()
const [scrollPositions, setScrollPositions] = useState()
const {scrollY, scrollYProgress} = useViewportScroll() 
const [scrollTimeout, setScrollTimeout] = useState(false) 
const [headerTop, setHeaderTop] = useState()
const [angebotTop, setAngebotTop] = useState()
const [salonTop, setSalonTop] = useState()
const [teamTop, setTeamTop] = useState()
const [kontaktTop, setKontaktTop] = useState()

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

  setHeaderTop( document.getElementById("header"))
  setAngebotTop( document.getElementById("angebot"))
  setSalonTop( document.getElementById("salon"))
  setTeamTop( document.getElementById("team"))
  setKontaktTop( document.getElementById("kontakt"))
  
  function getPositions(element) {
    var yPosition = 0;

    while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { y: yPosition };
  
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
const timer = () => {
  setScrollTimeout(false)
  setTimeout(() => setScrollTimeout(true), 1000) 
}

useEffect(() => {

  
  window.addEventListener("scroll", handleScroll, false);
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
  mainclientheight = document.getElementById('wrapper').clientHeight
  headerscrollheight = document.getElementById('header').scrollHeight
  

  setScrollheight(window.innerHeight / 100 )
  setmainHeight((mainclientheight + headerscrollheight) *1.1)
  return () => window.removeEventListener("scroll", handleScroll, false);
},[])

useEffect(() => {
  handleScroll()
  return
},[])

const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
const isDesktopOrLaptop = useMediaQuery({
  query: '(min-device-width: 1224px)'
})
return (
  <Layout>
    <SEO title="Home" />
    
    {isDesktopOrLaptop &&
    <Wrapper id="mainwrapper" css={{height: mainHeight + "px"}}> 
    <Header siteState={siteState} position={scrollPositions} />
    <KontaktIcon /> 

    <motion.div style={{scaleY: scrollanimation, originY: 0 }}  css={{position: "fixed", top:0, right: 0, width: "10px", background: dark, zIndex: 12, height: scrollheight + "px" }} />
    
    <motion.div id="header" style={{y: ySlow}} css={{ width: `100vw`, height: `90vh`, top: 0, left: 0,  zIndex: 2, overflow: "hidden", margin: "auto", position: "fixed"}}>
      <Image image="team01" css={{zIndex: 1}} />
      <div css={{width: "100%", height: "100%", position: "absolute", zIndex: 4,background: "rgba(0,0,0, 0.2)", top: 0 }}></div>
        
        <motion.h1 style={{y: yMedium, x:"-50%"}} css={{position: "absolute", top: "50%", left: "50%", textAlign: "center", transform: "translate(-50%, -50%)", zIndex: 5}}>
          Haarstudio <br />Marita
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
          Farbe & Tönen
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
        <TeamCard name="Dina Romano" titel="Friseurgesellin" bild="team06" margin={4} />
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em", marginBottom: "2em"}}>
        <TeamCard name="Lisa Scheuing" titel="Friseurmeisterin" bild="team03" margin={0} />
        <TeamCard name="Laura Ott" titel="Friseurgesellin" bild="team05" margin={4} />
        <TeamCard name="Simone Teetz" titel="Friseurgesellin" bild="team07" margin={0} />
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em", marginBottom: "2em"}}>
        <TeamCard name="Christine Siebert" titel="Friseurin / Assistentin" bild="team02" margin={4} />
        <TeamCard name="Silvia Lickert" titel="Friseurin / Assistentin" bild="team04" margin={0} />
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
              Haarstudio Marita GmbH
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
    }
    {
      isTabletOrMobile &&
      <Wrapper id="mainwrapper"  css={{scrollBehavior: "smooth"}}> 
      <HeaderMobile />
      <KontaktIconMobile />
      
      <motion.div id="header"  css={{ width: `100vw`, height: `300px`, top: 0, left: 0,  zIndex: 2, overflow: "hidden", margin: "auto", position: "relative"}}>
        <Image image="team01" css={{zIndex: 1}} />
        <div css={{width: "100%", height: "100%", position: "absolute", zIndex: 4,background: "rgba(0,0,0, 0.2)", top: 0 }}></div>
          
          <motion.h1 css={{position: "absolute", top: "50%", left: "50%", textAlign: "center", transform: "translate(-50%, -50%)", zIndex: 5}}>
            Haarstudio <br /> Marita
          </motion.h1>

      </motion.div>
    
    <motion.div id="wrapper" css={{position: "relative",  height: "auto", width: "auto", left: "auto", right: "auto", zIndex: 5, background: light, width: "100%"}}> 
      <FlexContainerMobile id="angebot" align="center" justify="center">
        <FlexBoxMobile direction="column" align="center" justify="center">
          <h2 css={{textAlign: "center", color: beige}}>Wir bieten alles für Ihre Haare:</h2>
          
          <div css={{color: darkgrey}}>
            <motion.div style={{y: ySlower, x: "50%"}} css={{width: "8em", height: "8em", background: beige, borderRadius: "50%", position: "absolute", top: "80%",zIndex: -1}}></motion.div>
          <div css={{zIndex: 13}}>
          <h4>
            Damenschnitt
          </h4>
          <h4>
            Herrenschnitt
          </h4>
          <h4>
            Farbe & Tönen
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
      <h2 css={{color: beige}}>Das Studio</h2>
      <FlexBoxMobile>
        
            <div css={{width: "30em"}} >
            <h3>
              Ein Ort um zum Verweilen
            </h3>
            
            <p>
              Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen
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
          <p>
          Exaktes Zuhören. Das ist das wahre Geheimnis, um wirklich gezielt auf Ihre Wünsche eingehen zu können. Mit professioneller Schnitttechnik bringen wir Ihre Vorstellungen dann in Form. Bei uns können Sie sich inspirieren lassen.
          </p>
        </div>
        
      </FlexBoxMobile>
      <FlexBoxMobile>
        <div css={{width: "100%", height: "18em"}}>
          <Image image="studio07" />
        </div>
      </FlexBoxMobile>
      </FlexContainerMobile>

    <FlexContainerMobile id="team" direction="column" align="center" justify="center" css={{color: dark}}>
      <h2 css={{textAlign: "center", color: beige}}>Das Team</h2>
      <h3 css={{textAlign: "center"}}>Friseurinnen mit Leidenschaft</h3>
      <p css={{textAlign: "center", marginBottom: "4em"}}>Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.</p>
      <FlexBoxMobile css={{ marginBottom: "2em"}}>
        <div css={{display: "flex", flexDirection: "row", justifyContent:"space-evenly", flexWrap: "wrap"}}> 
          <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team01" margin={2} />
          <TeamCard name="Dina Romano" titel="Friseurgesellin" bild="team06" margin={2} />
          <TeamCard name="Lisa Scheuing" titel="Friseurmeisterin" bild="team03" margin={2} />
          <TeamCard name="Laura Ott" titel="Friseurgesellin" bild="team05" margin={2} />
          <TeamCard name="Simone Teetz" titel="Friseurgesellin" bild="team07" margin={2} />
          <TeamCard name="Christine Siebert" titel="Friseurin / Assistentin" bild="team02" margin={2} />
          <TeamCard name="Silvia Lickert" titel="Friseurin / Assistentin" bild="team04" margin={2} />
        </div>
      </FlexBoxMobile>
    </FlexContainerMobile>

    <FlexContainer id="kontakt" direction="column" align="center">
      <h2 css={{color: beige}}>Kontakt</h2>
      <p>
        Rufen Sie einfach an unter
      </p>
      <h3>0761 484745
      </h3>
      <FlexBoxMobile>
          <div css={{width: "24em", height: "18em", display: "none"}}>
            <Image image="studio08" />
          </div>
          <div css={{display: "flex", flexDirection: "row", justifyContent:"space-evenly", flexWrap: "wrap"}}>
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
              Haarstudio Marita GmbH
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
          </div>
      </FlexBoxMobile>
    </FlexContainer>
    <FlexContainer id="footer" direction="column" justify="center" align="center" css={{paddingBottom: 0}}>
    <Footer />

    </FlexContainer>
    </motion.div> 
    
    </Wrapper>
    }
  </Layout>
)}

export default IndexPage
