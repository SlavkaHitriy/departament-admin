import React, { useEffect, useRef, useState } from 'react'

// Editor Plugin
import EditorJS from '@editorjs/editorjs'
import { EDITOR_HOLDER_ID } from '../../initData/editorInitData'
import EditorList from '@editorjs/list'
import EditorLink from '@editorjs/link'
import EditorImage from '@editorjs/image'
import EditorHeader from '@editorjs/header'
import EditorWarning from '@editorjs/warning'

// Styles
import styles from './index.module.scss'

export const RichTextEditor = ({label}) => {
    const ejInstance = useRef()
    const [editorData, setEditorData] = useState({})

    const initEditor = () => {
        const editor = new EditorJS({
            holder: EDITOR_HOLDER_ID,
            logLevel: 'ERROR',
            data: editorData,
            onReady: () => {
                ejInstance.current = editor
            },
            onChange: async () => {
                let content = await editor.saver.save()

                setEditorData(content)
            },
            autofocus: true,
            tools: {
                list: EditorList,
                link: EditorLink,
                header: EditorHeader,
                warning: EditorWarning,
                image: {
                    class: EditorImage,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:5000/InsertedNews', // Your backend file uploader endpoint
                        }
                    }
                },
            },
        })
    }

    useEffect(() => {
        console.log('Editor Data', editorData)
    }, [editorData])

    useEffect(() => {
        if (!ejInstance.current) {
            initEditor()
        }

        return () => {
            ejInstance.current = null
        }
    }, [])

    return (
        <div className={styles.editor}>
            <label className={styles.editorLabel} htmlFor={EDITOR_HOLDER_ID}>{label}</label>
            <div className={styles.editorContent} ref={ejInstance} id={EDITOR_HOLDER_ID}>

            </div>
        </div>
    )
}
