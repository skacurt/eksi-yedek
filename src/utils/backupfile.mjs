import JSZip from 'jszip';

/**
 * processes the uploaded file list, and extracts
 * the zip, and later displays the XML.
 * @param {FileList} files 
 * @param {Function} onFileProcessed - Callback function to process the XML content
 * @param {Function} showError - Callback function to display error messages
 */
export function processFiles(files, onFileProcessed, showError) {
    if (files.length === 0) {
        return;
    }
    if (files.length > 1) {
        showError("tek dosya atınız pls ltf tşk");
        return;
    }
    const file = files[0];
    const ext = file.name.split('.').pop();
    
    if (ext === "zip") {
        JSZip.loadAsync(file)
            .then((zip) => {
                zip.forEach((relativePath, file) => {
                    if (relativePath.endsWith(".xml")) {
                        file.async("string")
                            .then((str) => onFileProcessed(str));
                    }
                });
            });
        return;
    }
    
    if (ext === "xml") {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onerror = () => {
            showError(`XML yüklemekten biçare şu gönül naçar, ne demiş karacaoğlan: ${reader.error}`);
        }
        reader.onload = () => {
            onFileProcessed(reader.result);
        };
        return;
    }
    
    showError("zip ya da xml lütfen");
    return;
}
