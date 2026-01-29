import React from 'react'
import { headerContainer } from '../styles'
import { StaticImage } from 'gatsby-plugin-image'

const HomeHeader = () => {
  return (
    <div css={headerContainer} id='header'>
        <div>
            <StaticImage
                  src="../images/bei_lisa_header.png"
                  alt="Bei Lisa Team"
                  objectFit="cover"
                  layout="constrained"
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                />
        </div>

    </div>
  )
}

export default HomeHeader