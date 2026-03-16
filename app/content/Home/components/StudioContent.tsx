import { contentContainer } from '@/components/styles'
import { Grid, GridItem } from '@ui'
import { studioImage } from '../styles'

const StudioContent = () => {
  return (
    <>
    <div css={{width: "100%", height: "400px", display: "none"}}>
        <img 
            src="/images/Haarstudio-Marita-Interieur-2020-web-9.jpg" 
            alt="Bei Lisa"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: "400px"  }}
        />
    </div>
    <div css={contentContainer}>

    <Grid 
            columns="repeat(12, 1fr)" 
            gap="12px"
            alignItems="center"
            styles={{
                '@media (max-width: 768px)': {
                    gridTemplateColumns: 'repeat(12, 1fr)'
                }
            }}
        >
             
            <GridItem  columnStart={["1", "1", "7"]} columnEnd={"12"} row={["1", "1", "1", "1"]}>
                <h2>Das Studio.</h2>
                <div >
                    <h3>Ein Ort zum Verweilen</h3>
                    <p >
                        Haare sind für uns mehr als nur ein Beruf. Sie sind Berufung, Motivation und Lifestyle zugleich. In vielen Fällen genügt ein frischer Schnitt – ganz gleich ob klassisch oder topmodisch – um der Person im Spiegel ganz neuen Glanz zu verleihen und Sie richtig aufleben zu lassen.
                    </p>
                </div>
            </GridItem>
            <GridItem columnStart={["1", "1", "1"]} columnEnd={["13", "13", "6"]} row={["2", "2", "1", "1"]}>
                <img
                    src="/images/studio_1.jpg"
                    alt="Bei Lisa"
                    css={studioImage}
                    style={{ width: "100%" }}
                />
            </GridItem>
        </Grid>
      
    </div>
    </>
  )
}

export default StudioContent