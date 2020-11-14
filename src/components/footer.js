import React from 'react'
import { beige, darkgrey, FlexContainer } from './styles'

const Footer = () => {

    return (
        
        <footer style={{
          marginTop: `2rem`
        }}>
            <FlexContainer css={{background: beige}}>
                <h5>Impressum</h5>
            © {new Date().getFullYear()},

            </FlexContainer>
         
        </footer>
    )
}

export default Footer