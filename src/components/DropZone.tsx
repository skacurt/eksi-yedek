import { useState, useRef } from 'react'
import { processFiles } from '../utils/backupfile.mjs'

interface DropZoneProps {
    id: string
    onFileProcessed: (xmlBody: string) => void
    isMini: boolean
}

export function DropZone({ id, onFileProcessed, isMini }: DropZoneProps) {
    const [isActive, setIsActive] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const showError = (message: string) => {
        setErrorMessage(`⚠️ ${message}`)
        setTimeout(() => setIsActive(false), 500)
        console.debug("showing error: %s", message)
    }

    const handleDrop = (ev: React.DragEvent<HTMLLabelElement>) => {
        console.debug("drop")
        ev.preventDefault()
        setIsActive(true)
        
        const dt = ev.dataTransfer
        if (dt !== null) {
            processFiles(dt.files, onFileProcessed, showError)
        }
    }

    const handleDragOver = (ev: React.DragEvent<HTMLLabelElement>) => {
        ev.preventDefault()
    }

    const handleDragEnter = (ev: React.DragEvent<HTMLLabelElement>) => {
        console.debug("dragenter")
        setIsActive(true)
    }

    const handleDragLeave = (ev: React.DragEvent<HTMLLabelElement>) => {
        console.debug("dragleave")
        setIsActive(false)
    }

    const handleFileInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (ev.target.files) {
            processFiles(ev.target.files, onFileProcessed, showError)
        }
    }

    function handleButtonClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault()
        fileInputRef.current?.click()
    }

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
                    <br/>
                    <br/>
                    <button onClick={handleButtonClick}>yok illa buraya basıcam</button>
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
    )
}
