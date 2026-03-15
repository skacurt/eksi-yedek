import React from 'react'
import { EntryContent } from './EntryContent'
import { EntryDate } from './EntryDate'
import { highlightText } from '../utils/highlight'

interface EntryProps {
    title: string
    id?: number
    date: Date
    nick: string
    parsedContent: any[]
    isDraft?: boolean
    searchQuery?: string
}

export function Entry({ title, id, date, nick, parsedContent, isDraft = false, searchQuery = '' }: EntryProps) {
    return (
        <div className="entry">
            <h3>
                <a href={`https://eksisozluk.com/?q=${encodeURIComponent(title)}`}>
                    {highlightText(title, searchQuery)}
                </a>
            </h3>
            <pre className={isDraft ? 'draft' : ''}>
                <EntryContent parts={parsedContent} searchQuery={searchQuery} />
            </pre>
            <div className="aul">
                <a title="entry yazarı" href={`https://eksisozluk.com/?q=@${encodeURIComponent(nick)}`}>
                    {nick}
                </a>
                <br />
                <span title="entry tarihi">
                    {id ? (
                        <a 
                            title="ekşi sözlük'te gör" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            href={`https://eksisozluk.com/entry/${encodeURIComponent(id)}`}
                        >
                            <EntryDate date={date} />
                        </a>
                    ) : (
                        <EntryDate date={date} />
                    )}
                </span>
            </div>
        </div>
    )
}
