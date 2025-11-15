import { useState, useRef } from 'react';
import { processFiles } from '../utils/backupfile.mjs';

export function DropZone({ id, onFileProcessed, isMini }) {
    const [isActive, setIsActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef(null);

    const showError = (message) => {
        setErrorMessage(`⚠️ ${message}`);
        setTimeout(() => setIsActive(false), 500);
        console.debug("showing error: %s", message);
    };

    const handleDrop = (ev) => {
        console.debug("drop");
        ev.preventDefault();
        setIsActive(true);
        
        const dt = ev.dataTransfer;
        if (dt !== null) {
            processFiles(dt.files, onFileProcessed, showError);
        }
    };

    const handleDragOver = (ev) => {
        ev.preventDefault();
    };

    const handleDragEnter = (ev) => {
        console.debug("dragenter");
        setIsActive(true);
    };

    const handleDragLeave = (ev) => {
        console.debug("dragleave");
        setIsActive(false);
    };

    const handleFileInputChange = (ev) => {
        processFiles(ev.target.files, onFileProcessed, showError);
    };

    return (
        <>
            <label 
                id={id} 
                className={`dropzone ${isMini ? 'mini' : 'expanded'} ${isActive ? 'active' : ''}`}
                htmlFor="fileinput"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
            >
                <div id="instruction">
                    sözlük yedek ZIP ya da XML dosyanızı bu alana sürükleyip bırakın.
                    olmadı buralara bi yerlere dokunun.
                    <input 
                        id="fileinput" 
                        type="file" 
                        ref={fileInputRef}
                        onChange={handleFileInputChange}
                    />
                    <br /><br />
                </div>
                <div id="error">{errorMessage}</div>
            </label>
        </>
    );
}