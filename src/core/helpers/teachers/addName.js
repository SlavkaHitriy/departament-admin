export const addName = (fullContent, setFullContent, newName, _id) => {
    const tempContent = [...fullContent]

    for (let i = 0; i < tempContent.length; i++) {
        if (tempContent[i].id === _id)
            tempContent[i].name = newName.target.value
    }

    setFullContent([...tempContent])
}
