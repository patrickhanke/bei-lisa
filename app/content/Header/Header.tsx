import { Link } from "@tanstack/react-router";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Menu, X } from "lucide-react";
import { HeaderProps, ScrollPositions } from "./types";
import MenuElement from "./components/MenuElement";
import { menuElementContainer, StyledHeader, MobileMenuButton, MobileMenuOverlay, MobileMenuContent, MobileMenuItem } from "./styles";
import mainMenu from "./constants/main_menu";

const Header: React.FC<HeaderProps> = ({ siteState, position, top, popupHandler }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 980px)' });

  function scrollHandlerAngebot(e: keyof ScrollPositions): void {
    if (position && position[e] !== undefined) {
      window.scrollTo(0, position[e]! + 50);
    }
    setIsMobileMenuOpen(false);
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <StyledHeader>
        <div css={{ display: "flex", flexDirection: "row", alignItems: "stretch", justifyContent: "space-between", width: "100%" }}>
          <Link to="/" css={{ width: "160px", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.5em 0" }}>
              <img 
                src="/images/bei_lisa_font.png" 
                alt="Haarstudio Marita"
                style={{ width: "120px", height: "auto" }}
              />
          </Link>
          
          {isTabletOrMobile ? (
            <MobileMenuButton onClick={toggleMobileMenu}>
              <Menu size={28} />
            </MobileMenuButton>
          ) : (
            top === "start" && (
              <div css={menuElementContainer}>
                {mainMenu.map((item) => (
                  <MenuElement key={item.state} title={item.title} state={item.state} onClick={() => scrollHandlerAngebot(item.state as keyof ScrollPositions)} />
                ))}
              </div>
            )
          )}
        </div>
      </StyledHeader>

      {/* Mobile Fullscreen Menu */}
      {isTabletOrMobile && (
        <MobileMenuOverlay isOpen={isMobileMenuOpen}>
          <div css={{ position: "absolute", top: "1.5em", right: "1.5em" }}>
            <MobileMenuButton onClick={toggleMobileMenu}>
              <X size={32} />
            </MobileMenuButton>
          </div>
          
          <MobileMenuContent>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
              <MobileMenuItem>
                <h2>Home</h2>
              </MobileMenuItem>
            </Link>

            {top === "start" && mainMenu.map((item) => (
              <MobileMenuItem key={item.state} onClick={() => scrollHandlerAngebot(item.state as keyof ScrollPositions)}>
                <h2>{item.title}</h2>
              </MobileMenuItem>
            ))}

            <Link to="/impressum" onClick={() => setIsMobileMenuOpen(false)}>
              <MobileMenuItem>
                <h2>Impressum</h2>
              </MobileMenuItem>
            </Link>

            <Link to="/datenschutz" onClick={() => setIsMobileMenuOpen(false)}>
              <MobileMenuItem>
                <h2>Datenschutz</h2>
              </MobileMenuItem>
            </Link>
          </MobileMenuContent>
        </MobileMenuOverlay>
      )}
    </>
  );
};

export default Header;
