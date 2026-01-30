import { Link } from "@tanstack/react-router";
import React from "react";
import { HeaderProps, ScrollPositions } from "./types";
import MenuElement from "./components/MenuElement";
import { menuElementContainer, StyledHeader } from "./styles";
import mainMenu from "./constants/main_menu";

const Header: React.FC<HeaderProps> = ({ siteState, position, top, popupHandler }) => {
  function scrollHandlerAngebot(e: keyof ScrollPositions): void {
    if (position && position[e] !== undefined) {
      window.scrollTo(0, position[e]! + 50);
    }
  }

  return (
    <StyledHeader>
      <div css={{ display: "flex", flexDirection: "row", alignItems: "stretch", justifyContent: "space-between", width: "100%" }}>
        <Link to="/" css={{ width: "160px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5em 0" }}>
            <img 
              src="/src/images/bei_lisa_font.png" 
              alt="Haarstudio Marita"
              style={{ width: "120px", height: "auto" }}
            />
        </Link>
        {top === "start" ?
           <div css={menuElementContainer}>
            {mainMenu.map((item) => (
              <MenuElement key={item.state} title={item.title} state={item.state} onClick={() => scrollHandlerAngebot(item.state as keyof ScrollPositions)} />
            ))}
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
