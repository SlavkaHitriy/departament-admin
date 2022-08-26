import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { v4 as uuidv4 } from 'uuid'

// Editor Plugin
import EditorJS from '@editorjs/editorjs'
import EditorList from '@editorjs/list'
import EditorImage from '@editorjs/image'
import EditorHeader from '@editorjs/header'
import EditorWarning from '@editorjs/warning'
import EditorHyperLink from 'editorjs-hyperlink'

// Styles
import styles from './index.module.scss'

export const RichTextEditor = ({className, label, setContent, error, initData}) => {
    const [editorID, setEditorID] = useState(uuidv4())
    const [editorClass, setEditorClass] = useState()

    const ejInstance = useRef()
    const [editorData, setEditorData] = useState(initData ? initData : {})

    const [addedImagesNames, setAddedImagesNames] = useState([])
    const [imagesToDelete, setImagesToDelete] = useState([])

    const removeImage = id => {
        const imageName = addedImagesNames.find(image => image.blockID === id).imageName

        fetch(`${process.env.REACT_APP_API_HOST}/DeleteNewsImage?imageName=${imageName}`, {
            method: 'POST',
        })
    }

    const initEditor = () => {
        const editor = new EditorJS({
            holder: editorID,
            logLevel: 'ERROR',
            data: initData ? initData : editorData,
            onReady: () => {
                ejInstance.current = editor
            },
            onChange: async (api, event) => {
                const content = await editor.saver.save()

                if (event.type === 'block-changed' && event.detail.target.name === 'image') {
                    const currentBlock = content.blocks.find(block => block.id === event.detail.target.id)

                    if (currentBlock) {
                        setAddedImagesNames([...imagesToDelete, {
                            blockID: currentBlock.id,
                            imageName: currentBlock.data.file.imageName
                        }])
                    }
                }

                if (event.type === 'block-removed' && event.detail.target.name === 'image') {
                    setEditorData({
                        eventType: event.type,
                        imageToDeleteID: event.detail.target.id,
                        blocks: content.blocks,
                    })
                } else {
                    setEditorData({eventType: event.type, blocks: content.blocks})
                }
            },
            tools: {
                list: EditorList,
                hyperLink: {
                    class: EditorHyperLink,
                    config: {
                        target: '_blank',
                        rel: 'noreferrer',
                        availableTargets: [],
                        availableRels: [],
                        validate: false,
                    }
                },
                header: EditorHeader,
                warning: EditorWarning,
                image: {
                    class: EditorImage,
                    config: {
                        uploader: {
                            async uploadByFile(file) {
                                const fileData = new FormData()

                                if (file)
                                    fileData.append('ImageFile', file)

                                const res = await fetch(`${process.env.REACT_APP_API_HOST}/UploadNewsImage?IsHeaderImage=${false}`, {
                                    method: 'POST',
                                    body: fileData,
                                })

                                return res.json()
                            }
                        }
                    }
                },
            },
            minHeight: 0,
        })
        setEditorClass(editor)
    }

    useEffect(() => {
        if (editorData.eventType === 'block-removed' && editorData.imageToDeleteID)
            removeImage(editorData.imageToDeleteID)

        if (editorData?.blocks?.length === 0) setContent({})
        else setContent(editorData)
    }, [editorData])

    useEffect(() => {
        if (initData) {
            const tempImagesNames = []

            initData.blocks.forEach(block => {
                if (block.type === 'image')
                    tempImagesNames.push({imageName: block.data.file.imageName, blockID: block.id})
            })

            setAddedImagesNames([...tempImagesNames])
        }
    }, [initData])

    useEffect(() => {
        if (!ejInstance.current) {
            initEditor()
        }

        return () => {
            if (editorClass)
                editorClass.destroy()

            ejInstance.current = null
        }
    }, [ejInstance])

    return (
        <div className={cn(styles.editor, {
            [className]: className,
        })}>
            <label className={styles.editorLabel} htmlFor={editorID}>{label}</label>
            <div className={cn({
                [styles.editorContent]: true,
                [styles.editorContentError]: error,
            })} ref={ejInstance} id={editorID}/>
            {error && <span className={styles.editorError}>{error}</span>}
        </div>
    )
}
