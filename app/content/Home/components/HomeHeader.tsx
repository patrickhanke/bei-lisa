import React from 'react'
import { headerContainer } from '../styles'

const HomeHeader: React.FC = () => {
    return (
        <div id="header" css={headerContainer}>
            <img 
                src="/images/bei_lisa_header.png" 
                alt="Bei Lisa Team"
                loading="lazy"
                style={{ width: "100%", height: "100%", maxWidth: "680px", objectFit: "contain" }}
            />
        </div>
    )
}

export default HomeHeader