import { navigate } from 'gatsby'
import React from 'react'
import { beige, dark, mq, white } from './styles'

const Footer = () => {
    const navigationHandler = (e) => {
  
        
        const timer = setTimeout(() => {
            window.scrollTo(0, 0) 
        
                return navigate(e)
            }, 20);
          
          return () => clearTimeout(timer);
        
    }
    return (
        <footer css={{
          display: "flex", 
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          background: dark,
          width: "100%",
          fontSize: "16px"

        }}>
           <div css={mq({width: "100%", display: "flex", padding: "1em 1em 2em 1em", flexDirection:  ["column", "column", "row", "row"], alignItems: ["flex-start","flex-start","flex-end", "flex-end"], justifyContent: "space-evenly", color: white, borderBottom: "1px solid " +beige})} >
                <div>
                    <h5 css={{marginTop: "2em"}}>Kontakt</h5>
                    <p>
                        Haarstudio Marita Kraus GmbH 
                    </p>
                    <p>
                        Andreas-Hofer-Str. 69b
                    </p> 
                    <p> 
                        79111 Freiburg im Breisgau
                    </p>
                </div>
                <div>
                    <h5 css={{marginTop: "2em"}}>Inhalte</h5>
                    <p onClick={() => navigationHandler("/")} css={{textDecoration: "underline", cursor: "pointer", [":hover"]: {color: beige}}}>
                    Start
                    </p>
                    <p onClick={() => navigationHandler("/impressum/")} css={{textDecoration: "underline", cursor: "pointer", [":hover"]: {color: beige}}}>
                    Impressum
                    </p>
                    <p onClick={() => navigationHandler("/datenschutz/")} css={{textDecoration: "underline", cursor: "pointer", [":hover"]: {color: beige}}}>
                        Datenschutz
                    </p>
                </div>
           </div>
            <div css={{background: dark, color: white, padding: "0.5em 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <p>Haarstudio Marita Kraus GmbH</p>
                <p css={{color: white, marginLeft: "0.4em"}}> © {new Date().getFullYear()} </p>
            </div> 
        </footer>
    )
}

export default Footer