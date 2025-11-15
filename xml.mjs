import { parse } from "./eksitext-2024.mjs";
export function gi(id) {
    return document.getElementById(id);
}
const xmlMimeType = "text/xml";

/**
 * collect a list of nodes from the xml document based on given xpath
 * @param {XMLDocument} xml 
 * @param {string} xpath 
 * @returns {Node[]} node array
 */
function getNodes(xml, xpath) {
    let result = xml.evaluate(xpath, xml.documentElement);
    let node;
    let nodes = [];
    while (node = result.iterateNext()) {
        // we collect nodes beforehand because modifying
        // DOM invalidates search results
        nodes.push(node);
    }
    return nodes;
}

/**
 * parse the given XML backup text with markup, make it
 * displayable, and finally display its contents.
 * @param {string} xmlBody xml body
 * @param {Function} renderCallback callback function to render the backup data
 */
function displayXml(xmlBody, renderCallback) {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlBody, xmlMimeType);

    const backupNode = xml.documentElement;
    const nick = backupNode.getAttribute('nick');
    const backupDate = new Date(backupNode.getAttribute('backupdate'));

    // Process entries
    const entryNodes = getNodes(xml, "//entry");
    const entries = entryNodes.map(node => {
        const parsedContent = parseEksiMarkup(node.textContent);
        return {
            title: node.getAttribute('title'),
            id: node.getAttribute('id'),
            date: new Date(node.getAttribute('date')),
            parsedContent
        };
    });

    // Process drafts
    const draftNodes = getNodes(xml, "//draft");
    const drafts = draftNodes.map(node => {
        const parsedContent = parseEksiMarkup(node.textContent);
        return {
            title: node.getAttribute('title'),
            date: new Date(node.getAttribute('date')),
            parsedContent
        };
    });

    const backupData = {
        nick,
        backupDate,
        entries,
        drafts
    };

    gi("dropzone").classList.remove("expanded");
    gi("dropzone").classList.add("mini");
    
    renderCallback(backupData);
}

/**
 * parses eksi markup text into structured data
 * @param {string} text text content to parse
 * @returns {Array} parsed content array
 */
function parseEksiMarkup(text) {
    try {
        return parse(text);
    }
    catch (err) {
        console.error("couldn't parse entry text: %s", text, err);
        return [text]; // return as plain text if parsing fails
    }
}

export { displayXml };