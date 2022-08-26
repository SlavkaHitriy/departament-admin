import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

// Styles
import styles from './index.module.scss'

// Images
import loader from '../../assets/images/loader.gif'

// Schemas
import { GET_NEW_BY_ID } from '../../schemas/getNewByID'

// Store
import { NotificationsStore } from '../../store'

// Components
import { PageWrapper } from '../../core/ui/PageWrapper'
import { Input } from '../../core/ui/Input'
import { UploadFile } from '../../core/ui/UploadFile'
import { Btn } from '../../core/ui/Btn'
import { Form } from '../../core/ui/Form'
import { useInput } from '../../core/hooks/useInput'
import { checkErrors } from '../../core/functions/checkErrors'
import { RichTextEditor } from '../../core/ui/RichTextEditor'

export const EditNew = () => {
    const navigate = useNavigate()

    const {id} = useParams()
    const [newInfo, setNewInfo] = useState()
    const {data, loading, error} = useQuery(GET_NEW_BY_ID, {
        variables: {
            id: +id,
        },
        fetchPolicy: 'no-cache',
    })

    const inputName = useInput('')
    const inputDesc = useInput('')
    const [fullDescContent, setFullDescContent] = useState({})
    const [haveInitPicture, setHaveInitPicture] = useState(false)
    const [file, setFile] = useState()

    const [errors, setErrors] = useState({})
    const [editingNew, setEditingNew] = useState(false)

    useEffect(() => {
        if (data) {
            setNewInfo(data.news[0])
            inputName.setNewValue(data.news[0].title)
            inputDesc.setNewValue(data.news[0].description)
            setFullDescContent({blocks: JSON.parse(data.news[0].content)})

            if (data.news[0].headerImageStorageUrl)
                setHaveInitPicture(true)
        }
    }, [data])

    const editNew = async () => {
        const loadingID = uuidv4()
        const headerImageData = {}

        if (file) {
            NotificationsStore.addNotification(loadingID, 'loading', 'Збереження змін')

            const res = await fetch(`${process.env.REACT_APP_API_HOST}/UploadNewsImage?IsHeaderImage=${true}`, {
                method: 'POST',
                body: file,
            })

            const data = await res.json()

            headerImageData.url = encodeURIComponent(data.file.url)
            headerImageData.imageName = data.file.imageName
        }

        const res = await fetch(`${process.env.REACT_APP_API_HOST}/EditedNews?id=${id}&title=${inputName.value}&description=${inputDesc.value}&content=${encodeURIComponent(JSON.stringify(fullDescContent.blocks))}&deletePicture=${(!file && !haveInitPicture) && true}${headerImageData.url ? `&HeaderImageStorageUrl=${headerImageData.url}` : ''}${headerImageData.imageName ? `&HeaderImageName=${headerImageData.imageName}` : ''}`, {
            method: 'PUT',
            body: file,
        })

        if (res.status === 200) {
            const addedNewID = uuidv4()

            navigate('/news')

            NotificationsStore.addNotification(addedNewID, 'success', 'Новина успішно змінена')
            NotificationsStore.removeNotification(3000, addedNewID)
        } else {
            const errorID = uuidv4()

            NotificationsStore.addNotification(errorID, 'error', 'Помилка редагування')
            NotificationsStore.removeNotification(3000, errorID)
        }

        if (file)
            NotificationsStore.removeNotification(0, loadingID)
    }

    const checkInputs = async () => {
        const inputsInfo = [
            {el: inputName, errorName: 'newName', errorText: 'Введіть назву новини'},
            {el: inputDesc, errorName: 'shortDesc', errorText: 'Введіть короткий опис'},
            {el: fullDescContent, object: true, errorName: 'fullDesc', errorText: 'Введіть опис'},
        ]

        if (checkErrors(setErrors, inputsInfo)) return

        setEditingNew(true)
        await editNew()
        setEditingNew(false)
    }

    if (error) return <p>Error: {error}</p>

    return (
        <PageWrapper title={`Редагування новини №${id}`}>
            <div className={styles.editNew}>
                {
                    loading ? <img src={loader} alt='loader'/> : newInfo && (
                        <Form className={styles.editNewForm} onSubmit={checkInputs}>
                            <Input type={'text'} label={'Назва новини'} id={'newName'} {...inputName} error={errors.newName}/>
                            <Input type={'text'} label={'Короткий опис'} id={'shortDesc'} {...inputDesc}
                                   error={errors.shortDesc}/>
                            <RichTextEditor label={'Детальний опис'} error={errors.fullDesc} initData={{blocks: JSON.parse(newInfo.content)}}
                                            setContent={setFullDescContent}/>
                            <UploadFile
                                className={styles.editNewUpload}
                                label={'Прикріпити фото'}
                                setFile={setFile}
                                initSrc={newInfo.headerImageStorageUrl}
                                setHaveInitPicture={setHaveInitPicture}
                            />
                            <div className={styles.editNewActions}>
                                <Btn
                                    className={styles.editNewActionsBtn}
                                    type={'button'}
                                    onClick={() => navigate('/news')}
                                    red
                                    disable={editingNew}
                                >
                                    Відмінити
                                </Btn>
                                <Btn className={styles.editNewActionsBtn} type={'submit'} disable={editingNew}>
                                    Зберегти
                                </Btn>
                            </div>
                        </Form>
                    )
                }
            </div>
        </PageWrapper>
    )
}
