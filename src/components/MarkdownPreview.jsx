import { useState, useEffect } from 'react'
import { Marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import styles from './MarkdownPreview.module.css'

const marked = new Marked(
    markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'javascript'
            return hljs.highlight(code, { language }).value
        },
    })
)

marked.use({ breaks: true })

export default function MarkdownPreview() {
    const initialMarkdown = `
# Welcome to my Markdown Previewer!

## This is a sub-heading...
### And here's a deeper heading...

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
    }
}
\`\`\`

You can also make text **bold** or _italic_.
> Here's a blockquote from [Markdown Guide](https://www.markdownguide.org/cheat-sheet/):

You can even have some tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

And here's an ordered list:

1. First item
2. Second item
3. Third item

And here's an unordered list:

- First item
- Second item
- Third item

And here's a [link](https://www.freecodecamp.com) to a freeCodeCamp website.

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

    const [markdown, setMarkdown] = useState(initialMarkdown)
    const [html, setHtml] = useState('')

    useEffect(() => {
        setMarkdown(initialMarkdown)
        const html = marked.parse(initialMarkdown)
        setHtml(html)
    }, [])

    const handleChange = (e) => {
        setMarkdown(e.target.value)
        const html = marked.parse(e.target.value)
        setHtml(html)
    }

    return (
        <div className={styles.markdownPreview}>
            <div className={styles.editorContainer}>
                <textarea className={styles.editor} id="editor" value={markdown} onChange={handleChange} />
            </div>
            <div className={styles.previewContainer}>
                <div className={`${styles.preview} ${styles.markdown}`} id="preview" dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    )
}



