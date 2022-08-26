import { v4 as uuidv4 } from 'uuid'
import { NotificationsStore } from '../../../store'

export const addTeacher = async (fullContent, navigate, file, inputsData) => {
    const loadingID = uuidv4()
    const headerImageData = {}

    if (file) {
        NotificationsStore.addNotification(loadingID, 'loading', 'Додається викладач')

        const res = await fetch(`${process.env.REACT_APP_API_HOST}/UploadTeacherImage?IsHeaderImage=${true}`, {
            method: 'POST',
            body: file,
        })

        const data = await res.json()

        headerImageData.url = encodeURIComponent(data.file.url)
        headerImageData.imageName = data.file.imageName
    }

    const blocks = []

    fullContent.forEach(block => {
        blocks.push({name: block.name, content: JSON.stringify(block.content.blocks)})
    })

    const res = await fetch(`${process.env.REACT_APP_API_HOST}/InsertedTeacher?FirstName=${inputsData.inputFirstName.value}&SecondName=${inputsData.inputSecondName.value}&MiddleName=${inputsData.inputMiddleName.value}${headerImageData.url ? `&HeaderImageStorageUrl=${headerImageData.url}` : ''}${headerImageData.imageName ? `&HeaderImageName=${headerImageData.imageName}` : ''}`, {
        method: 'POST',
        body: JSON.stringify(blocks),
        headers: {
            'Content-Type': 'application/json-patch+json',
        }
    })

    if (res.status === 200) {
        const addedNewID = uuidv4()

        NotificationsStore.addNotification(addedNewID, 'success', 'Викладач успішно доданий')
        NotificationsStore.removeNotification(3000, addedNewID)

        navigate('/teachers')
    } else {
        const errorID = uuidv4()

        NotificationsStore.addNotification(errorID, 'error', 'Помилка додавання')
        NotificationsStore.removeNotification(3000, errorID)
    }

    if (file)
        NotificationsStore.removeNotification(0, loadingID)
}
