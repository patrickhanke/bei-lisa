import { contentContainer, beige, dark } from '@/components/styles'
import React, { useEffect, useState, useRef } from 'react'
import { DownloadedFile, Image, loadStaticDataAsync, type Person } from '@/lib/static-data'
import { FlexBox, Grid } from '@ui'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const HomeTeam: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([])
    const [images, setImages] = useState<Image[]>([])
    const [downloadedFiles, setDownloadedFiles] = useState<DownloadedFile[]>([])
    const sectionRef = useRef<HTMLDivElement>(null)

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

    // Track scroll progress of the section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    })

    // Duplicate persons array for infinite loop effect
    const duplicatedPersons = [...persons, ...persons, ...persons]

    // Transform scroll progress to horizontal movement
    // Move from 0% to -66.66% (since we have 3 copies, moving 2/3 creates seamless loop)
    const xRaw = useTransform(scrollYProgress, [0, 1], [0, -33.33])
    
    // Apply spring animation for smooth transitions (same values as Home.tsx)
    const xSmooth = useSpring(xRaw, { damping: 99, stiffness: 200 })
    
    // Convert to percentage string
    const x = useTransform(xSmooth, (value) => `${value}%`)

    const findImageForPerson = (person: Person) => {
        const image = images.find(img => img.objectId === person.image)
        const file = downloadedFiles.find(file => file.objectId === image?.objectId)
        
        return file?.localPath
    }

    return (
        <div css={contentContainer} id="team" ref={sectionRef}>
            <FlexBox direction="column" justify="center" align="center">
                <h2 css={{ textAlign: "center" }}>Das Team</h2>
                <h3 css={{ textAlign: "center" }}>Friseurinnen mit Leidenschaft</h3>
                <p css={{ textAlign: "center", maxWidth: "60%", margin: "0 auto 4em" }}>
                    Unser Team erwartet Sie. Wir wollen, dass Ihr Besuch in unserem Salon mit persönlichem Ambiente zu einem echten Verwöhnerlebnis wird.
                </p>
            </FlexBox>

            {/* Infinite horizontal slider */}
            <div
                css={{
                    overflow: "hidden",
                    width: "100%",
                    "@media (max-width: 768px)": {
                        overflow: "visible",
                    },
                }}
            >
                <motion.div
                    style={{ x }}
                    css={{
                        display: "flex",
                        gap: "0",
                        width: "fit-content",
                        "@media (max-width: 768px)": {
                            flexDirection: "column",
                            width: "100%",
                            gap: "2em",
                        },
                    }}
                >
                    {duplicatedPersons.map((person, index) => (
                        <div
                            key={`${person.objectId}-${index}`}
                            css={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                minWidth: "300px",
                                flex: "0 0 auto",
                                padding: "2em 1em",
                                "@media (max-width: 768px)": {
                                    minWidth: "auto",
                                    width: "100%",
                                    padding: "0",
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
                                    maxWidth: "250px",
                                }}>
                                    {person.description}
                                </p>
                            )}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default HomeTeam