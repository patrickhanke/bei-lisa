import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import React from "react";
import { beige, dark, darkgrey, mq, white } from "./styles";
import { IoLogoFacebook, IoLogoInstagram } from 'react-icons/io';
import styled from '@emotion/styled';

interface ScrollPositions {
  start?: number;
  angebot?: number;
  salon?: number;
  team?: number;
  kontakt?: number;
}

interface HeaderProps {
  siteState?: string;
  position?: ScrollPositions;
  top?: string;
  popupHandler?: (state: boolean) => void;
}

const StyledHeader = styled(motion.header as any)({
  position: "fixed",
  width: "100vw",
  zIndex: 12,
  padding: "0 1em",
  background: "transparent",
  borderBottom: "0.6px solid " + darkgrey,
  height: "80px",
  color: dark
});

const headerLinkElement = mq({
  position: "relative",
  width: "6em",
  borderLeft: "0.6px solid " + darkgrey,
  height: "100%",
  ":hover": {
    background: darkgrey,
  color: white
  }
})

const Header: React.FC<HeaderProps> = ({ siteState, position, top, popupHandler }) => {
  function scrollHandlerAngebot(e: keyof ScrollPositions): void {
    if (position && position[e] !== undefined) {
      window.scrollTo(0, position[e]! + 50);
    }
  }

  return (
    <StyledHeader>
      <div css={{ display: "flex", flexDirection: "row", alignItems: "stretch", justifyContent: "space-between", width: "100%" }}>
        <Link to="/">
          <div css={{ width: "160px", padding: "0.5em 0" }}>
            <img 
              src="/images/bei_lisa_font.png" 
              alt="Haarstudio Marita"
              style={{ width: "80px", height: "auto" }}
            />
          </div>
        </Link>
        {top === "start" ?
          <div css={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: "2em", height: "100%", zIndex: 13, padding: 0, position: "relative" }}>

            <div css={headerLinkElement}>
              <div onClick={() => scrollHandlerAngebot("angebot")} css={{ position: "relative", height: "100%", width: "100%" }}>
                <h6 className={siteState === "angebot" ? "active" : "not-active"} css={{ position: "absolute", cursor: "pointer" }}>
                  Angebot
                </h6>
              </div>
            </div>
            <div css={headerLinkElement}>
              <div onClick={() => scrollHandlerAngebot("salon")} css={{ position: "relative", height: "100%", width: "100%" }}>
                <h6 className={siteState === "salon" ? "active" : "not-active"} css={{ position: "absolute", cursor: "pointer" }}>
                  Unser Salon
                </h6>
              </div>
            </div>
            <div css={headerLinkElement}>
              <div onClick={() => scrollHandlerAngebot("team")} css={{ position: "relative", height: "100%", width: "100%" }}>
                <h6 className={siteState === "team" ? "active" : "not-active"} css={{ position: "absolute", cursor: "pointer" }}>
                  Das Team
                </h6>
              </div>
            </div>
            <div css={headerLinkElement}>
              <div onClick={() => scrollHandlerAngebot("kontakt")} css={{ position: "relative", height: "100%", width: "100%" }}>
                <h6 className={siteState === "kontakt" ? "active" : "not-active"} css={{ position: "absolute", cursor: "pointer" }}>
                  Kontakt
                </h6>
              </div>
            </div>
          </div> : null
        }
        {/* <div css={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "auto", paddingRight: "1em" }}>
          <div css={{ padding: "0.5em", borderRadius: "50%", transition: "background 0.2s ease-in", [":hover"]: { background: beige, color: dark } }}>
            <h6 css={{ marginBottom: 0, fontSize: "1.4em", cursor: "pointer" }}>
              <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/haarstudio_marita/"><IoLogoInstagram /></a>
            </h6>
          </div>
          <div css={{ padding: "0.5em", borderRadius: "50%", transition: "background 0.2s ease-in", [":hover"]: { background: beige, color: dark } }}>
            <h6 css={{ marginBottom: 0, fontSize: "1.4em", cursor: "pointer" }}>
              <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/haarstudiomarita"><IoLogoFacebook /></a>
            </h6>
          </div>
        </div> */}
      </div>

    </StyledHeader>
  );
};

export default Header;
