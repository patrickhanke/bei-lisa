import { contentContainer, mq } from '@/components/styles'
import { Grid, GridItem } from '@ui'
import React from 'react'
import { mainImage } from '../styles'

const HomePresentation: React.FC = () => {
  return (
    <>
    <div css={contentContainer} id="salon">
        <Grid 
            columns={["12"]}
            rows={["auto", "auto", "auto 1fr", "auto 1fr"]}
            gap="2em"
            hasFullWidth
            styles={{
                alignItems: "start",
                justifyItems: "start"
            }}
        >
            <GridItem 
                columnStart={["1", "1", "8"]}
                columnEnd={["13"]}
                row={["2", "2", "1", "1"]}
                styles={{
                    alignSelf: "end"
                }}
            >
                <img
                    src="/images/team_02.jpeg"
                    alt="Bei Lisa."
                    loading="lazy"
                    css={mainImage}
                />
            </GridItem>
            <GridItem 
                columnStart={["1"]}
                columnEnd={["13", "13", "6"]}
                row={["1", "1", "1", "1"]}
            >
                <h2>
                    Unser Salon.
                </h2>
                <h3>
                    Ich heiße Lisa und freue mich sehr, euch in meinem Salon begrüßen zu dürfen.
                </h3>
                <div>
                    <p>
                        Mit der Übernahme des Haarstudios Marita beginnt ein neues Kapitel – mit viel Leidenschaft, frischen Ideen und dem Anspruch, dass ihr euch bei mir rundum wohlfühlt.
                    </p>
                    <p>
                        In meinem Salon trifft eine gemütliche Atmosphäre auf eine cleane, moderne und zeitlose Einrichtung. Hier entsteht eine fast schon familiäre Stimmung, in der ihr ankommen, entspannen und euch verwöhnen lassen könnt.
                    </p>
                    <p>
                        Kommt vorbei und macht euch euer eigenes Bild – ich freue mich auf euren Besuch!
                    </p>
                </div>
            </GridItem>
        </Grid>
        </div>
    </>
  )
}

export default HomePresentation
