import { darkgrey, light, mq, white } from "@/components/styles";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const headerContainer = mq({ width: `100vw`, height: [`auto`, `auto`, `50vh`, `80vh`], top: 0, left: 0, zIndex: 2, overflow: "hidden", margin: "auto", position: "relative", display: "flex", justifyContent: "center", alignItems: "center" });

export const ScrollWrapper = styled(motion.div as any)({
    position: "fixed",
    height: "auto",
    left: "auto",
    right: "auto",
    zIndex: 5,
    background: white,
    width: "100%",
    paddingTop: "80px"
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

  export const contactButton = mq({
    padding: "24px 36px",
    border: `1px solid ${darkgrey}`,   
    borderRadius: "48px",
    marginTop: "24px",
    "h3": {
        margin: "0 !important",
        fontWeight: 600
    },
   
  })

  export const studioImage = mq({
    borderRadius: "12px",
    // marginBottom: "24px"
  })
  