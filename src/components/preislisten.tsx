import { AnimatePresence, motion } from 'framer-motion';
import React, { useMemo, useState } from 'react';
import { beige, dark, mq } from './styles';
import { VscClose } from 'react-icons/vsc';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { gql, useQuery } from '@apollo/client';

interface Kategorie {
    id: string;
    ueberschrift: string;
    kategorie: string;
}

interface Preis {
    id: string;
    titel: string;
    reihenfolge: number;
    preis?: string;
    kategorie?: Kategorie;
    absatz?: boolean;
    information?: string;
}

interface PreislistenData {
    kategorien: Kategorie[];
    frisuren: Preis[];
    preiseFuT: Preis[];
    preisePuMU: Preis[];
}

const PREISLISTEN = gql`
query Frisuren {
  kategorien {
    id
    ueberschrift
    kategorie
  }
  frisuren {
    id
    titel
    reihenfolge
    preis
    kategorie {
      id
      ueberschrift
      kategorie
    }
    absatz
    information
  }
  preiseFuT {
    id
    titel
    reihenfolge
    preis
    kategorie {
      id
      ueberschrift
      kategorie
    }
    absatz
    information
  }
  preisePuMU {
    id
    titel
    reihenfolge
    preis
    kategorie {
      id
      ueberschrift
      kategorie
    }
    absatz
    information
  }
}
`;

interface SelectButtonProps {
    background?: string;
    color?: string;
}

const SelectButton = styled.button<SelectButtonProps>({
    fontSize: "16px",
    padding: "0.6em 1.2em",
    border: "1px solid " + dark,
    cursor: "pointer",
    [":hover"]: { color: beige, background: dark },
},
    props => ({ background: props.background }),
    props => ({ color: props.color })
);

const SelectButtonMobile = styled.button<SelectButtonProps>(mq({
    fontSize: ["12px", "14px", "14px", "14px"],
    padding: "0.3em 0.6em",
    border: "1px solid " + dark,
    cursor: "pointer",
    margin: ".2em 0",
    [":hover"]: { color: beige, background: dark },
}),
    props => ({ background: props.background }),
    props => ({ color: props.color })
);

const popup = {
    initial: { opacity: 0, width: 0, height: 0, scaleX: 0, scaleY: 0 },
    animate: { opacity: 1, width: 550, height: "70vh", scaleX: -1, scaleY: -1, transition: { scaleY: { delay: 0.2, duration: 0.3 }, scaleX: { delay: 0, duration: 0.15 } } },
    exit: { opacity: 0, width: 0, height: 0, scaleX: 0, scaleY: 0, transition: { scaleY: { delay: 0, duration: 0.3 }, scaleX: { delay: 0.2, duration: 0.15 } } },
};

const slidein = {
    initial: { opacity: 0, width: "100vw", y: "-100%", height: 700 },
    animate: { opacity: 1, width: "100vw", y: 0, height: 700, transition: { width: { delay: 0.2, duration: 0.3 }, height: { delay: 0, duration: 0.15 } } },
    exit: { opacity: 0, width: "100vw", y: "-100%", height: 700, transition: { width: { delay: 0, duration: 0.3 }, height: { delay: 0.2, duration: 0.15 } } },
};

const menuList = {
    initial: { scaleY: 0, scaleX: -1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    animate: { scaleY: -1, scaleX: -1, transition: { staggerChildren: 0.07, delayChildren: 0.2, delay: 0.1 } },
    exit: { scaleY: 0, scaleX: -1, transition: { staggerChildren: 0.07, delayChildren: 0.2, staggerDirection: -1 } },
};

interface KategorieObject {
    kategorie: string;
    ueberschriften: string[];
}

interface KategorieObjects {
    [key: string]: KategorieObject;
}

export const Preisliste: React.FC = () => {
    const { data } = useQuery<PreislistenData>(PREISLISTEN);
    const [open, setOpen] = useState(false);
    const [sliderState, setSliderState] = useState("Frisuren");

    const { kategorienArray, kategorieObjects, preisArray } = useMemo(() => {
        const kategorienArray: string[] = [];
        const kategorieObjects: KategorieObjects = {};
        const preisArray: Preis[] = [];

        if (data) {
            data.kategorien.map(kategorie => {
                if (kategorie.kategorie !== 'Pflege & Make-up') {
                    if (!kategorienArray.includes(kategorie.kategorie)) {
                        kategorienArray.push(kategorie.kategorie);
                        kategorieObjects[kategorie.kategorie] = {
                            kategorie: kategorie.kategorie,
                            ueberschriften: [kategorie.ueberschrift]
                        };
                    } else {
                        kategorieObjects[kategorie.kategorie].ueberschriften.push(kategorie.ueberschrift);
                    }
                }
            });
            data.frisuren.map(frisur => {
                preisArray.push(frisur);
            });
            data.preiseFuT.map(frisur => {
                preisArray.push(frisur);
            });
            data.preisePuMU.map(frisur => {
                preisArray.push(frisur);
            });
            preisArray.sort((a, b) => a.reihenfolge - b.reihenfolge);
        }

        return { kategorienArray, kategorieObjects, preisArray };
    }, [data]);

    return (
        <motion.div
            initial={false}
            animate={open ? "open" : "closed"}
            custom={500}
            css={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 12 }}
        >
            <AnimatePresence mode='wait'>
                {open === true &&
                    <motion.div
                        variants={popup}
                        style={{ originX: 0, originY: 0, x: 200, y: -20 }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        css={css`background-color: #EDD6C6; position: absolute; box-shadow: 0 0 12px 6px rgba(0,0,0,0.1)`}>
                        <div css={css`display: block;position: absolute;left: 27px; top: -10px; border-bottom: 10px solid ${beige};border-left: 10px dashed transparent;border-right: 10px dashed transparent; background: transparent;`}></div>
                        <motion.div variants={menuList} css={{ position: "relative", height: "100%", paddingBottom: "1em", fontSize: "16px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}>
                            <div css={{ width: "100%", display: "flex", padding: "1em", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                <h5> Preisliste</h5>
                                <div onClick={() => setOpen(!open)} css={{ padding: "0.5em", fontSize: "1em", lineHeight: "0em", borderRadius: "50%", background: beige, color: dark, border: "1px solid " + dark, cursor: "pointer", [":hover"]: { color: beige, background: dark } }}>
                                    <VscClose />
                                </div>
                            </div>
                            <div css={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", padding: "0 1em 1em 1em", borderBottom: "1px solid " + dark }}>
                                {kategorienArray.length > 0 && kategorienArray.map(kategorie => <SelectButton key={kategorie} background={sliderState === kategorie ? dark : "transparent"} color={sliderState === kategorie ? beige : dark} onClick={() => setSliderState(kategorie)}>{kategorie}</SelectButton>)}
                            </div>
                            <AnimatePresence mode='wait'>
                                {Object.keys(kategorieObjects).length > 0 && Object.keys(kategorieObjects).map(kategorieId => {
                                    return sliderState === kategorieObjects[kategorieId].kategorie &&
                                        <motion.div className="preiscontainer" key="frisuren" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} css={{ overflowY: "scroll", width: "100%", padding: "1em", ['p']: { lineHeight: '2.1em' } }}>
                                            {
                                                kategorieObjects[kategorieId].ueberschriften.map(ueberschrift => {
                                                    if (ueberschrift === 'Make-Up') {
                                                        return null;
                                                    }
                                                    return <React.Fragment key={ueberschrift}>
                                                        <h4 css={{ marginTop: "1em", marginBlockEnd: ".5em" }}>{ueberschrift}</h4>
                                                        {preisArray.map(preis => {
                                                            if (preis.kategorie?.ueberschrift === ueberschrift && preis.information) {
                                                                return (
                                                                    <div key={ueberschrift + preis.titel} css={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: preis.absatz ? "1em" : "0em" }}>
                                                                        <p css={{ color: dark + " !important", fontWeight: 600 }}>
                                                                            {preis.titel}
                                                                        </p>
                                                                    </div>
                                                                );
                                                            }
                                                            if (preis.kategorie?.ueberschrift === ueberschrift) {
                                                                return (
                                                                    <div key={ueberschrift + preis.titel} css={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: preis.absatz ? "1em" : "0em" }}>
                                                                        <p css={{ color: dark + " !important" }}>
                                                                            {preis.titel}
                                                                        </p>
                                                                        <p css={{ color: dark + " !important" }}>
                                                                            {preis.preis} €
                                                                        </p>
                                                                    </div>
                                                                );
                                                            }
                                                            return null;
                                                        })}
                                                    </React.Fragment>;
                                                })
                                            }
                                        </motion.div>;
                                })}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>}
            </AnimatePresence>

            <motion.div onClick={() => setOpen(!open)} animate={open ? { backgroundColor: dark, color: beige } : { backgroundColor: beige, color: dark }} css={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "24px", zIndex: 13, borderRadius: "10px", cursor: "pointer", boxShadow: "0 0 12px 6px rgba(0,0,0,0.1)" }}>
                <h4 css={{ marginBottom: 0, lineHeight: 0, marginTop: 0, marginBlockEnd: 0, fontSize: "16px" }}>
                    Leistungen & Preise
                </h4>
            </motion.div>
        </motion.div>
    );
};

interface PreislisteMobileProps {
    preislisteHandler: (e: "open" | "close") => void;
    plstate?: boolean;
}

export const PreislisteMobile: React.FC<PreislisteMobileProps> = ({ preislisteHandler }) => {
    const { data } = useQuery<PreislistenData>(PREISLISTEN);
    const [sliderState, setSliderState] = useState("Frisuren");

    const { kategorienArray, kategorieObjects, preisArray } = useMemo(() => {
        const kategorienArray: string[] = [];
        const kategorieObjects: KategorieObjects = {};
        const preisArray: Preis[] = [];

        if (data) {
            data.kategorien.map(kategorie => {
                if (kategorie.kategorie !== 'Pflege & Make-up') {
                    if (!kategorienArray.includes(kategorie.kategorie)) {
                        kategorienArray.push(kategorie.kategorie);
                        kategorieObjects[kategorie.kategorie] = {
                            kategorie: kategorie.kategorie,
                            ueberschriften: [kategorie.ueberschrift]
                        };
                    } else {
                        kategorieObjects[kategorie.kategorie].ueberschriften.push(kategorie.ueberschrift);
                    }
                }
            });
            data.frisuren.map(frisur => {
                preisArray.push(frisur);
            });
            data.preiseFuT.map(frisur => {
                preisArray.push(frisur);
            });
            data.preisePuMU.map(frisur => {
                preisArray.push(frisur);
            });
            preisArray.sort((a, b) => a.reihenfolge - b.reihenfolge);
        }

        return { kategorienArray, kategorieObjects, preisArray };
    }, [data]);

    return (
        <motion.div
            variants={slidein}
            style={{ x: 0 }}
            initial="initial"
            animate="animate"
            exit="exit"
            css={css`position: fixed; background-color: #EDD6C6; box-shadow: 0 0 12px 6px rgba(0,0,0,0.1); z-index: 7; max-height: 90vh; overflow: hidden; padding-bottom: 2em;`}>
            <div css={css`display: block;position: absolute;left: 27px; top: -10px; border-bottom: 10px solid ${beige};`}></div>
            <motion.div css={mq({ position: "relative", height: "100%", padding: ["0em 0em 3em 0em", "0em 0em 3em 0em", "0em 4em 3em 4em", "0em 4em 3em 4em"], fontSize: "14px", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start", marginTop: "60px" })}>
                <div css={{ width: "100%", display: "flex", padding: "1em", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <h5> Preisliste</h5>
                    <div onClick={() => preislisteHandler("close")} css={{ padding: "0.5em", fontSize: "1em", lineHeight: "0em", borderRadius: "50%", background: beige, color: dark, border: "1px solid " + dark, cursor: "pointer", [":hover"]: { color: beige, background: dark } }}>
                        <VscClose />
                    </div>
                </div>
                <div css={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", padding: "0 1em 1em 1em", borderBottom: "1px solid " + dark }}>
                    {kategorienArray.length > 0 && kategorienArray.map(kategorie => <SelectButtonMobile key={kategorie} background={sliderState === kategorie ? dark : "transparent"} color={sliderState === kategorie ? beige : dark} onClick={() => setSliderState(kategorie)}>{kategorie}</SelectButtonMobile>)}
                </div>
                <AnimatePresence mode='wait'>
                    {Object.keys(kategorieObjects).length > 0 && Object.keys(kategorieObjects).map(kategorieId => {
                        return sliderState === kategorieObjects[kategorieId].kategorie &&
                            <motion.div className="preiscontainer" key="frisuren" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} css={{ overflowY: "scroll", width: "100%", padding: "1em", ['p']: { lineHeight: '2.1em' } }}>
                                {
                                    kategorieObjects[kategorieId].ueberschriften.map(ueberschrift => {
                                        return <React.Fragment key={ueberschrift}>
                                            <h4 css={{ marginTop: "1em", marginBlockEnd: ".5em" }}>{ueberschrift}</h4>
                                            {preisArray.map(preis => {
                                                if (preis.kategorie?.ueberschrift === ueberschrift && preis.information) {
                                                    return (
                                                        <div key={ueberschrift + preis.titel} css={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: preis.absatz ? "1em" : "0em" }}>
                                                            <p css={{ color: dark + " !important", fontWeight: 600 }}>
                                                                {preis.titel}
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                if (preis.kategorie?.ueberschrift === ueberschrift) {
                                                    return (
                                                        <div key={ueberschrift + preis.titel} css={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: preis.absatz ? "1em" : "0em" }}>
                                                            <p css={{ color: dark + " !important" }}>
                                                                {preis.titel}
                                                            </p>
                                                            <p css={{ color: dark + " !important" }}>
                                                                {preis.preis} €
                                                            </p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </React.Fragment>;
                                    })
                                }
                            </motion.div>;
                    })}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};
