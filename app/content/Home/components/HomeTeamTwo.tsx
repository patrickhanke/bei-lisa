import { contentContainer, dark } from '@/components/styles'
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

    // Create array with empty spacers between persons
    type GridItem = { type: 'person'; data: Person } | { type: 'empty'; id: string }
    const gridItems: GridItem[] = persons.reduce<GridItem[]>((acc, person, index) => {
        // Add person
        acc.push({ type: 'person', data: person })
        // Add spacers after each person except the last, alternating between 1 and 2
        if (index < persons.length - 1) {
            const spacerCount = index % 2 === 0 ? 1 : 2
            for (let i = 0; i < spacerCount; i++) {
                acc.push({ type: 'empty', id: `empty-${index}-${i}` })
            }
        }
        return acc
    }, [])

    return (
        <div css={contentContainer} id="team">
            <FlexBox direction="column" justify="center" align="center">
                <h2 css={{ textAlign: "center" }}>Das Team.</h2>
                <h3 css={{ textAlign: "center" }}>Friseurinnen mit Leidenschaft</h3>
                <p css={{ textAlign: "center", maxWidth: "60%", margin: "0 auto 4em" }}>
                    Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird.
                </p>
            </FlexBox>

            {/* Team members grid with empty spacers */}
            <div
                css={{
                    display: "grid",
                    // Persons get 2fr (larger), spacers get 1fr (smaller gap)
                    gridTemplateColumns: "2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr",
                    gap: "1em",
                    width: "100%",
                    "@media (max-width: 768px)": {
                        gridTemplateColumns: "1fr",
                        gap: "3em",
                    },
                }}
            >
                {gridItems.map((item) => {
                    if (item.type === 'empty') {
                        // Empty spacer - hidden on mobile
                        return (
                            <div
                                key={item.id}
                                css={{
                                    gridColumn: "span 2",
                                    "@media (max-width: 768px)": {
                                        display: "none",
                                    },
                                }}
                            />
                        )
                    }

                    const person = item.data
                    return (
                    <div
                        key={person.objectId}
                        css={{
                            gridColumn: "span 2",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            padding: "1em",
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
                                    borderRadius: "6px",
                                    aspectRatio: "1 / 1.4",
                                }}
                            />
                        )}
                        
                        {/* Person name (title) */}
                        {person.title && (
                            <h4 css={{ 
                                color: dark, 
                                marginBottom: "0.5em",
                                fontSize: "1.2em",
                            }}>
                                {person.title}
                            </h4>
                        )}
                        
                        {/* Person description (text) */}
                        {person.description && (
                            <p css={{ 
                                color: dark,
                                lineHeight: "1.6",
                                margin: 0,
                                maxWidth: "250px",
                            }}>
                                {person.description}
                            </p>
                        )}
                    </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HomeTeam
