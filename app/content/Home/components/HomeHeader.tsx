import React from 'react'
import { designElement, headerContainer } from '../styles'

const HomeHeader: React.FC = () => {
    return (
        <div id="header" css={headerContainer}>
            <img 
                src="/images/bei_lisa_header.png" 
                alt="Bei Lisa Team"
                loading="lazy"
                style={{ width: "100%", height: "auto", maxWidth: "680px", objectFit: "contain", zIndex: 2 }}
            />
            <div css={designElement} />
        </div>
    )
}

export default HomeHeader