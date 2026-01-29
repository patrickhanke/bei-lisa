import React, { useEffect, useState } from "react";

import Layout from "../../components/layout";
import Image from "../../components/image";
import SEO from "../../components/seo";
import { beige, dark, darkgrey, FlexBox, FlexContainer, light, Wrapper, FlexBoxMobile, FlexContainerMobile, mq, white, teamcontainer } from "../../components/styles";
import TeamCard from "../../components/teamcard";
import Footer from "../../components/footer";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import Header from "../../components/header";
import KontaktMap from "../../components/google-map";
import KontaktIcon, { KontaktIconMobile } from "../../components/kontakticon";
import { useMediaQuery } from "react-responsive";
import HeaderMobile from "../../components/header-mobile";
import { Preisliste } from "../../components/preislisten";
import { StaticImage } from "gatsby-plugin-image";
import { VscClose } from "react-icons/vsc";
import HomeHeader from "./components/HomeHeader";
import { loadStaticDataAsync, type BuildTimeData } from "@/lib/static-data";

interface Variants {
  initial: {
    backgroundColor: string;
    transition: {
      delay: number;
      duration: number;
    };
  };
  animate: {
    backgroundColor: string;
    transition: {
      delay: number;
      duration: number;
    };
  };
  exit: {
    backgroundColor: string;
    transition: {
      delay: number;
      duration: number;
    };
  };
}

const navbackground: Variants = {
  initial: { backgroundColor: "rgba(0,0,0,0)", transition: { delay: 0, duration: 0.6 } },
  animate: { backgroundColor: "rgba(0,0,0,0.3)", transition: { delay: 0, duration: 0.6 } },
  exit: { backgroundColor: "rgba(0,0,0,0)", transition: { delay: 0.4, duration: 0.3 } }
};

let mainclientheight: number;
let headerscrollheight: number;

interface Position {
  x: number;
  y: number;
}

let section0: Position | string = "";
let section1: Position | string = "";
let section2: Position | string = "";
let section3: Position | string = "";
let section4: Position | string = "";

interface ScrollPositions {
  start: number;
  angebot: number;
  salon: number;
  team: number;
  kontakt: number;
}

const IndexPage: React.FC = () => {
  
  const [mainHeight, setmainHeight] = useState<number>();
  const [siteState, setSiteState] = useState<string>();
  const [scrollheight, setScrollheight] = useState<number>();
  const [scrollPositions, setScrollPositions] = useState<ScrollPositions>();
  const { scrollY, scrollYProgress } = useScroll();
  const [popupState, setPopupState] = useState(false);
  const [staticData, setStaticData] = useState<BuildTimeData | null>(null);

  console.log('staticData', staticData);

  const scrollSlow = useTransform(scrollY, value => -0.6 * value);
  const scrollMedium = useTransform(scrollY, value => -0.7 * value);
  const scrollFast = useTransform(scrollY, value => -0.9 * value);

  const yRangeLarge = [-450, 0, 450];
  const yRangeNarrow = [-150, 0, 150];
  const scrollRange = [1, 0.5, 0];
  const paralaxfast = useTransform(scrollYProgress, scrollRange, yRangeLarge);
  const paralaxslow = useTransform(scrollYProgress, scrollRange, yRangeNarrow);
  const paralaxFast = useSpring(paralaxfast, { damping: 99, stiffness: 200 });
  const paralaxSlow = useSpring(paralaxslow, { damping: 99, stiffness: 200 });

  const scrollbar = useTransform(scrollYProgress, value => value * 100);

  let ySlow = useSpring(scrollSlow, { damping: 99, stiffness: 200 });
  let yMedium = useSpring(scrollMedium, { damping: 99, stiffness: 200 });
  let yFast = useSpring(scrollFast, { damping: 99, stiffness: 200 });

  let scrollanimation = useSpring(scrollbar, { damping: 99, stiffness: 100 });

  const handleScroll = (e: Event): void => {
    const headerElement = document.getElementById("header");
    const angebotElement = document.getElementById("angebot");
    const salonElement = document.getElementById("salon");
    const teamElement = document.getElementById("team");
    const kontaktElement = document.getElementById("kontakt");
    
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);

    const wrapperElement = document.getElementById('wrapper');
    const headerScrollElement = document.getElementById('header');
    
    if (wrapperElement) {
      mainclientheight = wrapperElement.offsetHeight;
    }
    if (headerScrollElement) {
      headerscrollheight = headerScrollElement.offsetHeight;
    }
    
    setScrollheight(window.innerHeight / 99);
    setmainHeight((mainclientheight + headerscrollheight) * 1.1);

    function getPositions(element: HTMLElement | null): Position {
      let xPosition = 0;
      let yPosition = 0;
      let currentElement = element;

      while (currentElement) {
        xPosition += (currentElement.offsetLeft - currentElement.scrollLeft + currentElement.clientLeft);
        yPosition += (currentElement.offsetTop - currentElement.scrollTop + currentElement.clientTop);
        currentElement = currentElement.offsetParent as HTMLElement | null;
      }

      return { x: xPosition, y: yPosition };
    }

    section0 = getPositions(headerElement);
    section1 = getPositions(angebotElement);
    section2 = getPositions(salonElement);
    section3 = getPositions(teamElement);
    section4 = getPositions(kontaktElement);

    if (typeof section1 !== 'string' && typeof section2 !== 'string' && typeof section3 !== 'string' && typeof section4 !== 'string') {
      setScrollPositions({
        start: 0,
        angebot: section1.y * 1.1,
        salon: section2.y * 1.1,
        team: section3.y * 1.1,
        kontakt: section4.y * 1.1
      });
    }

    if (typeof section2 !== 'string' && typeof section3 !== 'string' && typeof section4 !== 'string') {
      if (window.pageYOffset < 200) {
        setSiteState("header");
      }
      else if (window.pageYOffset < section2.y * 1.1) {
        setSiteState("angebot");
      }
      else if (window.pageYOffset < section3.y * 1.1) {
        setSiteState("salon");
      }
      else if (window.pageYOffset < section4.y * 1.1) {
        setSiteState("team");
      }
      else {
        setSiteState("kontakt");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, false);
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    
    const wrapperElement = document.getElementById('wrapper');
    const headerScrollElement = document.getElementById('header');
    
    if (wrapperElement) {
      mainclientheight = wrapperElement.offsetHeight;
    }
    if (headerScrollElement) {
      headerscrollheight = headerScrollElement.offsetHeight;
    }
    
    setScrollheight(window.innerHeight / 100);
    setmainHeight((mainclientheight + headerscrollheight) * 1.1);
    return () => window.removeEventListener("scroll", handleScroll, false);
  }, []);

  useEffect(() => {
    handleScroll(new Event('scroll'));
  }, []);

  // Load static data from build plugin
  useEffect(() => {
    async function loadData() {
      try {
        const data = await loadStaticDataAsync();
        setStaticData(data);
        console.log('Static data loaded:', data);
      } catch (error) {
        console.error('Failed to load static data:', error);
      }
    }
    loadData();
  }, []);

  const isTabletOrMobile = useMediaQuery({ query: '(max-device-width: 1180px)' });
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1180px)'
  });

  const textblock = "Du möchtest Teil unseres Teams werden? Dann bewirb dich jetzt bei uns. Wir freuen uns mir dir von Dienstag bis Freitag zusammen zu arbeiten.";
  
  return (
    <Layout>
      <SEO title="Bei Lisa" />
     
        <Wrapper id="mainwrapper" css={{ height: mainHeight + "px" }}>
          <Header top="start" siteState={siteState} position={scrollPositions} popupHandler={setPopupState} />
          <KontaktIcon />
          <Preisliste />

          <motion.div id="wrapper" style={{ y: yFast }} css={{ position: "fixed", height: "auto", width: "auto", top: "90vh", left: "auto", right: "auto", zIndex: 5, background: light, width: "100%" }}>
          <HomeHeader />
        
            <FlexContainer id="angebot" align="center" justify="center">
              <FlexBox direction="column" align="center" justify="center">
                {/* <motion.div  style={{y: paralaxFast || 450, x: "-50%"}} css={{width: "8em", height: "8em", backgroundColor: beige, borderRadius: "50%", position: "absolute", top: "10%", left: "50%",  zIndex: -1}}></motion.div> */}
                
                <h2 css={{ textAlign: "right", color: beige }}>Wir bieten alles für Ihre Haare:</h2>
                <div css={{ color: darkgrey }}>
                <div id="bei-lisa">
                  <h3>
                    Bei Lisa
                  </h3>
                  <img loading="lazy" src="/static-data/Lisa.jpg" alt="lisa" css={{ width: "100%", height: "auto", maxWidth: "600px" }} />
                </div>
                  
                </div>
              </FlexBox>
            </FlexContainer>
            <FlexContainer id="salon" direction="column" justify="space-evenly" align="center" css={{ color: dark }}>
              <h2 css={{ color: beige }}>Das Studio</h2>
              <FlexBox direction="column" justify="center" align="flex-start" css={{ width: "100%", margin: "3em 0" }}>
                <div css={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "flex-start", justifyContent: "space-evenly" }}>
                  <div css={{ width: "24em" }} >
                    <h3>
                      Ein Ort zum Verweilen
                    </h3>
                    <p css={{ marginLeft: "6em" }} >
                      Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.
                    </p>
                  </div>

                  <motion.div style={{ y: paralaxFast }} css={{ width: "40%", height: "30em", marginTop: "-4em" }}>
                    <StaticImage
                      src={`../images/Haarstudio-Marita-Interieur-2020-web-5.jpg`}
                      alt={"Bei Lisa"}
                      objectFit="fill"
                      layout="constrained"
                      transformOptions={{ fit: "cover", cropFocus: "center" }}
                    />
                  </motion.div>
                </div>
              </FlexBox>
              <FlexBox css={{ height: "auto", width: "100%", margin: "3em 0" }}>

                <motion.div style={{ y: paralaxSlow }} css={{ height: "24em", width: "100%", overflow: "hidden" }}>
                  <StaticImage
                    src={`../images/Haarstudio-Marita-Interieur-2020-web-11.jpg`}
                    alt="Bei Lisa"
                    height={1200}
                    width={3600}
                    layout="constrained"
                    transformOptions={{ fit: "cover", cropFocus: "center" }}
                  />
                </motion.div>
              </FlexBox>
              <FlexBox direction="row" justify="space-evenly" align="flex-start" css={{ width: "100%", margin: "3em 0" }} >
                <div css={{ width: "40%" }}>
                  <motion.div style={{ y: paralaxSlow }} css={{ width: "100%", height: "30em", marginTop: "2em" }}>
                    <StaticImage
                      src={`../images/Haarstudio-Marita-Interieur-2020-web-17.jpg`}
                      alt="Bei Lisa"
                      objectFit="fill"
                      layout="constrained"
                      transformOptions={{ fit: "cover", cropFocus: "center" }}
                    />
                  </motion.div>
                  <motion.div style={{ y: paralaxFast, x: 50 }} css={{ width: "30em", height: "30em", marginTop: "2em" }}>
                    <StaticImage
                      src={`../images/Haarstudio-Marita-Interieur-2020-web-12.jpg`}
                      alt="Bei Lisa"
                      objectFit="fill"
                      layout="constrained"
                      transformOptions={{ fit: "cover", cropFocus: "center" }}
                    />
                  </motion.div>
                </div>

                <div css={{ width: "24em" }}>
                  <h3 >
                    Der Weg zu Ihrem Haarschnitt
                  </h3>
                  <p css={{ paddingLeft: "6em" }}>
                    Exaktes Zuhören. Das ist das wahre Geheimnis, um wirklich gezielt auf Ihre Wünsche eingehen zu können. Mit professioneller Schnitttechnik bringen wir Ihre Vorstellungen dann in Form. Bei uns können Sie sich inspirieren lassen.
                  </p>
                  <motion.div style={{ y: paralaxSlow }} transition={{ duration: 0.4 }} css={{ width: "100%", height: "30em", marginTop: "3em" }}>
                    <StaticImage
                      src={`../images/Haarstudio-Marita-Interieur-2020-web-2.jpg`}
                      alt="Bei Lisa"
                      width={500}
                      height={600}
                      layout="constrained"
                      transformOptions={{ fit: "cover", cropFocus: "center" }}
                    />
                  </motion.div>
                </div>
              </FlexBox>

            </FlexContainer>

            <FlexContainer id="team" direction="column" align="center" justify="center" css={{ color: dark }}>
              <h2 css={{ textAlign: "center", color: beige }}>Das Team</h2>
              <h3 css={{ textAlign: "center" }}>Friseurinnen mit Leidenschaft</h3>
              <p css={{ textAlign: "center", maxWidth: "60%", marginBottom: "8em" }}>Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird. Ein Erlebnis, das Sie gerne weiterempfehlen und selbst aufs Neue wieder und wieder erleben möchten.</p>
              <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{ width: "54em", marginBottom: "3em" }}>
                <motion.div style={{ y: paralaxFast }}>
                  <div css={teamcontainer}>
                    <StaticImage
                      src={`../images/team/HM-05.jpg`}
                      alt="Marita Schindler"
                      width={360}
                      height={500}
                      objectFit="fill"
                      layout="constrained"
                      transformOptions={{ fit: "cover", cropFocus: "center" }}
                    />
                  </div>
                  <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team01" margin={0} />
                </motion.div>
                <motion.div style={{ y: paralaxSlow }}>
                  <div css={teamcontainer}>
                    <StaticImage
                      src={`../images/team/HM-03.jpg`}
                      alt={"Lisa Scheuing"}
                      width={360}
                      height={500}
                      objectFit="fill"
                      layout="constrained"
                      transformOptions={{ fit: "cover", cropFocus: "center" }}
                    />
                  </div>
                  <TeamCard name="Lisa Scheuing" titel="Friseurmeisterin" bild="team03" margin={0} />
                </motion.div>
              </FlexBox>
              <FlexBox direction="row" align="flex-start" justify="space-between" css={{ width: "54em", marginBottom: "6em" }}>
                <motion.div style={{ y: paralaxFast }}>
                  <div css={teamcontainer}>
                    <StaticImage
                      src={`../images/team/HM-01.jpg`}
                      alt="Laura Ott"
                      width={360}
                      height={500}
                      objectFit="fill"
                      layout="constrained"
                      transformOptions={{ fit: "cover", cropFocus: "center" }}
                    />
                  </div>
                  <TeamCard name="Laura Ott" titel="Friseurin (Elternzeit)" />
                </motion.div>
              </FlexBox>
              <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{ width: "54em" }}>
                <motion.div style={{ y: paralaxSlow }}>
                  <div css={teamcontainer}>
                    <StaticImage
                      src={`../images/team/HM-04.jpg`}
                      alt="Christine Siebert"
                      width={360}
                      height={500}
                      objectFit="fill"
                      layout="constrained"
                      transformOptions={{ fit: "cover", cropFocus: "center" }}
                    />
                  </div>
                  <TeamCard name="Christine Siebert" titel="Assistentin" bild="christine_siebert" margin={0} />
                </motion.div>
                <motion.div style={{ y: paralaxFast }}>
                  <div css={teamcontainer}>
                    <StaticImage
                      src={`../images/team/HM-02.jpg`}
                      alt={"Silvia Lickert"}
                      width={360}
                      height={500}
                      objectFit="fill"
                      layout="constrained"
                      transformOptions={{ fit: "cover", cropFocus: "center" }}
                    />
                  </div>
                  <TeamCard name="Silvia Lickert" titel="Assistentin" bild="team04" />
                </motion.div>
              </FlexBox>
            </FlexContainer>

            <FlexContainer id="kontakt" direction="column" align="center" css={{ paddingTop: 0 }}>
              <h2 css={{ color: beige }}>Kontakt</h2>
              <p>
                Rufen Sie einfach an unter
              </p>
              <a href="tel:+49761484745">
                <h3 className="linkclass">  0761 484745
                </h3>
              </a>

              <FlexBox direction="row" justify="space-between" align="flex-start" css={{ width: "100%" }}>
                <div css={{ width: "24em", height: "18em", display: "none" }}>
                  <Image image="studio08" />
                </div>

                <div css={{ background: "transparent", color: dark, padding: "2em 2em" }}>
                  <h4 css={{ textAlign: "left" }}>Unsere <br />Öffnungszeiten</h4>
                  <p css={{ color: dark + " !important" }}>
                    Di.: 08:30 - 18:30
                  </p>
                  <p css={{ color: dark + " !important" }}>
                    Mi.: 08:00 - 18:00
                  </p>
                  <p css={{ color: dark + " !important" }}>
                    Do.: 08:30 - 20:00
                  </p>
                  <p css={{ color: dark + " !important" }}>
                    Fr.: 08:00 - 18:00
                  </p>
                </div>
                <div css={{ background: "transparent", color: dark, padding: "2em 2em" }}>
                  <h4 css={{ textAlign: "left" }}>Hier finden Sie uns</h4>
                  <p>
                    Bei Lisa Kraus GmbH
                  </p>
                  <p>
                    Andreas-Hofer-Str. 69b
                  </p>
                  <p>
                    79111 Freiburg im Breisgau
                  </p>

                </div>
                <div css={{ background: "transparent", color: dark, padding: "2em 2em" }}>
                  <h4 css={{ textAlign: "left" }}>Anfahrt</h4>
                  <div css={{ width: "400px", height: "400px", padding: "2em", background: beige }}>
                    <KontaktMap />
                  </div>
                </div>
              </FlexBox>
            </FlexContainer>
            <FlexContainer id="footer" direction="column" justify="center" align="center" css={{ padding: "0 2em" }}>
              <Footer />

            </FlexContainer>
          </motion.div>

        </Wrapper>

        {/* isTabletOrMobile &&
        <Wrapper id="mainwrapper" css={{ scrollBehavior: "smooth" }}>
          <HeaderMobile popupHandler={setPopupState} siteState={siteState} position={scrollPositions} />
          <KontaktIconMobile />

          <AnimatePresence>
            {popupState &&
              <motion.div key="popup" variants={navbackground} initial="initial" animate="animate" exit="exit" css={{ width: "100vw", height: "100vh", position: "fixed", zIndex: 15 }} >
                <motion.div
                  key="popupcontent"
                  transition={{ duration: 0.5 }}
                  onClick={() => null}
                  initial={{ background: "rgba(255,255,255,0)", display: "none", scaleY: 0, translateX: "-50%", translateY: "-50%" }}
                  animate={{ background: "rgba(255,255,255,1)", fontSize: "14px", display: "flex", scaleY: 1, translateX: "-50%", translateY: "-50%" }}
                  exit={{ background: "rgba(255,255,255,0)", display: "none", scaleY: 0, translateX: "-50%", translateY: "-50%" }}
                  css={{ position: "fixed", fontSize: "14px", width: "80vw", overflow: "hidden", flexDirection: "column", alignItems: "center", top: "50%", left: "50%", padding: "1em 2em", zIndex: 16, transformOrigin: "50% 50%", background: white, maxHeight: "80vh" }}
                >
                  <div onClick={() => setPopupState(false)} css={{ padding: "0.5em", fontSize: "1.6em", lineHeight: "0em", borderRadius: "50%", background: beige, color: dark, border: "1px solid " + dark, cursor: "pointer", [":hover"]: { color: beige, background: dark } }}>
                    <VscClose />
                  </div>
                  <h4 css={{ fontSize: "1.6em" }}> Wir suchen Dich</h4>
                  <p css={{ textAlign: "center" }}>
                    {textblock}

                  </p>
                  <p css={{ textAlign: "center", fontWeight: 600 }}>
                    Melde dich bei uns unter 0761 484745
                  </p>
                </motion.div>
              </motion.div>
            }
          </AnimatePresence>

          <div css={mq({ width: `100vw`, height: [`auto`, `auto`, `50vh`, `80vh`], top: 0, left: 0, zIndex: 2, overflow: "hidden", margin: "auto", position: "relative" })}>
            <StaticImage
              src={`../images/hs_header.jpg`}
              alt="Bei Lisa Team"
              height={300}
              width={400}
              objectFit="cover"
              layout="fullWidth"
              transformOptions={{ fit: "cover", cropFocus: "center", position: "center" }}
            />
            <div css={{ width: "100%", height: "100%", position: "absolute", zIndex: 4, background: "rgba(0,0,0, 0.2)", top: 0 }}></div>

            <h1 css={{ position: "absolute", fontSize: ["1.8rem", "2.4rem"], bottom: "0", left: "50%", width: "100%", textAlign: "center", transform: "translate(-50%, 0)", zIndex: 5 }}>
              Bei Lisa
            </h1>

          </div>

          <motion.div css={{ position: "relative", height: "auto", width: "auto", left: "auto", right: "auto", zIndex: 5, background: light, width: "100%", ["h2"]: { marginTop: "2em" } }}>
            <FlexContainerMobile id="angebot" align="center" justify="center">
              <FlexBoxMobile direction="column" align="center" justify="center" css={{ position: "relative" }}>
                <motion.div style={{ y: paralaxFast, x: "-50%" }} css={{ width: "8em", height: "8em", background: beige, borderRadius: "50%", position: "absolute", top: "10%", left: "50%", zIndex: -1 }}></motion.div>

                <h2 css={{ textAlign: "center", color: beige }}>Wir bieten alles für Ihre Haare:</h2>

                <div css={{ color: darkgrey, position: "relative" }}>
                  <div css={{ zIndex: 13 }}>
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
            <FlexContainerMobile id="salon" css={{ color: dark }}>
              <FlexBoxMobile>
                <h2 css={{ color: beige }}>Das Studio</h2>
                <div css={{ width: "auto" }} >
                  <h3>
                    Ein Ort zum Verweilen
                  </h3>
                  <p css={{ maxWidth: "42em" }}>
                    Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.
                  </p>
                </div>
              </FlexBoxMobile>

              <FlexBoxMobile css={{ height: "auto", width: "100%", margin: "3em 0" }}>
                <div css={{ height: "auto", width: "100%" }}>
                  <StaticImage
                    src={`../images/Haarstudio-Marita-Interieur-2020-web-11.jpg`}
                    alt="Bei Lisa"
                    height={2400}
                    width={3600}
                    layout="constrained"
                    transformOptions={{ fit: "cover", cropFocus: "center" }}
                  />
                </div>
              </FlexBoxMobile>
              <FlexBoxMobile >
                <div>
                  <h3>
                    Der Weg zu ihrem Haarschnitt
                  </h3>
                  <p css={{ maxWidth: "42em" }}>
                    Exaktes Zuhören. Das ist das wahre Geheimnis, um wirklich gezielt auf Ihre Wünsche eingehen zu können. Mit professioneller Schnitttechnik bringen wir Ihre Vorstellungen dann in Form. Bei uns können Sie sich inspirieren lassen.
                  </p>
                </div>
              </FlexBoxMobile>
              <FlexBoxMobile>
                <div css={{ width: "100%", height: "24em", marginTop: "4em" }}>
                  <StaticImage
                    src={`../images/Haarstudio-Marita-Interieur-2020-web-16.jpg`}
                    alt="Bei Lisa"
                    height={2400}
                    width={3600}
                    layout="constrained"
                    transformOptions={{ fit: "cover", cropFocus: "center" }}
                  />
                </div>
              </FlexBoxMobile>
            </FlexContainerMobile>

            <FlexContainerMobile id="team" direction="column" align="center" justify="center" css={{ color: dark }}>
              <h2 css={{ textAlign: "center", color: beige }}>Das Team</h2>
              <h3 css={{ textAlign: "center" }}>Friseurinnen mit Leidenschaft</h3>
              <p css={{ textAlign: "center", marginBottom: "4em", maxWidth: "42em" }}>Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird. Ein Erlebnis, das Sie gerne weiterempfehlen und selbst aufs Neue wieder und wieder erleben möchten.</p>
              <FlexBoxMobile css={{ marginBottom: "2em" }}>
                <div css={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                  <div css={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div css={teamcontainer}>
                      <StaticImage
                        src={`../images/team/HM-05.jpg`}
                        alt="Marita Schindler"
                        width={360}
                        height={500}
                        objectFit="fill"
                        layout="constrained"
                        transformOptions={{ fit: "cover", cropFocus: "center" }}
                      />
                    </div>
                    <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team01" margin={0} />
                  </div>
                  <div css={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div css={teamcontainer}>
                      <StaticImage
                        src={`../images/team/HM-03.jpg`}
                        alt={"Lisa Scheuing"}
                        width={360}
                        height={500}
                        objectFit="fill"
                        layout="constrained"
                        transformOptions={{ fit: "cover", cropFocus: "center" }}
                      />
                    </div>
                    <TeamCard name="Lisa Scheuing" titel="Friseurmeisterin" bild="team03" margin={2} />
                  </div>
                  <div css={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div css={teamcontainer}>
                      <StaticImage
                        src={`../images/team/HM-01.jpg`}
                        alt="Laura Ott"
                        width={360}
                        height={500}
                        objectFit="fill"
                        layout="constrained"
                        transformOptions={{ fit: "cover", cropFocus: "center" }}
                      />
                    </div>
                    <TeamCard name="Laura Ott" titel="Friseurin (Elternzeit)" />
                  </div>
                  <div css={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div css={teamcontainer}>
                      <StaticImage
                        src={`../images/team/HM-04.jpg`}
                        alt="Christine Siebert"
                        width={360}
                        height={500}
                        objectFit="fill"
                        layout="constrained"
                        transformOptions={{ fit: "cover", cropFocus: "center" }}
                      />
                    </div>
                    <TeamCard name="Christine Siebert" titel="Assistentin" bild="christine_siebert" margin={2} />
                  </div>
                  <div css={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div css={teamcontainer}>
                      <StaticImage
                        src={`../images/team/HM-02.jpg`}
                        alt={"Silvia Lickert"}
                        width={360}
                        height={500}
                        objectFit="fill"
                        layout="constrained"
                        transformOptions={{ fit: "cover", cropFocus: "center" }}
                      />
                    </div>
                    <TeamCard name="Silvia Lickert" titel="Assistentin" bild="team04" margin={2} />
                  </div>
                </div>
              </FlexBoxMobile>
            </FlexContainerMobile>

            <FlexContainer id="kontakt" direction="column" align="center">
              <FlexBoxMobile>
                <h2 css={{ color: beige }}>Kontakt</h2>
                <p>
                  Rufen Sie einfach an unter
                </p>
                <a href="tel:+49761484745">
                  <h3 className="linkclass">  0761 484745
                  </h3>
                </a>

              </FlexBoxMobile>

              <FlexBoxMobile>
                <div css={{ width: "24em", height: "18em", display: "none" }}>
                  <Image image="studio08" />
                </div>
                <div css={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                  <div css={{ background: "transparent", color: dark, padding: "2em 2em" }}>
                    <h4 css={{ textAlign: "center" }}>Unsere <br />Öffnungszeiten</h4>
                    <p css={{ color: dark + " !important" }}>
                      Di.: 08:30 - 18:30
                    </p>
                    <p css={{ color: dark + " !important" }}>
                      Mi.: 08:00 - 18:00
                    </p>
                    <p css={{ color: dark + " !important" }}>
                      Do.: 08:30 - 20:00
                    </p>
                    <p css={{ color: dark + " !important" }}>
                      Fr.: 08:00 - 18:00
                    </p>
                  </div>
                  <div css={{ background: "transparent", color: dark, padding: "2em 2em" }}>
                    <h4 css={{ textAlign: "center" }}>Hier finden Sie uns</h4>
                    <p>
                      Bei Lisa Kraus GmbH
                    </p>
                    <p>
                      Andreas-Hofer-Str. 69b
                    </p>
                    <p>
                      79111 Freiburg im Breisgau
                    </p>

                  </div>
                  <div css={{ background: "transparent", color: dark, padding: "2em 2em" }}>
                    <h4 css={{ textAlign: "center" }}>Anfahrt</h4>
                    <div css={{ width: "300px", height: "300px", padding: "2em", background: beige }}>
                      <KontaktMap />
                    </div>
                  </div>
                </div>
              </FlexBoxMobile>
            </FlexContainer>
            <FlexContainer id="footer" direction="column" justify="center" align="center" css={mq({ padding: ["0 1em", "0 1em", "0 2em", "0 2em"] })}>
              <Footer />

            </FlexContainer>
          </motion.div>

        </Wrapper>
      } */}
    </Layout>
  );
};

export default IndexPage;
