import { motion, useSpring, useTransform, useViewportScroll } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { dark, FlexBox, FlexContainer, Wrapper, light } from '../components/styles';

let mainclientheight;

const Datenschutz = () => {
    const [mainHeight, setmainHeight] = useState()
    const [scrollheight, setScrollheight] = useState()
    const {scrollY, scrollYProgress} = useViewportScroll() 

useEffect(() => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    mainclientheight = document.getElementById('wrapper').clientHeight
  
    setScrollheight((window.innerHeight / 100) )
    setmainHeight((mainclientheight ) *1.1)
  },[])


    const scrollbar = useTransform(scrollYProgress, value => value * 100  )
    let scrollanimation = useSpring(scrollbar, {damping: 99, stiffness: 100})

    const scrollFast = useTransform(scrollY, value => -0.9*  value  )

    let yFast = useSpring(scrollFast, { damping: 99, stiffness: 200 })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1180px)' })
    const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1180px)'
    })
    return (
        <Layout>
            <SEO title="Datenschutzerklärung" />
            <Header top="datenschutz" />
            {isDesktopOrLaptop &&
            <Wrapper id="mainwrapper" css={{height: mainHeight + "px"}}> 
            <motion.div style={{scaleY: scrollanimation, originY: 0 }}  css={{position: "fixed", top:0, right: 0, width: "10px", background: dark, zIndex: 12, height: scrollheight + "px" }} />

                <motion.div id="wrapper" style={{y: yFast}} css={{position: "fixed",  height: "auto", width: "auto", top: "100px", left: "auto", right: "auto", zIndex: 5, background: light, width: "100%"}}>
                    <FlexContainer direction="column" css={{padding: "2em 6em"}}>
                        <div >
                            <h1 css={{color: dark, fontSize: "4em"}}>Datenschutzerklärung</h1>
                        </div>
                        <FlexBox direction="column" align="flex-start" css={{ width: "100%"}}>
                        
                        <p dir="ltr"><strong><span >　</span></strong></p>
                            <p><strong>Benennung der verantwortlichen Stelle　</strong></p>
                            <p> </p>
                            <p><span >Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:　</span></p>
                            <p> </p>
                            <p><span >Haarstudio Marita Kraus GmbH<br/>
                            Marita Schindler<br/>
                            Andreas-Hofer-Str. 69b<br/>
                            79111 Freiburg　</span></p>
                            <p> </p>
                            <p>Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).　</p>
                            <p> </p>
                            <p><strong>Widerruf Ihrer Einwilligung zur Datenverarbeitung　</strong></p>
                            <p> </p>
                            <p>Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der Datenverarbeitung möglich. Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf
                            genügt eine formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.　</p>
                            <p> </p>
                            <p><strong>Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde　</strong></p>
                            <p> </p>
                            <p><span >Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen Verstoßes ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige
                            Aufsichtsbehörde bezüglich datenschutzrechtlicher Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der Sitz unseres Unternehmens befindet. Der folgende Link stellt eine Liste
                            der Datenschutzbeauftragten sowie deren Kontaktdaten bereit:</span> <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"><u><span><span >https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</span></span></u></a><span >.　</span></p>
                            <p> </p>
                            <p><span ><strong>Recht auf Datenübertragbarkeit　</strong></span></p>
                            <p> </p>
                            <p>Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die
                            Bereitstellung erfolgt in einem maschinenlesbaren Format. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar
                            ist.　</p>
                            <p> </p>
                            <p><strong>Recht auf Auskunft, Berichtigung, Sperrung, Löschung　</strong></p>
                            <p> </p>
                            <p>Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, Herkunft der Daten, deren
                            Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Diesbezüglich und auch zu weiteren Fragen zum Thema personenbezogene Daten
                            können Sie sich jederzeit über die im Impressum aufgeführten Kontaktmöglichkeiten an uns wenden.　</p>
                            <p> </p>
                            <p><strong>SSL- bzw. TLS-Verschlüsselung　</strong></p>
                            <p> </p>
                            <p>Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als Seitenbetreiber senden, nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind
                            Daten, die Sie über diese Website übermitteln, für Dritte nicht mitlesbar. Sie erkennen eine verschlüsselte Verbindung an der „https://“ Adresszeile Ihres Browsers und am Schloss-Symbol in der
                            Browserzeile.　</p>
                            <p> </p>
                            <p><strong>Server-Log-Dateien　</strong></p>
                            <p> </p>
                            <p>In Server-Log-Dateien erhebt und speichert der Provider der Website automatisch Informationen, die Ihr Browser automatisch an uns übermittelt. Dies sind:　</p>
                            <p>Browsertyp und Browserversion　</p>
                            <p>Verwendetes Betriebssystem　</p>
                            <p>Referrer URL　</p>
                            <p>Hostname des zugreifenden Rechners　</p>
                            <p>Uhrzeit der Serveranfrage　</p>
                            <p>IP-Adresse　</p>
                            <p> </p>
                            <p>Es findet keine Zusammenführung dieser Daten mit anderen Datenquellen statt. Grundlage der Datenverarbeitung bildet Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur
                            Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.　</p>
                            <p> </p>
                            <p><strong>Cookies　</strong></p>
                            <p> </p>
                            <p>Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und
                            sicherer zu machen. 　</p>
                            <p> </p>
                            <p>Einige Cookies sind “Session-Cookies.” Solche Cookies werden nach Ende Ihrer Browser-Sitzung von selbst gelöscht. Hingegen bleiben andere Cookies auf Ihrem Endgerät bestehen, bis Sie
                            diese selbst löschen. Solche Cookies helfen uns, Sie bei Rückkehr auf unserer Website wiederzuerkennen.　</p>
                            <p> </p>
                            <p>Mit einem modernen Webbrowser können Sie das Setzen von Cookies überwachen, einschränken oder unterbinden. Viele Webbrowser lassen sich so konfigurieren, dass Cookies mit dem Schließen
                            des Programms von selbst gelöscht werden. Die Deaktivierung von Cookies kann eine eingeschränkte Funktionalität unserer Website zur Folge haben.　</p>
                            <p> </p>
                            <p>Das Setzen von Cookies, die zur Ausübung elektronischer Kommunikationsvorgänge oder der Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z.B. Warenkorb) notwendig sind, erfolgt auf
                            Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Als Betreiber dieser Website haben wir ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und reibungslosen Bereitstellung
                            unserer Dienste. Sofern die Setzung anderer Cookies (z.B. für Analyse-Funktionen) erfolgt, werden diese in dieser Datenschutzerklärung separat behandelt.</p>
                            <p> </p>
                        </FlexBox>
                    <Footer />

                    </FlexContainer>
            </motion.div>

            </Wrapper>}
            {isTabletOrMobile &&
            <Wrapper id="wrapper" css={{height: "auto"}}> 

                    <FlexContainer direction="column" css={{padding: "2em 1em", ["p"]: {lineHeight: "1.6em", marginBlockEnd: "2em"}, ["h2"]: {marginTop: "2em"}}}>
                        
                        <FlexBox direction="column" align="flex-start" css={{ width: "100%"}}>
                        <div >
                            <h1 css={{color: dark, fontSize: "3em", marginTop: "100px"}}>Datenschutz</h1>
                        </div>
                        
                        <p dir="ltr"><strong><span >　</span></strong></p>
                            <p><strong>Benennung der verantwortlichen Stelle　</strong></p>
                            <p><span >Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:　</span></p>
                            <p><span >Haarstudio Marita Kraus GmbH<br/>
                            Marita Schindler<br/>
                            Andreas-Hofer-Str. 69b<br/>
                            79111 Freiburg　</span></p>
                            <p>Die verantwortliche Stelle entscheidet allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).　</p>
                            <p><strong>Widerruf Ihrer Einwilligung zur Datenverarbeitung　</strong></p>
                            <p>Nur mit Ihrer ausdrücklichen Einwilligung sind einige Vorgänge der Datenverarbeitung möglich. Ein Widerruf Ihrer bereits erteilten Einwilligung ist jederzeit möglich. Für den Widerruf
                            genügt eine formlose Mitteilung per E-Mail. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.　</p>
                            <p><strong>Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde　</strong></p>
                            <p><span >Als Betroffener steht Ihnen im Falle eines datenschutzrechtlichen Verstoßes ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Zuständige
                            Aufsichtsbehörde bezüglich datenschutzrechtlicher Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes, in dem sich der Sitz unseres Unternehmens befindet. Der folgende Link stellt eine Liste
                            der Datenschutzbeauftragten sowie deren Kontaktdaten bereit:</span> <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html"><u><span><span >https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html</span></span></u></a><span >.　</span></p>
                            <p><span ><strong>Recht auf Datenübertragbarkeit　</strong></span></p>
                            <p>Ihnen steht das Recht zu, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an Dritte aushändigen zu lassen. Die
                            Bereitstellung erfolgt in einem maschinenlesbaren Format. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar
                            ist.　</p>
                            <p><strong>Recht auf Auskunft, Berichtigung, Sperrung, Löschung　</strong></p>
                            <p>Sie haben jederzeit im Rahmen der geltenden gesetzlichen Bestimmungen das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, Herkunft der Daten, deren
                            Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Diesbezüglich und auch zu weiteren Fragen zum Thema personenbezogene Daten
                            können Sie sich jederzeit über die im Impressum aufgeführten Kontaktmöglichkeiten an uns wenden.　</p>
                            <p><strong>SSL- bzw. TLS-Verschlüsselung　</strong></p>
                            <p>Aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, die Sie an uns als Seitenbetreiber senden, nutzt unsere Website eine SSL-bzw. TLS-Verschlüsselung. Damit sind
                            Daten, die Sie über diese Website übermitteln, für Dritte nicht mitlesbar. Sie erkennen eine verschlüsselte Verbindung an der „https://“ Adresszeile Ihres Browsers und am Schloss-Symbol in der
                            Browserzeile.　</p>
                            <p><strong>Server-Log-Dateien　</strong></p>
                            <p>In Server-Log-Dateien erhebt und speichert der Provider der Website automatisch Informationen, die Ihr Browser automatisch an uns übermittelt. Dies sind:　</p>
                            <p>Browsertyp und Browserversion　</p>
                            <p>Verwendetes Betriebssystem　</p>
                            <p>Referrer URL　</p>
                            <p>Hostname des zugreifenden Rechners　</p>
                            <p>Uhrzeit der Serveranfrage　</p>
                            <p>IP-Adresse　</p>
                            <p>Es findet keine Zusammenführung dieser Daten mit anderen Datenquellen statt. Grundlage der Datenverarbeitung bildet Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur
                            Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.　</p>
                            <p><strong>Cookies　</strong></p>
                            <p>Unsere Website verwendet Cookies. Das sind kleine Textdateien, die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen uns dabei, unser Angebot nutzerfreundlicher, effektiver und
                            sicherer zu machen. 　</p>
                            <p>Einige Cookies sind “Session-Cookies.” Solche Cookies werden nach Ende Ihrer Browser-Sitzung von selbst gelöscht. Hingegen bleiben andere Cookies auf Ihrem Endgerät bestehen, bis Sie
                            diese selbst löschen. Solche Cookies helfen uns, Sie bei Rückkehr auf unserer Website wiederzuerkennen.　</p>
                            <p>Mit einem modernen Webbrowser können Sie das Setzen von Cookies überwachen, einschränken oder unterbinden. Viele Webbrowser lassen sich so konfigurieren, dass Cookies mit dem Schließen
                            des Programms von selbst gelöscht werden. Die Deaktivierung von Cookies kann eine eingeschränkte Funktionalität unserer Website zur Folge haben.　</p>
                            <p>Das Setzen von Cookies, die zur Ausübung elektronischer Kommunikationsvorgänge oder der Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z.B. Warenkorb) notwendig sind, erfolgt auf
                            Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Als Betreiber dieser Website haben wir ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und reibungslosen Bereitstellung
                            unserer Dienste. Sofern die Setzung anderer Cookies (z.B. für Analyse-Funktionen) erfolgt, werden diese in dieser Datenschutzerklärung separat behandelt.</p>
                        </FlexBox>
                    <Footer />

                    </FlexContainer>

            </Wrapper>
            
            }
        </Layout>
    )
}
export default Datenschutz;