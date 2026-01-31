import { createFileRoute } from '@tanstack/react-router'
import React, { useEffect, useState } from "react";
import { beige, dark, darkgrey, FlexContainer, light, Wrapper, FlexBoxMobile, FlexContainerMobile, mq, white, teamcontainer } from "@styles";
import { KontaktIcon, KontaktIconMobile, Preisliste, GoogleMap, SEO, TeamCard} from "@components";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { loadStaticDataAsync, type BuildTimeData } from "@/lib/static-data";
import { HomeHeader, StudioContent, HomePresentation, HomeTeam, HomePrices } from './components';
import { Header } from '../Header';
import { contactButton, FooterSection, ImageWrapper, ScrollWrapper } from './styles';
import { FlexBox } from '@ui';
import { Footer } from '../Footer';


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

  const scrollFast = useTransform(scrollY, value => -0.9 * value);

  const scrollbar = useTransform(scrollYProgress, value => value * 100);

  let yFast = useSpring(scrollFast, { damping: 99, stiffness: 200 });


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
   
        <Wrapper id="mainwrapper" css={{ height: mainHeight + "px" }}>
          <Header top="start" siteState={siteState} position={scrollPositions} popupHandler={setPopupState} />
          <KontaktIcon />
          {/* <Preisliste /> */}

          <ScrollWrapper id="wrapper" style={{ y: yFast }}>
            <HomeHeader />
            <HomePresentation />
            <StudioContent />
            <HomeTeam />
            <HomePrices />
            <Footer />
          </ScrollWrapper>
        </Wrapper>
      
    
    </>
  );
}



export default HomePage;
