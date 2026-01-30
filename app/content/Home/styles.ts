import { light, mq } from "@/components/styles";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const headerContainer = mq({ width: `100vw`, height: [`auto`, `auto`, `50vh`, `80vh`], top: 0, left: 0, zIndex: 2, overflow: "hidden", margin: "auto", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" });

export const ScrollWrapper = styled(motion.div as any)({
    position: "fixed",
    height: "auto",
    left: "auto",
    right: "auto",
    zIndex: 5,
    background: light,
    width: "100%"
  });
  
  export const ImageWrapper = styled(motion.div as any)({
    width: "40%",
    height: "30em",
    marginTop: "-4em"
  });
    
  export const FooterSection = styled(motion.div as any)({
    position: "relative",
    height: "auto",
    left: "auto",
    right: "auto",
    zIndex: 5,
    background: light,
    width: "100%",
    h2: {
      marginTop: "2em"
    }
  });
  