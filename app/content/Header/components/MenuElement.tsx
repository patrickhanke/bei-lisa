import React from 'react'
import { ChevronRight } from 'lucide-react'
import { headerLinkElement } from '../styles'

const MenuElement = ({title, state, onClick}: {title: string, state: string, onClick: () => void}) => {
  return (
    <div css={headerLinkElement}>
      <div onClick={onClick} css={{ position: "relative", width: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <h6 className={state === "active" ? "active" : "not-active"} css={{ cursor: "pointer", letterSpacing: "-1.5px", fontWeight: 600 }}>
          {title}
        </h6>
        {/* <ChevronRight size={16} /> */}
      </div>
    </div>
  )
}

export default MenuElement