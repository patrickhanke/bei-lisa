import { dark, darkgrey, mq, white } from "@/components/styles";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

export const StyledHeader = styled(motion.header as any)({
    position: "fixed",
    width: "100vw",
    zIndex: 12,
    padding: "0 1em",
    background: "transparent",
    borderBottom: "0.6px solid " + darkgrey,
    height: "80px",
    color: dark,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
  });
  
  export const headerLinkElement = mq({
    position: "relative",
    width: "9em",
    borderLeft: "0.6px solid " + darkgrey,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ":hover": {
      background: darkgrey,
    color: white
    }
  })

  export const menuElementContainer = mq({
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    width: "auto",
  })