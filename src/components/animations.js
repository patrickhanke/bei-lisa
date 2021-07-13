import React, { useEffect } from 'react'
import { motion, useAnimation, useMotionValue, useSpring, useTransform, useViewportScroll } from "framer-motion"
import { useLayoutHook } from './functions'
import { useInView } from 'react-intersection-observer'

export const pageTransition ={
    initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
        transition:{
            ease: "easeIn",
            duration: 0.7,
            delay: 0.2
          }

      },
      exit: {
        opacity: 0,
        transition:{
            ease: "easeOut",
            duration: 0.7,
            delay: 0.2
          }
      }
    }

export const useLayoutAnimation = () => {
    const {scrollheight} = useLayoutHook()

    const {scrollY} = useViewportScroll() 
    const y1 = useMotionValue(0)
    const y2 = useMotionValue(0)
    y1.set(scrollheight)
    
    const scrollTransformY1 = useTransform(y1 , value => -1*value  )
    const scrollTransformY2 = useTransform(scrollY , value => -1*  value  )
    let scrollY1 = useSpring(scrollTransformY1, { damping: 99, stiffness: 200 })
    let scrollY2 = useSpring(scrollTransformY2, { damping: 99, stiffness: 200 })
    return {scrollY1: scrollTransformY1, scrollY: scrollY}
}

export const ParalaxContainer = ({constraintBottom, constraintTop, children}) => {
    const {scrollYProgress} = useViewportScroll() 
    const yRange = [-constraintTop, constraintBottom]
    const scrollRange = [0, 1]
    const plRange = useTransform(scrollYProgress, scrollRange, yRange)
    const paralax = useSpring(plRange, {damping: 3, stiffness: 10 })
    return (
      <motion.div style={{y: paralax}} >
          {children}
      </motion.div>
    )
}
export const ParalaxContainerAbsolute = ({constraintBottom, constraintTop, children}) => {
    const {scrollYProgress} = useViewportScroll() 
    const yRange = [-constraintTop, constraintBottom]
    const scrollRange = [0, 1]
    const plRange = useTransform(scrollYProgress, scrollRange, yRange)
    const paralax = useSpring(plRange, {damping: 3, stiffness: 10 })
    return (
      <motion.div style={{y: paralax}} css={{width: "100%", height: "100%", position: "absolute"}}  >
          {children}
      </motion.div>
    )
}



ParalaxContainer.propTypes = {
    constraintBottom: Number,
    constraintTop: Number
  }

  export const ScrollRevealContainer = ({children, id}) => {
    const controls = useAnimation();
    const [ref, inView] = useInView();
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);
  
    return (
      <motion.div 
        ref={ref}
        animate={controls}
        initial="hidden"
        transition={{ duration: 0.3, delay: 1 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 100 }
        }}
      >
        {children}
    </motion.div>
    )
  }