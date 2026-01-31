import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styled from '@emotion/styled';
import { dark, darkgrey } from '@/components/styles';

const ProgressBarContainer = styled(motion.div)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '1.2px',
  background: 'transparent',
  zIndex: 1,
});

const ProgressBarFill = styled(motion.div)({
  height: '100%',
  background: `linear-gradient(90deg, ${dark} 0%, ${darkgrey} 100%)`,
  transformOrigin: '0%',
});

const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <ProgressBarContainer>
      <ProgressBarFill style={{ scaleX }} />
    </ProgressBarContainer>
  );
};

export default ScrollProgressBar;
