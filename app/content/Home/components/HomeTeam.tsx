import { contentContainer, beige, dark } from '@/components/styles'
import React, { useEffect, useState } from 'react'
import { DownloadedFile, Image, loadStaticDataAsync, type Person } from '@/lib/static-data'
import { FlexBox } from '@ui'

const HomeTeam: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([])
    const [images, setImages] = useState<Image[]>([])
    const [downloadedFiles, setDownloadedFiles] = useState<DownloadedFile[]>([])

    useEffect(() => {
        async function loadPersons() {
            try {
                const data = await loadStaticDataAsync()
                setPersons(data.persons)
                setImages(data.images)
                setDownloadedFiles(data.downloadedFiles)
            } catch (error) {
                console.error('[HomeTeam] Failed to load persons:', error)
            }
        }
        loadPersons()
    }, [])

    const findImageForPerson = (person: Person) => {
        const image = images.find(img => img.objectId === person.image)
        const file = downloadedFiles.find(file => file.objectId === image?.objectId)
        
        return file?.localPath
    }

    return (
        <div css={contentContainer}>
            <FlexBox direction="column" justify="center" align="center">
                <h2 css={{ textAlign: "center", color: beige }}>Das Team</h2>
                <h3 css={{ textAlign: "center" }}>Friseurinnen mit Leidenschaft</h3>
                <p css={{ textAlign: "center", maxWidth: "60%", margin: "0 auto 4em" }}>
                    Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird.
                </p>
            </FlexBox>

            {/* Render all persons next to each other */}
            <FlexBox
                direction="row"
                justify="space-evenly"
                align="flex-start"
                styles={{ width: "100%" }}
            >
                {persons.map((person) => (
                    <div
                        key={person.objectId}
                        css={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxWidth: "300px",
                            textAlign: "center",
                        }}
                    >
                        {/* Person image */}
                        {person.image && (
                            <img
                                src={findImageForPerson(person)}
                                alt={person.title || person.label || 'Team member'}
                                css={{
                                    width: "100%",
                                    maxWidth: "250px",
                                    height: "auto",
                                    objectFit: "cover",
                                    marginBottom: "1em",
                                    borderRadius: "24px",
                                    aspectRatio: "1 / 1.4",
                                }}
                            />
                        )}
                        
                        {/* Person name (title) */}
                        {person.title && (
                            <h4 css={{ 
                                color: beige, 
                                marginBottom: "0.5em",
                                fontSize: "1.2em",
                            }}>
                                {person.title}
                            </h4>
                        )}
                        
                        {/* Person description (text) */}
                        {person.text && (
                            <p css={{ 
                                color: dark,
                                lineHeight: "1.6",
                                margin: 0,
                            }}>
                                {person.text}
                            </p>
                        )}
                    </div>
                ))}
            </FlexBox>
        </div>
    )
}

export default HomeTeam