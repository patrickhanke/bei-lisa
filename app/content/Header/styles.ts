import { dark, darkgrey, mq, white, light } from "@/components/styles";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

export const StyledHeader = styled(motion.header as any)({
    position: "fixed",
    width: "100vw",
    zIndex: 12,
    padding: "0 1em",
    background: "transparent",
    borderBottom: "0.6px solid rgba(0, 0, 0, 0.2)",
    height: "72px",
    color: dark,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    flexWrap: "wrap",
  });
  
  export const headerLinkElement = mq({
    position: "relative",
    width: "9em",
    borderLeft: "0.6px solid rgba(0, 0, 0, 0.2)" ,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // ":hover": {
    //   background: darkgrey,
    // color: white
    // }
  })

  export const menuElementContainer = mq({
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "auto",
  })

  export const MobileMenuButton = styled.button({
    background: "transparent",
    border: "none",
    color: dark,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5em",
    zIndex: 15,
    ":hover": {
      opacity: 0.7,
    }
  });

  interface MobileMenuOverlayProps {
    isOpen: boolean;
  }

  export const MobileMenuOverlay = styled.div<MobileMenuOverlayProps>(props => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: light,
    zIndex: 13,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transform: props.isOpen ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    overflow: "hidden",
  }));

  export const MobileMenuContent = styled.div({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2em",
    width: "100%",
    padding: "2em",
    "a": {
      textDecoration: "none",
      color: dark,
      width: "100%",
    }
  });

  export const MobileMenuItem = styled.div({
    cursor: "pointer",
    textAlign: "center",
    padding: "1em 2em",
    borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
    width: "100%",
    transition: "all 0.2s ease",
    "h2": {
      fontSize: "2em",
      fontWeight: 500,
      margin: 0,
      color: dark,
    },
    ":hover": {
      background: "rgba(0, 0, 0, 0.05)",
      transform: "translateX(10px)",
    }
  });