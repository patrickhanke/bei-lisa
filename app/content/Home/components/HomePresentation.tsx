import { contentContainer, mq } from '@/components/styles'
import { FlexBox } from '@ui'
import React from 'react'

const HomePresentation = () => {
  return (
    <div css={contentContainer}>
        <FlexBox direction="row" justify="flex-end" align="center" gap="2em" changeToColumn>
        <div css={mq({flex: 1, order: ["1", "1", "1", "2"]})}>
            <h2>
                Hallo,
            </h2>
            <h3>
                Ich heiße Lisa und freue mich sehr, euch in meinem Salon begrüßen zu dürfen.
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
        </div>
        <div css={mq({flex: 1, order: ["2", "2", "2", "1"]})}>
            <img
                src="/src/images/lisa.jpg"
                alt="Bei Lisa Team"
                loading="lazy"
                style={{ width: "100%", height: "100%", maxWidth: "400px", objectFit: "contain", borderRadius: "10px" }}
            />
        </div>


        </FlexBox>

    </div>
  )
}

export default HomePresentation