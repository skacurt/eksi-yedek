import React from 'react';
import { EntryDate } from './EntryDate';

interface BackupHeaderProps {
    nick: string;
    backupDate: Date;
}

export function BackupHeader({ nick, backupDate }: BackupHeaderProps) {
    return (
        <>
            <h2 className="backup-owner">{nick}</h2>
            <div title="yedek tarihi">📅<EntryDate date={backupDate} /></div>
            <hr />
        </>
    );
}