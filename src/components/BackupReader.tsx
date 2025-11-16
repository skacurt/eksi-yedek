import { BackupHeader } from './BackupHeader'
import { Entry } from './Entry'
import { DraftsSection } from './DraftsSection'

interface BackupEntry {
    title: string
    id: number
    date: Date
    parsedContent: any[]
}

interface BackupData {
    nick: string
    backupDate: Date
    entries?: BackupEntry[]
    drafts?: any[]
}

interface BackupReaderProps {
    backupData: BackupData | null
}

export function BackupReader({ backupData }: BackupReaderProps) {
    if (!backupData) {
        return null
    }

    const { nick, backupDate, entries, drafts } = backupData

    return (
        <div id="reader">
            <BackupHeader nick={nick} backupDate={backupDate} />
            
            {entries && entries.map((entry, index) => (
                <Entry
                    key={index}
                    title={entry.title}
                    id={entry.id}
                    date={entry.date}
                    nick={nick}
                    parsedContent={entry.parsedContent}
                />
            ))}
            
            <DraftsSection drafts={drafts} nick={nick} />
        </div>
    )
}
