import { createFileRoute } from '@tanstack/react-router'
import { motion, useSpring, useTransform, MotionValue, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { SEO } from '../components/SEO';
import { dark, FlexContainer, Wrapper, light, contentContainer, smallContentContainer } from '../components/styles';
import styled from '@emotion/styled';
import { FlexBox } from '@ui';
import { Header } from '@/content/Header';
import { Footer } from '@/content/Footer';

export const Route = createFileRoute('/datenschutz')({
  component: DatenschutzPage,
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
    width: "100%"
});

function DatenschutzPage() {
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

        setScrollheight((window.innerHeight / 100));
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
            <SEO title="Datenschutzerklärung" />
            <Wrapper id="mainwrapper" css={{ height: mainHeight + "px" }}>

            <Header top="datenschutz" />
                <ContentWrapper id="wrapper" style={{ y: yFast }}>
                    <div css={smallContentContainer}>
                        <div >
                            <h1 >Datenschutzerklärung</h1>
                        </div>
                        <FlexBox direction="column" align="flex-start" hasFullWidth>
                            <h2>Datenschutz</h2>
                            <p>
                                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese Datenschutzerklärung informiert Sie über die Verarbeitung Ihrer personenbezogenen Daten bei der Nutzung unserer Website.
                            </p>
                            
                            <h2>Verantwortlicher</h2>
                            <p>
                                Haarstudio Marita Kraus GmbH<br />
                                Marita Schindler<br />
                                Andreas-Hofer-Str. 69b<br />
                                79111 Freiburg im Breisgau<br />
                                Telefon: 0761 484745<br />
                                E-Mail: info@haarstudio-marita.de
                            </p>

                            <h2>Kontaktaufnahme</h2>
                            <p>
                                Bei Ihrer Kontaktaufnahme mit uns werden die von Ihnen mitgeteilten Daten von uns gespeichert, um Ihre Fragen zu beantworten. Die in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die Speicherung nicht mehr erforderlich ist, oder schränken die Verarbeitung ein, falls gesetzliche Aufbewahrungspflichten bestehen.
                            </p>

                            <h2>Ihre Rechte</h2>
                            <p>
                                Sie haben das Recht auf Auskunft über die Sie betreffenden personenbezogenen Daten sowie auf Berichtigung oder Löschung oder auf Einschränkung der Verarbeitung oder ein Widerspruchsrecht gegen die Verarbeitung sowie ein Recht auf Datenübertragbarkeit.
                            </p>
                        </FlexBox>
                    </div>
                    <Footer />

                </ContentWrapper>
            </Wrapper>
           
        </>
    );
}
