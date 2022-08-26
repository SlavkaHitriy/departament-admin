import { v4 as uuidv4 } from 'uuid'

export const addNewBlock = (fullContent, setFullContent) => {
    const tempContent = [...fullContent]
    tempContent.push({id: uuidv4()})

    setFullContent([...tempContent])
}
