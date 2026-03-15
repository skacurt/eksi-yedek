import React from 'react'

// Searches for all occurrences of `query` in `text` (case-insensitive) and
// returns a React node with each match wrapped in a <mark> element.
export function highlightText(text: string, query: string): React.ReactNode {
    if (!text || !query) return text
    const lowerText = text
    const lowerQuery = query.toLocaleLowerCase('tr')
    const result: React.ReactNode[] = []
    let last = 0
    let i: number
    while ((i = lowerText.indexOf(lowerQuery, last)) !== -1) {
        if (i > last) {
            result.push(text.slice(last, i))
        }
        result.push(<mark key={i}>{text.slice(i, i + query.length)}</mark>)
        last = i + query.length
    }
    if (!result.length) {
        return text
    }
    if (last < text.length) {
        result.push(text.slice(last))
    }
    return <>{result}</>
}
