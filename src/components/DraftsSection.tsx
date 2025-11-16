import { Entry } from './Entry';

interface Draft {
    title: string;
    date: Date;
    parsedContent: any[];
}

interface DraftsSectionProps {
    drafts?: Draft[];
    nick: string;
}

export function DraftsSection({ drafts, nick }: DraftsSectionProps) {
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
