import { beige, contentContainer, mq } from '@/components/styles'
import { Grid, GridItem } from '@ui'
import React from 'react'

const HomePresentation: React.FC = () => {
  return (
    <>
    <div css={contentContainer} id="salon">
        <Grid 
            columns={["1fr", "1fr", "repeat(2, 1fr)", "repeat(2, 1fr)"]}
            rows={["auto", "auto", "auto 1fr", "auto 1fr"]}
            gap="2em"
            hasFullWidth
            styles={{
                alignItems: "start",
                justifyItems: "start"
            }}
        >
            {/* Header section - spans full width */}
            <GridItem 
                column={["1", "1", "1 / -1", "1 / -1"]}
                row={["1", "1", "1", "1"]}
            >
                <h2>
                    Unser Salon.
                </h2>
                <h3>
                    Ich heiße Lisa und freue mich sehr, euch in meinem Salon begrüßen zu dürfen.
                </h3>
            </GridItem>
            
            {/* Image - bottom left position */}
            <GridItem 
                column={["1", "1", "1", "1"]}
                row={["2"]}
                styles={{
                    alignSelf: "end"
                }}
            >
                <img
                    src="/images/lisa.jpg"
                    alt="Bei Lisa Team"
                    loading="lazy"
                    style={{ width: "100%", display: "none", height: "auto", maxWidth: "300px", objectFit: "contain", borderRadius: "10px" }}
                />
            </GridItem>

            {/* Text content - starts in the middle, right column */}
            <GridItem 
                column={["1", "1", "2", "2"]}
                row={["3", "3", "2", "2"]}
                // styles={{
                //     alignSelf: "center",
                //     display: "grid",
                //     gridTemplateColumns: ["1fr", "1fr", "1fr", "repeat(2, 1fr)"],
                //     gap: "2em",
                //     width: "100%"
                // }}
            >
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
