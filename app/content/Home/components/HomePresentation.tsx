import { beige, contentContainer, mq } from '@/components/styles'
import { FlexBox } from '@ui'
import React from 'react'

const HomePresentation: React.FC = () => {
  return (
    <>
    <div css={contentContainer} id="salon">
        <FlexBox direction="column" justify="flex-end" align="flex-start" gap="2em">
        <div css={mq({flex: 1, width: "100%", order: ["1", "1", "1", "2"]})}>
            <h2>
                Hallo,
            </h2>
            <h3>
                Ich heiße Lisa und freue mich sehr, euch in meinem Salon begrüßen zu dürfen.
            </h3>
            <FlexBox direction='row' justify='space-between' align='flex-start' gap='2em' hasFullWidth changeToColumn styles={{paddingLeft: ["0", "0", "0", "33%"]}}>
                <div css={{flex: 1}}>
                    <p>
                        Mit der Übernahme des Haarstudios Marita beginnt ein neues Kapitel – mit viel Leidenschaft, frischen Ideen und dem Anspruch, dass ihr euch bei mir rundum wohlfühlt.
                    </p>
                </div>
                <div css={{flex: 1}}>
                    <p>
                        In meinem Salon trifft eine gemütliche Atmosphäre auf eine cleane, moderne und zeitlose Einrichtung. Hier entsteht eine fast schon familiäre Stimmung, in der ihr ankommen, entspannen und euch verwöhnen lassen könnt.
                    </p>
                </div>
            </FlexBox>
        </div>
        {/* <div css={mq({flex: 0.5, order: ["2", "2", "2", "3"]})}>
            <img
                src="/images/lisa.jpg"
                alt="Bei Lisa Team"
                loading="lazy"
                style={{ width: "100%", height: "100%", maxWidth: "400px", objectFit: "contain", borderRadius: "10px" }}
                />
        </div> */}
        </FlexBox>
    </div>
        <div css={contentContainer}>
            <FlexBox direction='column' justify='center' align='center' styles={{padding: "60px 0"}}>
                <h3 css={{textAlign: "center"}}>
                    Kommt vorbei und macht euch euer eigenes Bild – ich freue mich auf euren Besuch!
                </h3>
            </FlexBox>

        </div>
    </>
  )
}

export default HomePresentation