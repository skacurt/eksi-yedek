import { Entry } from './Entry';

export function DraftsSection({ drafts, nick }) {
    if (!drafts || drafts.length === 0) {
        return null;
    }
    
    return (
        <>
            <h2>kenarda duranlar ({drafts.length})</h2>
            {drafts.map((draft, index) => (
                <Entry
                    key={index}
                    title={draft.title}
                    date={draft.date}
                    nick={nick}
                    parsedContent={draft.parsedContent}
                    isDraft={true}
                />
            ))}
        </>
    );
}
