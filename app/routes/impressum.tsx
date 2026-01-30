import { createFileRoute } from '@tanstack/react-router'
import { motion, useSpring, useTransform, MotionValue, useScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { SEO } from '../components/SEO';
import { dark, FlexBox, FlexContainer, Wrapper, light } from '../components/styles';
import styled from '@emotion/styled';

export const Route = createFileRoute('/impressum')({
  component: ImpressumPage,
})

const ScrollBar = styled(motion.div as any)({
    position: "fixed",
    top: 0,
    right: 0,
    width: "10px",
    background: dark,
    zIndex: 12
});

const ContentWrapper = styled(motion.div as any)({
    position: "fixed",
    height: "auto",
    top: "100px",
    left: "auto",
    right: "auto",
    zIndex: 5,
    background: light,
    width: "100%"
});

function ImpressumPage() {
    const [mainHeight, setmainHeight] = useState<number | undefined>();
    const [scrollheight, setScrollheight] = useState<number | undefined>();
    const { scrollY, scrollYProgress } = useScroll();

    useEffect(() => {
        document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
        const wrapperElement = document.getElementById('wrapper');
        if (wrapperElement) {
            const mainclientheight = wrapperElement.clientHeight;
            setmainHeight((mainclientheight) * 1.1);
        }

        setScrollheight(window.outerHeight / 100);
    }, []);

    const scrollbar: MotionValue<number> = useTransform(scrollYProgress, (value: number) => value * 100);
    let scrollanimation = useSpring(scrollbar, { damping: 99, stiffness: 100 });

    const scrollFast: MotionValue<number> = useTransform(scrollY, (value: number) => -0.9 * value);

    let yFast = useSpring(scrollFast, { damping: 99, stiffness: 200 });
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1180px)' });
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1180px)'
    });

    return (
        <>
            <SEO title="Impressum" />
            <Header top="impressum" />
            {isDesktopOrLaptop &&

                <Wrapper id="mainwrapper" css={{ height: mainHeight + "px" }}>
                    <ScrollBar style={{ scaleY: scrollanimation, originY: 0, height: scrollheight + "px" }} />

                    <ContentWrapper id="wrapper" style={{ y: yFast }}>
                        <FlexContainer direction="column" css={{ padding: "2em 6em" }}>
                            <div >
                                <h1 css={{ color: dark, fontSize: "6em" }}>Impressum</h1>
                            </div>
                            <FlexBox direction="column" align="flex-start" css={{ width: "100%" }}>

                                <h2>Kontakt</h2>

                                <p>
                                    Haarstudio Marita Kraus GmbH <br />
                                    Marita Schindler <br />
                                    Andreas-Hofer-Str. 69b <br />
                                    79111 Freiburg im Breisgau
                                </p>
                                <p>
                                    Telefon: 0761 484745
                                    E-Mail: info@haarstudio-marita.de
                                </p>
                                <p>
                                    Vertretungsberechtigter Geschäftsführer: Marita Schindler
                                </p>
                                <p>
                                    Eintragung im Handelsregister. <br />
                                    Registergericht: Amtsgericht Freiburg i.Breisgau <br />
                                    Registernummer:  HRB 3975
                                </p>
                                <p>
                                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 142107470
                                </p>
                                <h2>
                                    Urheberrechte
                                </h2>
                                <p>
                                    Inhalt, Zusammenstellung, Struktur und Präsentation der Webseiten sind urheberrechtlich geschützt. Die Vervielfältigung und Verbreitung von Informationen oder Daten ohne vorherige schriftliche Zustimmung des Herausgebers ist untersagt. Dies gilt auch für die auszugsweise Vervielfältigung und Verbreitung.
                                </p>
                                <h2>
                                    Gewährleistungsausschluss
                                </h2>
                                <p>
                                    Wir prüfen und aktualisieren die Informationen auf unserer Webseite ständig. Trotz aller Sorgfalt können sich die Angaben inzwischen verändert haben. Eine Haftung oder Garantie für die Aktualität, Richtigkeit und Vollständigkeit der zur Verfügung gestellten Informationen kann deshalb nicht übernommen werden.
                                </p>

                            </FlexBox>
                            <Footer />
                        </FlexContainer>

                    </ContentWrapper>

                </Wrapper>
            }
            {isTabletOrMobile &&

                <Wrapper id="wrapper" css={{ height: "auto" }}>

                    <FlexContainer direction="column" css={{ padding: "2em 1em", ["p"]: { lineHeight: "1.6em", marginBlockEnd: "2.4em" }, ["h2"]: { marginTop: "2em" } }}>

                        <FlexBox direction="column" align="flex-start" css={{ width: "100%" }}>
                            <div >
                                <h1 css={{ color: dark, fontSize: "3em", marginTop: "100px", marginBottom: "30px" }}>Impressum</h1>
                            </div>
                            <h2>Kontakt</h2>

                            <p>
                                Haarstudio Marita Kraus GmbH <br />
                                Marita Schindler <br />
                                Andreas-Hofer-Str. 69b <br />
                                79111 Freiburg im Breisgau
                            </p>
                            <p>
                                Telefon: 0761 484745
                                E-Mail: info@haarstudio-marita.de
                            </p>
                            <p>
                                Vertretungsberechtigter Geschäftsführer: Marita Schindler
                            </p>
                            <p>
                                Eintragung im Handelsregister. <br />
                                Registergericht: Amtsgericht Freiburg i.Breisgau <br />
                                Registernummer:  HRB 3975
                            </p>
                            <p>
                                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE 142107470
                            </p>
                            <h2>
                                Urheberrechte
                            </h2>
                            <p>
                                Inhalt, Zusammenstellung, Struktur und Präsentation der Webseiten sind urheberrechtlich geschützt. Die Vervielfältigung und Verbreitung von Informationen oder Daten ohne vorherige schriftliche Zustimmung des Herausgebers ist untersagt. Dies gilt auch für die auszugsweise Vervielfältigung und Verbreitung.
                            </p>
                            <h2>
                                Gewährleistungsausschluss
                            </h2>
                            <p>
                                Wir prüfen und aktualisieren die Informationen auf unserer Webseite ständig. Trotz aller Sorgfalt können sich die Angaben inzwischen verändert haben. Eine Haftung oder Garantie für die Aktualität, Richtigkeit und Vollständigkeit der zur Verfügung gestellten Informationen kann deshalb nicht übernommen werden.
                            </p>

                        </FlexBox>
                        <Footer />
                    </FlexContainer>


                </Wrapper>
            }
        </>
    );
}
