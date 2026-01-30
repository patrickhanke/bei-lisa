import { contentContainer } from '@/components/styles'
import { FlexBox } from '@ui'
import React from 'react'

const StudioContent = () => {
  return (
    <>
    <div css={{width: "100%", height: "400px", margin: "120px auto"}}>
        <img 
            src="/images/Haarstudio-Marita-Interieur-2020-web-5.jpg" 
            alt="Bei Lisa"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover",  }}
        />
    </div>
    <div css={contentContainer}>
        <FlexBox direction="row" justify="center" align="stretch" gap="2em" changeToColumn>
            <FlexBox direction="column" justify="center" align="flex-start" styles={{ flex: 1}}>
            <h2>Das Studio</h2>
                <div css={{ marginLeft: "6em" }} >
                    <h3>Ein Ort zum Verweilen</h3>
                    <p >
                        Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.
                    </p>
                </div>
            </FlexBox>
            <FlexBox direction="column" justify="space-evenly" align="center" styles={{ flex: 1}}>
                <img
                    src="/images/Haarstudio-Marita-Interieur-2020-web-5.jpg"
                    alt="Bei Lisa"
                    style={{ width: "300px", height: "auto", objectFit: "cover" }}
                />
                <img
                    src="/images/Haarstudio-Marita-Interieur-2020-web-5.jpg"
                    alt="Bei Lisa"
                    style={{ width: "300px", height: "auto", objectFit: "cover" }}
                />
            </FlexBox>
        </FlexBox>
    </div>
    </>
  )
}

export default StudioContent