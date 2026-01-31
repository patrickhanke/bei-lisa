import { contentContainer } from '@/components/styles'
import { FlexBox } from '@ui'
import React from 'react'
import { studioImage } from '../styles'

const StudioContent = () => {
  return (
    <>
    <div css={{width: "100%", height: "400px"}}>
        <img 
            src="/images/Haarstudio-Marita-Interieur-2020-web-9.jpg" 
            alt="Bei Lisa"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover",  }}
        />
    </div>
    <div css={contentContainer}>

        <FlexBox direction="row" justify="center" align="flex-start" styles={{ flex: 1}}>
            <div css={{flex: 1}} />
            <div css={{flex: 1}}>
                <h2>Das Studio</h2>
                    <div >
                        <h3>Ein Ort zum Verweilen</h3>
                        <p >
                            Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.
                        </p>
                    </div>
            </div>
        </FlexBox>
    </div>
    <div css={contentContainer}>
        <FlexBox direction="row" justify="center" align="flex-start" gap="0" changeToColumn>
            <div css={{flex: 1, marginRight: "24px"}}>
                <img
                    src="/images/Haarstudio-Marita-Interieur-2020-web-5.jpg"
                    alt="Bei Lisa"
                    css={studioImage}
                    width="100%"
                />
            </div>
            <div css={{flex: 1, display: "flex", alignItems:"flex-start", flexDirection: "column", gap: "24px"}}>
                <img
                    src="/images/Haarstudio-Marita-Interieur-2020-web-16.jpg"
                    alt="Bei Lisa"
                    css={studioImage}
                    width="300px"
                />
                <img
                    src="/images/Haarstudio-Marita-Interieur-2020-high-res-14.jpg"
                    alt="Bei Lisa"
                    css={studioImage}
                    width="240px"
                />
            </div>
        </FlexBox>
    </div>
    </>
  )
}

export default StudioContent