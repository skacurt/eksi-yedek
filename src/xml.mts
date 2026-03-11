import { parse } from "../eksitext-2024.mjs"

const xmlMimeType = "text/xml"

export interface ParsedContent {
    type: string
    [key: string]: any
}

export interface BackupEntry {
    title: string
    id: number
    date: Date
    parsedContent: ParsedContent[]
}

export interface BackupDraft {
    title: string
    date: Date
    parsedContent: ParsedContent[]
}

export interface BackupData {
    nick: string
    backupDate: Date
    entries: BackupEntry[]
    drafts: BackupDraft[]
}

export type RenderCallback = (backupData: BackupData) => void

/**
 * collect a list of nodes from the xml document based on given xpath
 * @param xml XML document
 * @param xpath XPath query string
 * @returns node array
 */
function getNodes(xml: XMLDocument, xpath: string): Node[] {
    const result = xml.evaluate(xpath, xml.documentElement)
    let node: Node | null
    const nodes: Node[] = []
    while ((node = result.iterateNext())) {
        // we collect nodes beforehand because modifying
        // DOM invalidates search results
        nodes.push(node)
    }
    return nodes
}

/**
 * parse the given XML backup text with markup, make it
 * displayable, and finally display its contents.
 * @param xmlBody xml body
 * @param renderCallback callback function to render the backup data
 */
export function displayXml(xmlBody: string, renderCallback: RenderCallback): void {
    const parser = new DOMParser()
    const xml = parser.parseFromString(xmlBody, xmlMimeType)

    const backupNode = xml.documentElement
    const nick = backupNode.getAttribute('nick')!
    const backupDate = new Date(backupNode.getAttribute('backupdate')!)

    // Process entries
    const entryNodes = getNodes(xml, "//entry")
    const entries: BackupEntry[] = entryNodes.map(node => {
        const element = node as Element
        const parsedContent = parseEksiMarkup(element.textContent!)
        return {
            title: element.getAttribute('title')!,
            id: Number(element.getAttribute('id')),
            date: new Date(element.getAttribute('date')!),
            parsedContent
        }
    })

    // Process drafts
    const draftNodes = getNodes(xml, "//draft")
    const drafts: BackupDraft[] = draftNodes.map(node => {
        const element = node as Element
        const parsedContent = parseEksiMarkup(element.textContent!)
        const dateStr = element.getAttribute('date')!
        const title = element.getAttribute('title')!
        return {
            title: title,
            date: new Date(dateStr),
            parsedContent
        }
    })

    const backupData: BackupData = {
        nick,
        backupDate,
        entries,
        drafts
    }
    
    renderCallback(backupData)
}

/**
 * parses eksi markup text into structured data
 * @param text text content to parse
 * @returns parsed content array
 */
function parseEksiMarkup(text: string): ParsedContent[] {
    try {
        return parse(text) as ParsedContent[]
    }
    catch (err) {
        console.error("couldn't parse entry text: %s", text, err)
        return [{ type: 'raw_text', text: text }] // return as plain text if parsing fails
    }
}