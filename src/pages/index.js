import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { beige, darkgrey, FlexBox, FlexContainer, grey, Wrapper } from "../components/styles"
import TeamCard from "../components/teamcard"
import Footer from "../components/footer"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Wrapper> 
    <div css={{ maxWidth: `1400px`, height: `100vh`, background: "rgba(0,0,0, 0.2)", zIndex: 2, overflow: "hidden", margin: "auto", position: "relative"}}>
      <Image image="team01" css={{zIndex: 1}} />
      <div css={{height: "100%", width: "100%", position: "absolute",  background: "rgba(0,0,0, 0.2)", zIndex: 4}}>
        <h1 css={{position: "absolute", top: "50%", left: "50%", textAlign: "center", transform: "translate(-50%, -50%)", zIndex: 5}}>Haarstudio <br />Marita Kraus</h1>

      </div>
    </div>
    <FlexContainer align="center" justify="center">
      <FlexBox direction="column" align="center" justify="center">
        <h2 css={{textAlign: "right", color: beige}}>Wir bieten alles für Ihre Haare:</h2>
        
        <div css={{color: darkgrey}}>
          <div css={{width: "8em", height: "8em", background: beige, borderRadius: "50%", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1}}></div>
        <div css={{zIndex: 13}}>
        <h3>
        Damenschnitt
        </h3>
        <h3>
        Herrenschnitt
        </h3>
        <h3>
        Wimpern
        </h3>
        <h3 >
        Extensions
        </h3>
        <h3>
        Dauerwelle
        </h3>
        <h3>
        Make-Up
        </h3>
        <h3>
        Kinderschnitt
        </h3>
        </div>
        </div>
       
      </FlexBox>
     
        
    </FlexContainer>
    <FlexContainer direction="row" justify="space-evenly" align="center">
      
          <div css={{width: "30em"}} >
          <h4>
            Ein Ort um zu bleiben
          </h4>
          
          <p>
            Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen
          </p>
          </div>
          <div css={{width: "30%", height: "30em"}}>
          <Image image="studio06" />
          </div>
      
        
    </FlexContainer>
    <FlexContainer>
      <div  css={{height: "24em", width: "100%"}}>
        <Image image="studio03" />
      </div>
    </FlexContainer>

    <FlexContainer direction="row" justify="space-evenly" align="center">
      <div css={{width: "30%", height: "30em"}}>
        <Image image="studio07" />
      </div>
      <div css={{width: "30em"}}>
        <h4>
          Der Weg zu ihrem Haarschnitt
        </h4>
        <p>
        Exaktes Zuhören. Das ist das wahre Geheimnis, um wirklich gezielt auf Ihre Wünsche eingehen zu können. Mit professioneller Schnitttechnik bringen wir Ihre Vorstellungen dann in Form. Bei uns können Sie sich inspirieren lassen.
        </p>
      </div>
    </FlexContainer>
    <FlexContainer direction="column" align="center" justify="center" css={{color: darkgrey}}>
      <h2 css={{textAlign: "center", color: beige}}>Das Team</h2>
      <h3 css={{textAlign: "center"}}>Friseurinnen mit Leidenschaft</h3>
      <p css={{textAlign: "center", maxWidth: "60%"}}>Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.</p>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em"}}>
        <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team01" margin={0} />
        <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team02" margin={4} />
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em"}}>
        <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team03" margin={0} />
        <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team04" margin={4} />
        <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team05" margin={0} />
      </FlexBox>
      <FlexBox direction="row" align="flex-start" justify="space-evenly" css={{width: "54em"}}>
        <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team06" margin={4} />
        <TeamCard name="Marita Schindler" titel="Friseurmeisterin" bild="team07" margin={0} />
      </FlexBox>
    </FlexContainer>

    <FlexContainer direction="column" align="center">
      <h2>Kontakt</h2>
      <p>Schreiben Sie uns oder rufen Sie uns an</p>
    </FlexContainer>
    </Wrapper>
    <Footer />
  </Layout>
)

export default IndexPage
