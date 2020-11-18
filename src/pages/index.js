import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { beige, black, darkgrey, FlexBox, FlexContainer, grey, light, Wrapper } from "../components/styles"
import TeamCard from "../components/teamcard"
import Footer from "../components/footer"
import { motion, useSpring, useTransform, useViewportScroll } from "framer-motion"
import Header from "../components/header"

let mainscrollheight;
let mainclientheight;
let headerscrollheight;


const IndexPage = () => {
const [mainHeight, setmainHeight] = useState()
const [siteState, setSiteState] = useState()
const [scrollheight, setScrollheight] = useState()
const {scrollY, scrollYProgress} = useViewportScroll() 
const scrollYSlowest = useTransform(scrollY, value => -0.1*  value  )
const scrollSlower = useTransform(scrollY, value => -0.2*  value  )
const scrollSlow = useTransform(scrollY, value => -0.6*  value  )
const scrollMedium = useTransform(scrollY, value => -0.7*  value  )
const scrollFast = useTransform(scrollY, value => -0.8*  value  )



const scrollbar = useTransform(scrollYProgress, value => value * 100  )

let ySlowest = useSpring(scrollYSlowest, { damping: 99, stiffness: 200 })
let ySlower = useSpring(scrollSlower, { damping: 99, stiffness: 200 })

let ySlow = useSpring(scrollSlow, { damping: 99, stiffness: 200 })
let yMedium = useSpring(scrollMedium, { damping: 99, stiffness: 200 })
let yFast = useSpring(scrollFast, { damping: 99, stiffness: 200 })

let scrollanimation = useSpring(scrollbar, {damping: 99, stiffness: 200})


const handleScroll = (e) => {
  let headerTop = document.getElementById("header").scrollHeight
  let angebotTop = document.getElementById("angebot").scrollHeight
  let salonTop = document.getElementById("salon").scrollHeight
  let teamTop = document.getElementById("team").scrollHeight


  
  let section0 = headerTop * 0.6
  let section1 = section0 + angebotTop
  let section2 = section0 + angebotTop + salonTop
  let section3 = section0 + angebotTop + salonTop + teamTop
  console.log(window.pageYOffset)
  console.log(salonTop)
  console.log(section1)
  console.log(section2)
  console.log(section3)

  
  if ( window.pageYOffset < section0 ) {
    console.log("header")
    setSiteState("header")
    }
  else if ( window.pageYOffset < section1 ) {
    console.log("angebot")
    setSiteState("angebot")
    }
  else if ( window.pageYOffset < section2 ) {
    console.log("salon")
    setSiteState("salon")
    }
  else if ( window.pageYOffset < section3 ) {
    console.log("team")
    setSiteState("team")
    }
  else setSiteState("header")
  return 
}

useEffect(() => {
  window.addEventListener("scroll", handleScroll, false);
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
  mainclientheight = document.getElementById('wrapper').clientHeight
  mainscrollheight = document.getElementById('wrapper').scrollHeight
  headerscrollheight = document.getElementById('header').scrollHeight

  console.log(mainclientheight)
  
setScrollheight(window.innerHeight / 50 )
  setmainHeight(mainclientheight + headerscrollheight + 1000)
  return () => window.removeEventListener("scroll", handleScroll, false);
},[])
console.log(scrollheight)
return (
  <Layout>
    <SEO title="Home" />
    <Header siteState={siteState} />
    <Wrapper id="mainwrapper" css={{height: mainHeight + "px"}}> 
    <motion.div style={{scaleY: scrollanimation }}  css={{position: "fixed", top:0, right: 0, width: "10px", background: grey, zIndex: 12, height: scrollheight + "px" }} />
    <motion.div id="header" style={{y: ySlow}} css={{ width: `100vw`, height: `90vh`, top: 0, left: 0, background: "rgba(0,0,0, 0.2)", zIndex: 2, overflow: "hidden", margin: "auto", position: "fixed"}}>
      <Image image="team01" css={{zIndex: 1}} />
      <div css={{height: "100%", width: "100%", position: "absolute",  background: "rgba(0,0,0, 0.2)", zIndex: 4}}>
        <h1 css={{position: "absolute", top: "50%", left: "50%", textAlign: "center", transform: "translate(-50%, -50%)", zIndex: 5}}>Haarstudio <br />Marita Kraus</h1>

      </div>
    </motion.div>
    
  <motion.div id="wrapper" style={{y: yFast}} css={{position: "fixed",  height: "auto", width: "auto", top: "90vh", left: "0", zIndex: 5, background: light}}> 
    <FlexContainer id="angebot" align="center" justify="center">
      <FlexBox direction="column" align="center" justify="center">
        <h2 css={{textAlign: "right", color: beige}}>Wir bieten alles für Ihre Haare:</h2>
        
        <div css={{color: darkgrey}}>
          <motion.div style={{y: ySlower}} css={{width: "8em", height: "8em", background: beige, borderRadius: "50%", position: "absolute", top: "80%", left: "50%", transform: "translate(-50%, -50%)", zIndex: -1}}></motion.div>
        <div css={{zIndex: 13}}>
        <h3>
        Damenschnitt
        </h3>
        <h3>
        Herrenschnitt
        </h3>
        <h3>
        Wimpern
        </h3>
        <h3 >
        Extensions
        </h3>
        <h3>
        Dauerwelle
        </h3>
        <h3>
        Make-Up
        </h3>
        <h3>
        Kinderschnitt
        </h3>
        </div>
        </div>
       
      </FlexBox>
     
        
    </FlexContainer>
    <FlexContainer id="salon" direction="column" justify="space-evenly" align="center">
      <FlexBox direction="row" justify="space-evenly" align="center" css={{width: "100%", margin: "3em 0"}}>
        
            <div css={{width: "30em"}} >
            <h4>
              Ein Ort um zu bleiben
            </h4>
            
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
          <h4>
            Der Weg zu ihrem Haarschnitt
          </h4>
          <p>
          Exaktes Zuhören. Das ist das wahre Geheimnis, um wirklich gezielt auf Ihre Wünsche eingehen zu können. Mit professioneller Schnitttechnik bringen wir Ihre Vorstellungen dann in Form. Bei uns können Sie sich inspirieren lassen.
          </p>
        </div>
        
      </FlexBox>
      </FlexContainer>
    <FlexContainer id="team" direction="column" align="center" justify="center" css={{color: darkgrey}}>
      <h2 css={{textAlign: "center", color: beige}}>Das Team</h2>
      <h3 css={{textAlign: "center"}}>Friseurinnen mit Leidenschaft</h3>
      <p css={{textAlign: "center", maxWidth: "60%"}}>Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.</p>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em"}}>
        <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team01" margin={0} />
        <TeamCard name="Christine Siebert" titel="Friseurin /Assistentin" bild="team02" margin={4} />
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em"}}>
        <TeamCard name="Lisa Scheunig" titel="Friseurmeisterin" bild="team03" margin={0} />
        <TeamCard name="Silvia Lickert" titel="Friseurin / Assistentin" bild="team04" margin={4} />
        <TeamCard name="Dann Laur Ott" titel="Friseurin /Gesellin" bild="team05" margin={0} />
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em"}}>
        <TeamCard name="Dind Romano" titel="Friseurin / Gesellin" bild="team06" margin={4} />
        <TeamCard name="Simone Teetz" titel="Friseurin/ Gesellin" bild="team07" margin={0} />
      </FlexBox>
    </FlexContainer>

    <FlexContainer direction="column" align="center">
      <h2>Kontakt</h2>
      <p>Schreiben Sie uns oder rufen Sie uns an</p>
    </FlexContainer>
    </motion.div>
    </Wrapper>
    <Footer />
  </Layout>
)}

export default IndexPage
