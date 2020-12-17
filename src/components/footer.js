import { Link, navigate } from 'gatsby'
import React from 'react'
import { beige, dark, darkgrey, FlexContainer, light, white } from './styles'

const Footer = () => {
    const navigationHandler = (e) => {

        window.scrollTo(0, 0);
        navigate( e)
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
           
                
           <div css={{maxWidth: "1440px", width: "100%", display: "flex", padding: "4em 1em 2em 1em", flexDirection: "row", alignItems: "flex-end", justifyContent: "space-evenly", color: white, borderBottom: "1px solid " +beige}} >
                <p>
                    Haarstudio Marita Kraus GmbH <br />
                    Andreas-Hofer-Str. 69b <br />
                    79111 Freiburg im Breisgau
                </p>
                <h6 onClick={() => navigationHandler("/impressum/")}>
                    Impressum
                </h6>
                <h6 onClick={() => navigationHandler("/datenschutz/")}>
                    Datenschutz
                </h6>
                
           </div>

        <div css={{background: dark, color: white, padding: "0.5em 0", width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <p>Haarstudio Marita Kraus GmbH</p>
              <p css={{color: white, marginLeft: "0.4em"}}> © {new Date().getFullYear()} </p>
        </div> 
        </footer>
    )
}

export default Footer