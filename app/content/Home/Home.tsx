import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect, useState } from "react";
import { beige, dark, darkgrey, FlexContainer, light, Wrapper, FlexBoxMobile, FlexContainerMobile, mq, white, teamcontainer } from "@styles";
import {Footer, KontaktIcon, KontaktIconMobile, Preisliste, GoogleMap, SEO, TeamCard} from "@components";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { loadStaticDataAsync, type BuildTimeData } from "@/lib/static-data";
import styled from '@emotion/styled';
import { HomeHeader, StudioContent, HomePresentation, HomeTeam, HomePrices } from './components';
import { Header } from '../Header';
import { FooterSection, ImageWrapper, ScrollWrapper } from './styles';
import { FlexBox } from '@ui';


interface Position {
  x: number;
  y: number;
}

interface ScrollPositions {
  start: number;
  angebot: number;
  salon: number;
  team: number;
  kontakt: number;
}

const HomePage: React.FC = () => {
  const [mainHeight, setmainHeight] = useState<number>();
  const [siteState, setSiteState] = useState<string>();
  const [scrollheight, setScrollheight] = useState<number>();
  const [scrollPositions, setScrollPositions] = useState<ScrollPositions>();
  const { scrollY, scrollYProgress } = useScroll();
  const [popupState, setPopupState] = useState(false);
  const [staticData, setStaticData] = useState<BuildTimeData | null>(null);

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
    
    let mainclientheight = 0;
    let headerscrollheight = 0;
    
    if (wrapperElement) {
      mainclientheight = wrapperElement.offsetHeight;
    }
    if (headerScrollElement) {
      headerscrollheight = headerScrollElement.offsetHeight;
    }
    
    setScrollheight(window.innerHeight / 99);
    setmainHeight((mainclientheight + headerscrollheight) * 1.1);

    function getPositions(element: HTMLElement | null): Position | null {
      if (!element) return null;
      let xPosition = 0;
      let yPosition = 0;
      let currentElement: HTMLElement | null = element;

      while (currentElement) {
        xPosition += (currentElement.offsetLeft - currentElement.scrollLeft + currentElement.clientLeft);
        yPosition += (currentElement.offsetTop - currentElement.scrollTop + currentElement.clientTop);
        currentElement = currentElement.offsetParent as HTMLElement | null;
      }

      return { x: xPosition, y: yPosition };
    }

    const section0 = getPositions(headerElement);
    const section1 = getPositions(angebotElement);
    const section2 = getPositions(salonElement);
    const section3 = getPositions(teamElement);
    const section4 = getPositions(kontaktElement);

    if (section1 && section2 && section3 && section4) {
      setScrollPositions({
        start: 0,
        angebot: section1.y * 1.1,
        salon: section2.y * 1.1,
        team: section3.y * 1.1,
        kontakt: section4.y * 1.1
      });
    }

    if (section2 && section3 && section4) {
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
    
    let mainclientheight = 0;
    let headerscrollheight = 0;
    
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
        console.log('[HomePage] Static data loaded:', data);
      } catch (error) {
        console.error('[HomePage] Failed to load static data:', error);
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
    <>
      <SEO title="Bei Lisa" />
      {isDesktopOrLaptop &&
        <Wrapper id="mainwrapper" css={{ height: mainHeight + "px" }}>
          <Header top="start" siteState={siteState} position={scrollPositions} popupHandler={setPopupState} />
          <KontaktIcon />
          <Preisliste />

          <ScrollWrapper id="wrapper" style={{ y: yFast }}>
            <HomeHeader />
            <HomePresentation />

            <StudioContent />

            <HomeTeam />

            <HomePrices />

            <FlexContainer id="kontakt" direction="column" align="center" css={{ paddingTop: 0 }}>
              <h2 css={{ color: beige }}>Kontakt</h2>
              <p>Rufen Sie einfach an unter</p>
              <a href="tel:+49761484745">
                <h3 className="linkclass">0761 484745</h3>
              </a>

              <FlexBox direction="row" justify="space-between" align="flex-start" styles={{ width: "100%" }}>
                <div css={{ background: "transparent", color: dark, padding: "2em 2em" }}>
                  <h4 css={{ textAlign: "left" }}>Unsere <br />Öffnungszeiten</h4>
                  <p css={{ color: dark + " !important" }}>Di.: 08:30 - 18:30</p>
                  <p css={{ color: dark + " !important" }}>Mi.: 08:00 - 18:00</p>
                  <p css={{ color: dark + " !important" }}>Do.: 08:30 - 20:00</p>
                  <p css={{ color: dark + " !important" }}>Fr.: 08:00 - 18:00</p>
                </div>
                <div css={{ background: "transparent", color: dark, padding: "2em 2em" }}>
                  <h4 css={{ textAlign: "left" }}>Hier finden Sie uns</h4>
                  <p>Bei Lisa Kraus GmbH</p>
                  <p>Andreas-Hofer-Str. 69b</p>
                  <p>79111 Freiburg im Breisgau</p>
                </div>
                <div css={{ background: "transparent", color: dark, padding: "2em 2em" }}>
                  <h4 css={{ textAlign: "left" }}>Anfahrt</h4>
                  <div css={{ width: "400px", height: "400px", padding: "2em", background: beige }}>
                    <GoogleMap />
                  </div>
                </div>
              </FlexBox>
            </FlexContainer>
            
            <FlexContainer id="footer" direction="column" justify="center" align="center" css={{ padding: "0 2em" }}>
              <Footer />
            </FlexContainer>
          </ScrollWrapper>
        </Wrapper>
      }
      {isTabletOrMobile &&
        <Wrapper id="mainwrapper" css={{ scrollBehavior: "smooth" }}>
          {/* Mobile version - simplified */}
          <div id="header" css={mq({ width: `100vw`, height: [`auto`, `auto`, `50vh`, `80vh`], top: 0, left: 0, zIndex: 2, overflow: "hidden", margin: "auto", position: "relative" })}>
            <img 
              src="/src/images/hs_header.jpg" 
              alt="Bei Lisa Team"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
            <div css={{ width: "100%", height: "100%", position: "absolute", zIndex: 4, background: "rgba(0,0,0, 0.2)", top: 0 }}></div>
            <h1 css={{ position: "absolute", fontSize: "1.8rem", bottom: "0", left: "50%", width: "100%", textAlign: "center", transform: "translate(-50%, 0)", zIndex: 5 }}>
              Bei Lisa
            </h1>
          </div>

          <FooterSection>
            <FlexContainerMobile css={{ alignItems: "center", justifyContent: "center" }} id="angebot">
              <FlexBoxMobile css={{ flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <h2 css={{ textAlign: "center", color: beige }}>Wir bieten alles für Ihre Haare:</h2>
                <div css={{ color: darkgrey, position: "relative" }}>
                  <div css={{ zIndex: 13 }}>
                    <h4>Damenschnitt</h4>
                    <h4>Herrenschnitt</h4>
                    <h4>Färben & Tönen</h4>
                    <h4>Balayage & Foilyage</h4>
                    <h4>Extensions - Hairtalk</h4>
                    <h4>Wimpern & Augenbrauen färben</h4>
                    <h4>Make-Up & Hochzeitsfrisur</h4>
                  </div>
                </div>
              </FlexBoxMobile>
            </FlexContainerMobile>

            <FlexContainer id="kontakt" direction="column" align="center">
              <FlexBoxMobile>
                <h2 css={{ color: beige }}>Kontakt</h2>
                <p>Rufen Sie einfach an unter</p>
                <a href="tel:+49761484745">
                  <h3 className="linkclass">0761 484745</h3>
                </a>
              </FlexBoxMobile>
            </FlexContainer>
            
            <FlexContainer id="footer" direction="column" justify="center" align="center" css={mq({ padding: ["0 1em", "0 1em", "0 2em", "0 2em"] })}>
              <Footer />
            </FlexContainer>
          </FooterSection>
        </Wrapper>
      }
    </>
  );
}



export default HomePage;
