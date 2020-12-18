import { motion, useSpring, useTransform, useViewportScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { dark, FlexBox, FlexContainer, Wrapper, light } from '../components/styles';

let mainclientheight;
let headerscrollheight;

const Impressum = () => {
    const [mainHeight, setmainHeight] = useState()
    const [siteState, setSiteState] = useState()
    const [scrollheight, setScrollheight] = useState()
    const {scrollY, scrollYProgress} = useViewportScroll() 

useEffect(() => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    mainclientheight = document.getElementById('wrapper').clientHeight
  
    setScrollheight(window.innerHeight / 100 )
    setmainHeight((mainclientheight ) *1.1)
  },[])


    const scrollbar = useTransform(scrollYProgress, value => value * 100  )
    let scrollanimation = useSpring(scrollbar, {damping: 99, stiffness: 100})
    const scrollYSlowest = useTransform(scrollY, value => -0.1*  value  )
    const scrollSlower = useTransform(scrollY, value => -0.2*  value  )
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
    
    
    let ySlowest = useSpring(scrollYSlowest, { damping: 99, stiffness: 200 })
    let ySlower = useSpring(scrollSlower, { damping: 99, stiffness: 200 })
    
    let ySlow = useSpring(scrollSlow, { damping: 99, stiffness: 200 })
    let yMedium = useSpring(scrollMedium, { damping: 99, stiffness: 200 })
    let yFast = useSpring(scrollFast, { damping: 99, stiffness: 200 })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
    })

    return (
        <Layout>
            <SEO title="Impressum" />
            <Header top="impressum" />
            {isDesktopOrLaptop &&

            <Wrapper id="mainwrapper" css={{height: mainHeight + "px"}}> 
            <motion.div style={{scaleY: scrollanimation, originY: 0 }}  css={{position: "fixed", top:0, right: 0, width: "10px", background: dark, zIndex: 12, height: scrollheight + "px" }} />

                <motion.div id="wrapper" style={{y: yFast}} css={{position: "fixed",  height: "auto", width: "auto", top: "100px", left: "auto", right: "auto", zIndex: 5, background: light, width: "100%"}}>
                    <FlexContainer direction="column" css={{padding: "2em 6em"}}>
                        <div >
                            <h1 css={{color: dark, fontSize: "6em"}}>Impressum</h1>
                        </div>
                        <FlexBox direction="column" align="flex-start" css={{ width: "100%"}}>
                        
                        <p>
                        Haarstudio Marita Kraus GmbH <br />
                        Marita Schindler <br />
                        Andreas-Hofer-Str. 69b <br />
                        79111 Freiburg im Breisgau
                        </p>
                        <h5>Kontakt:</h5>
                        <p>
                            Telefon: 0761 484745
                            E-Mail: info@haarstudio-marita.de
                        </p>
                        <p>
                            Vertretungsberechtigter Geschäftsführer: Marita Schindler
                        </p>
                        <p>
                        Eintragung im Handelsregister. <br />
                        Registergericht: Amtsgericht Freiburg i.Breisgau <br />
                        Registernummer:  HRB 3975
                        </p>
                        <p>
                            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 142107470
                        </p>
                        <h2>
                            Urheberrechte
                        </h2>
                        <p>
                        Inhalt, Zusammenstellung, Struktur und Präsentation der Webseiten sind urheberrechtlich geschützt. Die Vervielfältigung und Verbreitung von Informationen oder Daten ohne vorherige schriftliche Zustimmung des Herausgebers ist untersagt. Dies gilt auch für die auszugsweise Vervielfältigung und Verbreitung. 
                        </p>
                        <h2>
                            Gewährleistungsausschluss
                        </h2>
                        <p>
                        Wir prüfen und aktualisieren die Informationen auf unserer Webseite ständig. Trotz aller Sorgfalt können sich die Angaben inzwischen verändert haben. Eine Haftung oder Garantie für die Aktualität, Richtigkeit und Vollständigkeit der zur Verfügung gestellten Informationen kann deshalb nicht übernommen werden.
                        </p>

                        </FlexBox>
                    <Footer />
                    </FlexContainer>
            
            </motion.div>
            
            </Wrapper>
        }
            {isTabletOrMobile &&

            <Wrapper id="mainwrapper" css={{height: "auto"}}> 

                    <FlexContainer direction="column" css={{padding: "2em 1em"}}>
                        <div >
                            <h1 css={{color: dark, fontSize: "6em"}}>Impressum</h1>
                        </div>
                        <FlexBox direction="column" align="flex-start" css={{ width: "100%"}}>
                        
                        <p>
                        Haarstudio Marita Kraus GmbH <br />
                        Marita Schindler <br />
                        Andreas-Hofer-Str. 69b <br />
                        79111 Freiburg im Breisgau
                        </p>
                        <h5>Kontakt:</h5>
                        <p>
                            Telefon: 0761 484745
                            E-Mail: info@haarstudio-marita.de
                        </p>
                        <p>
                            Vertretungsberechtigter Geschäftsführer: Marita Schindler
                        </p>
                        <p>
                        Eintragung im Handelsregister. <br />
                        Registergericht: Amtsgericht Freiburg i.Breisgau <br />
                        Registernummer:  HRB 3975
                        </p>
                        <p>
                            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 142107470
                        </p>
                        <h2>
                            Urheberrechte
                        </h2>
                        <p>
                        Inhalt, Zusammenstellung, Struktur und Präsentation der Webseiten sind urheberrechtlich geschützt. Die Vervielfältigung und Verbreitung von Informationen oder Daten ohne vorherige schriftliche Zustimmung des Herausgebers ist untersagt. Dies gilt auch für die auszugsweise Vervielfältigung und Verbreitung. 
                        </p>
                        <h2>
                            Gewährleistungsausschluss
                        </h2>
                        <p>
                        Wir prüfen und aktualisieren die Informationen auf unserer Webseite ständig. Trotz aller Sorgfalt können sich die Angaben inzwischen verändert haben. Eine Haftung oder Garantie für die Aktualität, Richtigkeit und Vollständigkeit der zur Verfügung gestellten Informationen kann deshalb nicht übernommen werden.
                        </p>

                        </FlexBox>
                    <Footer />
                    </FlexContainer>
            
            
            </Wrapper>
        }
        </Layout>
    )
}
export default Impressum;