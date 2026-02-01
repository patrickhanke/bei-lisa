import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { getEntries, getCategories, Entry, Category } from '@/lib/static-data'
import { beige, contentContainer, darkgrey } from '@/components/styles'
import { FlexBox } from '@ui'
import { contactButton } from '../styles'

const PriceListContainer = styled.div({
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
})

const CategorySection = styled.div({
  marginBottom: '3em',
  '&:last-child': {
    marginBottom: 0,
  },
})

const CategoryHeader = styled.h3({
  fontSize: '0.9em',
  fontWeight: 600,
  color: darkgrey,
  marginBottom: '1.5em',
  textAlign: 'left',
  padding: "0.6em",
  backgroundColor: beige,
  width: "100%",
  maxWidth: "100% !important",
  borderRadius: "0.6em",
})

const PriceItem = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.3em 1.2em',
  borderBottom: `0.6px solid rgba(0, 0, 0, 0.2)`,
  '&:last-child': {
    borderBottom: 'none',
    marginBottom: 0,
  },
})

const PriceTitle = styled.p({
  fontWeight: 500,
  color: darkgrey,
  margin: "0 !important",
  lineHeight: "1.8 !important"

})

const PriceValue = styled.p({
  fontWeight: 600,
  color: darkgrey,
  marginLeft: '1em',
  whiteSpace: 'nowrap',
  margin: "0 !important",
  lineHeight: "1.8 !important"
})

interface GroupedEntries {
  category: Category | null
  entries: Entry[]
}

const HomePrices = () => {
  const [groupedEntries, setGroupedEntries] = useState<GroupedEntries[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const [entries, categories] = await Promise.all([
          getEntries(),
          getCategories(),
        ])

        // Create a map of categoryId -> Category for quick lookup
        const categoryMap = new Map<string, Category>()
        categories.forEach((cat) => {
          categoryMap.set(cat.objectId, cat)
        })

        // Group entries by category
        const entriesByCategory = new Map<string, Entry[]>()
        const uncategorizedEntries: Entry[] = []

        entries.forEach((entry) => {
          if (entry.categories && entry.categories.length > 0) {
            // Add entry to each of its categories
            entry.categories.forEach((cat) => {
              const categoryId = cat.value
              if (!entriesByCategory.has(categoryId)) {
                entriesByCategory.set(categoryId, [])
              }
              entriesByCategory.get(categoryId)!.push(entry)
            })
          } else {
            // No categories assigned
            uncategorizedEntries.push(entry)
          }
        })

        // Build the grouped entries array
        const grouped: GroupedEntries[] = []

        // Add categorized entries
        entriesByCategory.forEach((categoryEntries, categoryId) => {
          const category = categoryMap.get(categoryId) || null
          grouped.push({
            category,
            entries: categoryEntries,
          })
        })

        // Sort by category title
        grouped.sort((a, b) => {
          const titleA = a.category?.title || a.category?.label || ''
          const titleB = b.category?.title || b.category?.label || ''
          return titleA.localeCompare(titleB)
        })

        // Add uncategorized entries at the end
        if (uncategorizedEntries.length > 0) {
          grouped.push({
            category: null,
            entries: uncategorizedEntries,
          })
        }

        setGroupedEntries(grouped)
      } catch (error) {
        console.error('Failed to load price entries:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPrices()
  }, [])

  if (loading) {
    return <PriceListContainer>Loading prices...</PriceListContainer>
  }

  if (groupedEntries.length === 0) {
    return <PriceListContainer>No prices available.</PriceListContainer>
  }

  return (
    <div id="angebot">
        <PriceListContainer>
        {groupedEntries.map((group, index) => (
            <CategorySection key={group.category?.objectId || `uncategorized-${index}`}>
            <CategoryHeader>
                {group.category?.title || group.category?.label || 'Other'}
            </CategoryHeader>
            {group.entries.map((entry) => (
                <PriceItem key={entry.objectId}>
                <PriceTitle>{entry.title || 'Untitled'}</PriceTitle>
                <PriceValue>{entry.description || '-'}</PriceValue>
                </PriceItem>
            ))}
            </CategorySection>
        ))}
        </PriceListContainer>
        <div css={contentContainer} id="kontakt">
            <FlexBox direction="column" align="center" justify="center">
                <h3 css={{textAlign: "center"}}>Termine sind bitte nur persönlich oder telefonisch zu vereinbaren ! </h3>
                <a href="tel:+49761484745" css={contactButton}>
                    <h4>0761 484745</h4>
                </a>
            </FlexBox>
            <FlexBox direction="row" justify="space-between" align="center" styles={{marginTop: "60px"}}>
                <div css={{flex: 1}} />
                <div>
                    <p css={{fontSize: "0.7em"}}>
                        Bei kurzfristigen Absagen ohne triftigen Grund, die weniger als
                        24 Stunden vor dem Termin erfolgen, werden wir 50% der gebuchten
                        Leistung in Rechnung stellen. 
                    </p>
                </div>
            </FlexBox>
        </div>
    </div >
  )
}

export default HomePrices