import { contentContainer } from '@/components/styles'
import { FlexBox, Grid, GridItem } from '@ui'
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

    <Grid 
            columns="repeat(12, 1fr)" 
            gap="12px"
            alignItems="start"
            styles={{
                '@media (max-width: 768px)': {
                    gridTemplateColumns: 'repeat(12, 1fr)'
                }
            }}
        >
            <GridItem  columnStart="7" columnEnd="12">
                <h2>Das Studio</h2>
                <div >
                    <h3>Ein Ort zum Verweilen</h3>
                    <p >
                        Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.
                    </p>
                </div>
            </GridItem>
        </Grid>
        <Grid 
            columns="repeat(12, 1fr)" 
            gap="12px"
            alignItems="start"
            styles={{
                '@media (max-width: 768px)': {
                    gridTemplateColumns: 'repeat(12, 1fr)'
                }
            }}
        >
            <img
                src="/images/Haarstudio-Marita-Interieur-2020-web-5.jpg"
                alt="Bei Lisa"
                css={studioImage}
                style={{ width: "100%", gridColumn: "span 6", gridRow: "span 2" }}
            />
            <img
                src="/images/Haarstudio-Marita-Interieur-2020-web-16.jpg"
                alt="Bei Lisa"
                css={studioImage}
                style={{ width: "100%", gridColumn: "span 5" }}
            />
            <img
                src="/images/Haarstudio-Marita-Interieur-2020-high-res-14.jpg"
                alt="Bei Lisa"
                css={studioImage}
                style={{ width: "100%", gridColumn: "span 3" }}
            />
        </Grid>
    </div>
    </>
  )
}

export default StudioContent