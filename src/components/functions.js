import React, { useState } from 'react'

export const useLayoutHook = () => {
    const [mainclientheight, setMainClientHeight] = useState(null)
    const [scrollheight, setScrollheight] = useState()
    const handleScroll = (e) => {
        // document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
        setScrollheight(window.scrollY )
        return 
      }
    
    React.useEffect(() => {
      window.addEventListener("scroll", handleScroll, false);
      // document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
      setMainClientHeight( document.getElementById('mainwrapper').clientHeight)
      return () => window.removeEventListener("scroll", handleScroll, false);
    },[scrollheight])

    console.log(scrollheight)
    console.log(mainclientheight)
    return {
      mainclientheight:  mainclientheight,
      scrollheight: scrollheight,
    }
}
    

