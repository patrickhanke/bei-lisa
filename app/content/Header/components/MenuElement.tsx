import React from 'react'
import { headerLinkElement } from '../styles'

const MenuElement = ({title, state, onClick}: {title: string, state: string, onClick: () => void}) => {
  return (
    <div css={headerLinkElement}>
      <div onClick={onClick} css={{ position: "relative", width: "auto" }}>
        <h6 className={state === "active" ? "active" : "not-active"} css={{ cursor: "pointer" }}>
          {title}
        </h6>
      </div>
    </div>
  )
}

export default MenuElement