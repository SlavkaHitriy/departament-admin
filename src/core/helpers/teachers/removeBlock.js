export const removeBlock = (fullContent, setFullContent, _id) => {
    const tempContent = [...fullContent]
    tempContent.splice(tempContent.findIndex(block => block.id === _id), 1)

    setFullContent([...tempContent])
}
