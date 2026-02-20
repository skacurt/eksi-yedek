import React from 'react'

type ContentPart = string | string[] | {
    type: 'ara' | 'gbkz' | 'bkz' | 'abkz' | 'paragraph_break' | 'line_break' | 'url' | 'named_url' | 'entry_query'
    query?: string
    text?: string
    url?: string
    title?: string
    entry_id?: string
}

interface EntryContentProps {
    parts: ContentPart[]
}

export function EntryContent({ parts }: EntryContentProps) {
    return (
        <>
            {parts.map((part, index) => {
                if (typeof part === 'string') {
                    return <React.Fragment key={index}>{part}</React.Fragment>
                }
                
                // Handle array format from named_url parser (returns array, not object)
                if (Array.isArray(part)) {
                    return <React.Fragment key={index}>{part.join('')}</React.Fragment>
                }

                switch (part.type) {
                    case 'ara':
                        return (
                            <React.Fragment key={index}>
                                (ara: <a href={`https://eksisozluk.com/basliklar/ara?searchform.keywords=${encodeURIComponent(part.query!)}`}>
                                    {part.query}
                                </a>)
                            </React.Fragment>
                        )

                    case 'gbkz':
                        return (
                            <a key={index} href={`https://eksisozluk.com/?q=${encodeURIComponent(part.query!)}`}>
                                {part.query}
                            </a>
                        )
                    
                    case 'bkz':
                        return (
                            <React.Fragment key={index}>
                                (bkz: <a href={`https://eksisozluk.com/?q=${encodeURIComponent(part.query!)}`}>
                                    {part.query}
                                </a>)
                            </React.Fragment>
                        )
                    
                    case 'abkz':
                        return (
                            <React.Fragment key={index}>
                                {part.text}
                                <sup>(<a href={`https://eksisozluk.com/?q=${encodeURIComponent(part.query!)}`}>
                                    {part.query}
                                </a>)</sup>
                            </React.Fragment>
                        )
                    
                    case 'paragraph_break':
                        return (
                            <React.Fragment key={index}>
                                <br /><br />
                            </React.Fragment>
                        )
                    
                    case 'line_break':
                        return <br key={index} />
                    
                    case 'url':
                        return (
                            <a key={index} href={encodeURI(part.url!)} target="_blank" rel="noopener noreferrer">
                                {part.url}
                            </a>
                        )
                    
                    case 'named_url':
                        return (
                            <a key={index} href={encodeURI(part.url!)} target="_blank" rel="noopener noreferrer">
                                {part.title}
                            </a>
                        )

                    case 'entry_query':
                        return (
                            <a key={index} href={`https://eksisozluk.com/entry/${encodeURIComponent(part.entry_id!)}`} target="_blank" rel="noopener noreferrer">
                                #{part.entry_id}
                            </a>
                        )
                    
                    default:
                        console.error('unknown part type', (part as any).type)
                        return null
                }
            })}
        </>
    )
}
