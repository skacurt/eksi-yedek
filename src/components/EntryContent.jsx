import React from 'react';

export function EntryContent({ parts }) {
    return (
        <>
            {parts.map((part, index) => {
                if (typeof part === 'string') {
                    return <React.Fragment key={index}>{part}</React.Fragment>;
                }
                
                // Handle array format from named_url parser (returns array, not object)
                if (Array.isArray(part)) {
                    return <React.Fragment key={index}>{part.join('')}</React.Fragment>;
                }

                switch (part.type) {
                    case 'gbkz':
                        return (
                            <a key={index} href={`https://eksisozluk.com/?q=${encodeURIComponent(part.query)}`}>
                                {part.query}
                            </a>
                        );
                    
                    case 'bkz':
                        return (
                            <React.Fragment key={index}>
                                (bkz: <a href={`https://eksisozluk.com/?q=${encodeURIComponent(part.query)}`}>
                                    {part.query}
                                </a>)
                            </React.Fragment>
                        );
                    
                    case 'abkz':
                        return (
                            <React.Fragment key={index}>
                                {part.text}
                                <sup>(<a href={`https://eksisozluk.com/?q=${encodeURIComponent(part.query)}`}>
                                    {part.query}
                                </a>)</sup>
                            </React.Fragment>
                        );
                    
                    case 'paragraph_break':
                        return (
                            <React.Fragment key={index}>
                                <br /><br />
                            </React.Fragment>
                        );
                    
                    case 'line_break':
                        return <br key={index} />;
                    
                    case 'url':
                        return (
                            <a key={index} href={encodeURI(part.url)} target="_blank" rel="noopener noreferrer">
                                {part.url}
                            </a>
                        );
                    
                    case 'named_url':
                        return (
                            <a key={index} href={encodeURI(part.url)} target="_blank" rel="noopener noreferrer">
                                {part.title}
                            </a>
                        );
                    
                    default:
                        console.error('unknown part type', part.type);
                        return null;
                }
            })}
        </>
    );
}
