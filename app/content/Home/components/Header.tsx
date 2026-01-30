import React from 'react'
import { headerContainer } from '../styles'

const Header: React.FC = () => {
    return (
        <div id="header" css={headerContainer}>
            <img 
                src="/src/images/hs_header.jpg" 
                alt="Bei Lisa Team"
                style={{ width: "100%", height: "100%", maxWidth: "680px", objectFit: "cover" }}
            />
        </div>
    )
}

export default Header