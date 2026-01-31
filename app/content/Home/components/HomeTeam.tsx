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

    // Create layout with empty spaces for grid positioning
    const createGridLayout = () => {
        const layout: (Person | null)[] = []
        
        // Add persons with empty spaces between them
        // Example: [person, empty, person, empty, person, empty, person]
        persons.forEach((person, index) => {
            layout.push(person)
            // Add empty space after each person except the last one
            if (index < persons.length - 1) {
                layout.push(null)
            }
        })
        
        return layout
    }

    const gridLayout = createGridLayout()

    return (
        <div css={contentContainer} id="team">
            <FlexBox direction="column" justify="center" align="center">
                <h2 css={{ textAlign: "center", color: beige }}>Das Team</h2>
                <h3 css={{ textAlign: "center" }}>Friseurinnen mit Leidenschaft</h3>
                <p css={{ textAlign: "center", maxWidth: "60%", margin: "0 auto 4em" }}>
                    Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird.
                </p>
            </FlexBox>

            {/* Grid layout for team members */}
            <div
                css={{
                    display: "grid",
                    gridTemplateColumns: "repeat(12, 1fr)",
                    gridTemplateRows: "auto auto",
                    gap: "2em",
                    width: "100%",
                    "@media (max-width: 768px)": {
                        gridTemplateColumns: "1fr",
                        gridTemplateRows: "auto",
                    },
                }}
            >
                {gridLayout.map((person, index) => {
                    // Render empty space
                    if (!person) {
                        return (
                            <div
                                key={`empty-${index}`}
                                css={{
                                    gridColumn: "span 3",
                                    "@media (max-width: 768px)": {
                                        display: "none",
                                    },
                                }}
                            />
                        )
                    }

                    // Render person
                    return (
                        <div
                            key={person.objectId}
                            css={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                gridColumn: "span 3",
                                marginTop: "2em",
                                "@media (max-width: 768px)": {
                                    gridColumn: "span 1",
                                },
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