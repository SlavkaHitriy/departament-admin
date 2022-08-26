export const addContent = (fullContent, setFullContent, newContent, _id) => {
    const tempContent = [...fullContent]

    for (let i = 0; i < tempContent.length; i++) {
        if (tempContent[i].id === _id)
            tempContent[i].content = {...newContent}
    }

    setFullContent([...tempContent])
}
