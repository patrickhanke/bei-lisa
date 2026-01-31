import { beige, darkgrey, light, mq, white } from "@/components/styles";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const headerContainer = mq({ 
    width: `100vw`, 
    height: [`auto`, `auto`, `50vh`, `66vh`], 
    backgroundColor: white,
    top: 0, 
    left: 0, 
    zIndex: 2, 
    overflow: "hidden", 
    margin: "auto", 
    position: "relative", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center" ,
    // paddingBottom: "60px"
});

export const designElement = mq({
    backgroundColor: beige,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "0",
    left: 0,
    zIndex: 1,
    // transform: "translateY(-50%)"
})

export const ScrollWrapper = styled(motion.div as any)({
    position: "fixed",
    height: "auto",
    left: "auto",
    right: "auto",
    zIndex: 5,
    background: white,
    width: "100%",
    paddingTop: "80px",
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



  export const studioImage = mq({
    borderRadius: "6px",
    // marginBottom: "24px"
  })

  export const contactButton = mq({
    "h4": {
      textDecoration: "underline",
      fontWeight: 500
    },
   
  })
  