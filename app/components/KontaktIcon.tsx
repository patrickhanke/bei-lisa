import { AnimatePresence, motion, Variant, Variants } from 'framer-motion';
import React, { useState } from 'react';
import { beige, dark, darkgrey, white } from './styles';
import { MdLocalPhone } from 'react-icons/md';
import { VscClose } from 'react-icons/vsc';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const popup: Variants = {
    initial: { opacity: 0, width: 0, height: 0, scaleX: 0, scaleY: 0 },
    animate: { opacity: 1, width: 250, height: 500, scaleX: 1, scaleY: -1, transition: { scaleY: { delay: 0.2, duration: 0.3 }, scaleX: { delay: 0, duration: 0.15 } } },
    exit: { opacity: 0, width: 0, height: 0, scaleX: 0, scaleY: 0, transition: { scaleY: { delay: 0, duration: 0.3 }, scaleX: { delay: 0.2, duration: 0.15 } } },
};

const menuList: Variants = {
    initial: { scaleY: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    animate: { scaleY: -1, transition: { staggerChildren: 0.07, delayChildren: 0.2, delay: 0.1 } },
    exit: { scaleY: 0, transition: { staggerChildren: 0.07, delayChildren: 0.2, staggerDirection: -1 } },
};

const KontaktContainer = styled(motion.div as any)({
    position: "fixed",
    bottom: "24px",
    left: "24px",
    zIndex: 12
});

const KontaktButton = styled(motion.div as any)({
    padding: "24px",
    zIndex: 13,
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 0 12px 6px rgba(0,0,0,0.1)"
});

const PopupContainer = styled(motion.div as any)({
    backgroundColor: beige,
    position: "absolute",
    boxShadow: "0 0 12px 6px rgba(0,0,0,0.1)"
});

const PopupContent = styled(motion.div as any)({
    position: "relative",
    height: "100%",
    padding: "2em",
    fontSize: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
});

export const KontaktIcon: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <KontaktContainer
            initial={false}
            animate={open ? "open" : "closed"}
            custom={500}
        >
            <AnimatePresence mode='wait'>
                {open === true &&
                    <PopupContainer
                        variants={popup}
                        style={{ originX: 0, originY: 0, x: 0, y: -20 }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div css={css`display: block;position: absolute;left: 27px; top: -10px; border-bottom: 10px solid ${beige};border-left: 10px dashed transparent;border-right: 10px dashed transparent; background: transparent;`}></div>
                        <PopupContent variants={menuList}>
                            <div onClick={() => setOpen(!open)} css={{ padding: "0.5em", fontSize: "1em", lineHeight: "0em", borderRadius: "50%", background: beige, color: dark, border: "1px solid " + dark, cursor: "pointer", [":hover"]: { color: beige, background: dark } }}>
                                <VscClose />
                            </div>
                            <a href="tel:+49761484745" css={{ lineHeight: "1em", color: dark, textDecoration: "none", marginTop: "1em", [":hover"]: { textDecoration: "underline" } }}>
                                <p css={{ marginBottom: 0, fontSize: "1.2em", lineHeight: "1.2em" }}> 0761 484745</p>
                            </a>
                            <div css={{ width: "100%", height: "1.5px", background: darkgrey, margin: "6px auto 12px auto" }} />
                            <h5>Öffnungszeiten</h5>
                            <p css={{ color: dark + " !important" }}>
                                Di.: 08:30 - 18:30
                            </p>
                            <p css={{ color: dark + " !important" }}>
                                Mi.: 08:00 - 18:00
                            </p>
                            <p css={{ color: dark + " !important" }}>
                                Do.: 08:30 - 20:00
                            </p>
                            <p css={{ color: dark + " !important" }}>
                                Fr.: 08:00 - 18:00
                            </p>
                        </PopupContent>
                    </PopupContainer>}
            </AnimatePresence>

            <KontaktButton onClick={() => setOpen(!open)} animate={open ? { backgroundColor: dark, color: beige } : { backgroundColor: beige, color: dark }}>
                <h4 css={{ marginBottom: 0, lineHeight: 0, marginTop: 0, marginBlockEnd: 0, fontSize: "24px" }}>
                    <MdLocalPhone />
                </h4>
            </KontaktButton>
        </KontaktContainer>
    );
};

const KontaktContainerMobile = styled(motion.div as any)({
    position: "fixed",
    bottom: "30px",
    left: "30px",
    zIndex: 12
});

const KontaktButtonMobile = styled(motion.div as any)({
    padding: "18px",
    zIndex: 13,
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 0 12px 6px rgba(0,0,0,0.1)"
});

const PopupContainerMobile = styled(motion.div as any)({
    backgroundColor: beige,
    position: "absolute",
    boxShadow: "0 0 12px 6px rgba(0,0,0,0.1)",
    fontSize: "14px"
});

const PopupContentMobile = styled(motion.div as any)({
    position: "relative",
    height: "100%",
    padding: "2em",
    fontSize: "13px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
});

export const KontaktIconMobile: React.FC = () => {
    const [open, setOpen] = useState(false);
    return (
        <KontaktContainerMobile
            initial={false}
            animate={open ? "open" : "closed"}
            custom={500}
        >
            <AnimatePresence mode='wait'>
                {open === true &&
                    <PopupContainerMobile
                        variants={popup}
                        style={{ originX: 0, originY: 0, x: -10, y: -20 }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div css={css`display: block;position: absolute;left: 27px; top: -10px; border-bottom: 10px solid ${beige};border-left: 10px dashed transparent;border-right: 10px dashed transparent; background: transparent;`}></div>
                        <PopupContentMobile variants={menuList}>
                            <div onClick={() => setOpen(!open)} css={{ padding: "0.5em", fontSize: "1em", lineHeight: "0em", borderRadius: "50%", background: beige, color: dark, border: "1px solid " + dark, cursor: "pointer", [":hover"]: { color: beige, background: dark } }}>
                                <VscClose />
                            </div>
                            <a href="tel:+49761484745" css={{ lineHeight: "1em", color: dark, textDecoration: "none", marginTop: "1em", [":hover"]: { textDecoration: "underline" } }}>
                                <p css={{ marginBottom: 0, fontSize: "1.2em", lineHeight: "1.2em" }}> 0761 484745</p>
                            </a>
                            <div css={{ width: "100%", height: "1.5px", background: darkgrey, margin: "6px auto 12px auto" }} />
                            <h5>Öffnungszeiten</h5>
                            <p css={{ color: dark + " !important" }}>
                                Di.: 08:30 - 18:30
                            </p>
                            <p css={{ color: dark + " !important" }}>
                                Mi.: 08:00 - 18:00
                            </p>
                            <p css={{ color: dark + " !important" }}>
                                Do.: 08:30 - 20:00
                            </p>
                            <p css={{ color: dark + " !important" }}>
                                Fr.: 08:00 - 18:00
                            </p>
                        </PopupContentMobile>
                    </PopupContainerMobile>}
            </AnimatePresence>

            <KontaktButtonMobile onClick={() => setOpen(!open)} animate={open ? { backgroundColor: dark, color: beige } : { backgroundColor: beige, color: dark }}>
                <h4 css={{ marginBottom: 0, lineHeight: 0, marginTop: 0, marginBlockEnd: 0, fontSize: "18px" }}>
                    <MdLocalPhone />
                </h4>
            </KontaktButtonMobile>
        </KontaktContainerMobile>
    );
};
