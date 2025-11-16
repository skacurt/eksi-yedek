import React, { useState } from 'react';
import { displayXml } from '../xml.mjs';
import { BackupReader } from './components/BackupReader';
import { DropZone } from './components/DropZone';
import { ErrorBoundary } from './components/ErrorBoundary';
import { version } from '../package.json';

export function App() {
    const [backupData, setBackupData] = useState<any>(null);

    const handleFileProcessed = (xmlBody: string) => {
        displayXml(xmlBody, setBackupData);
    };

    React.useEffect(() => {
        // Test mode
        if (location.search === "?test=1") {
            fetch("ssg.xml")
                .then(response => response.text())
                .then(text => {
                    displayXml(text, setBackupData);
                });
        }
    }, []);

    return (
        <>
            <header>
                <h1>ekşi sözlük</h1>
                <h2>yedek okuyucu şeysi - v{version}</h2>
            </header>
            <ErrorBoundary>
                <DropZone id="dropzone" onFileProcessed={handleFileProcessed} isMini={backupData !== null} />
            </ErrorBoundary>
            <div id="content">
                <ErrorBoundary>
                    <BackupReader backupData={backupData} />
                </ErrorBoundary>
            </div>
            <footer id="footer">
                <a href="https://github.com/ssg">ssg</a> · <a href="https://github.com/ssg/eksi-yedek">kaynak kodu</a>
                <br />
                <br />
                <small>(verileriniz tamamen kendi tarayıcınızda, istemci tarafında el değmeden işlenmektedir.
                    herhangi bir yere aktarılmamaktadır. doğrudan bilgisayarınızda çalıştırmak için tarayıcı
                    adres satırındaki "uygulamayı kur" seçeneğini kullanabilirsiniz. her şeyi düşündük olm her şeyi)</small>
                <br/>
                <br/>
                <small>© 2024-2025</small>
            </footer>
        </>
    );
}
