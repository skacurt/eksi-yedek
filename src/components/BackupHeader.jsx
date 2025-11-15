import React from 'react';
import { EntryDate } from './EntryDate';

export function BackupHeader({ nick, backupDate }) {
    return (
        <>
            <h2 className="backup-owner">{nick}</h2>
            <div title="yedek tarihi">📅<EntryDate date={backupDate} /></div>
            <hr />
        </>
    );
}
