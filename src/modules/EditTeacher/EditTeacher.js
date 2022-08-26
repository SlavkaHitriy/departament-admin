import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'

// Styles
import styles from './index.module.scss'

// Hooks
import { useInput } from '../../core/hooks/useInput'

// Schemas
import { GET_TEACHER_BY_ID } from '../../schemas/getTeacherByID'

// Helpers
import { checkInputs } from '../../core/helpers/teachers/checkInputs'
import { addTeacher } from '../../core/helpers/teachers/addTeacher'
import { addContent } from '../../core/helpers/teachers/addContent'
import { addName } from '../../core/helpers/teachers/addName'
import { removeBlock } from '../../core/helpers/teachers/removeBlock'
import { addNewBlock } from '../../core/helpers/teachers/addNewBlock'

// Components
import { PageWrapper } from '../../core/ui/PageWrapper'
import { Input } from '../../core/ui/Input'
import { UploadFile } from '../../core/ui/UploadFile'
import { Btn } from '../../core/ui/Btn'
import { Form } from '../../core/ui/Form'
import { RichTextEditor } from '../../core/ui/RichTextEditor'

export const EditTeacher = () => {
    const navigate = useNavigate()

    const {id} = useParams()
    const [teacherInfo, setTeacherInfo] = useState()
    const {data, loading, error} = useQuery(GET_TEACHER_BY_ID, {
        variables: {
            id: +id,
        },
        fetchPolicy: 'no-cache',
    })

    const inputFirstName = useInput('')
    const inputSecondName = useInput('')
    const inputMiddleName = useInput('')
    const [fullContent, setFullContent] = useState([{id: uuidv4()}])
    const [file, setFile] = useState()
    const [haveInitPicture, setHaveInitPicture] = useState(false)

    const [errors, setErrors] = useState({})
    const [editingTeacher, setEditingTeacher] = useState(false)
    const [disabledAddBtn, setDisabledAddBtn] = useState(true)

    const checkErrors = async () => {
        if (await checkInputs(fullContent, {
            inputFirstName,
            inputSecondName,
            inputMiddleName,
        }, setErrors)) return

        setEditingTeacher(true)
        await addTeacher(fullContent, navigate, file, {
            inputFirstName,
            inputSecondName,
            inputMiddleName,
        })
        setEditingTeacher(false)
    }

    useEffect(() => {
        if (data) {
            console.log(data)
            setTeacherInfo(data.teachers[0])
            inputFirstName.setNewValue(data.teachers[0].firstName)
            inputSecondName.setNewValue(data.teachers[0].secondName)
            inputMiddleName.setNewValue(data.teachers[0].middleName)
            setFullContent([...data.teachers[0].blocks])

            if (data.teachers[0].headerImageStorageUrl)
                setHaveInitPicture(true)
        }
    }, [data])

    if (error) return <p>Error: {error}</p>

    return (
        <PageWrapper title={`Редагувати викладача ${inputFirstName.value} ${inputSecondName.value} ${inputMiddleName.value}`}>
            <div className={styles.editTeacher}>
                <Form className={styles.editTeacherForm} onSubmit={checkErrors}>
                    <Input type={'text'} label={'Ім\'я'} id={'firstName'} {...inputFirstName} error={errors.firstName}/>
                    <Input type={'text'} label={'Прізвище'} id={'secondName'} {...inputSecondName}
                           error={errors.secondName}/>
                    <Input type={'text'} label={'По батькові'} id={'middleName'} {...inputMiddleName}
                           error={errors.middleName}/>
                    <div className={styles.editTeacherBlocks}>
                        {
                            fullContent.map(content => content.id && (
                                <div className={styles.editTeacherBox} key={content.id}>
                                    <Input
                                        type={'text'}
                                        label={'Назва блоку інформації'}
                                        id={`blockName${content.id}`}
                                        value={content.name ? content.name : ''}
                                        onChange={e => addName(fullContent, setFullContent, e, content.id)}
                                        error={errors[`contentName${content.id}`]}
                                    />
                                    <RichTextEditor
                                        className={styles.editTeacherContent}
                                        label={'Опис блоку інформації'}
                                        error={errors[`content${content.id}`]}
                                        setContent={newContent => addContent(fullContent, setFullContent, newContent, content.id)}
                                    />
                                    {
                                        fullContent.length !== 1 && (
                                            <Btn className={styles.editTeacherBoxDelete}
                                                 onClick={() => removeBlock(fullContent, setFullContent, content.id)}
                                                 type={'button'} red>
                                                -
                                            </Btn>
                                        )
                                    }
                                </div>
                            ))
                        }
                        <Btn className={styles.editTeacherNewBlock} disable={disabledAddBtn} onClick={() => addNewBlock(fullContent, setFullContent)}
                             type={'button'}>
                            +
                        </Btn>
                    </div>
                    <UploadFile className={styles.editTeacherUpload} label={'Прикріпити фото'} setFile={setFile}/>
                    <div className={styles.editTeacherActions}>
                        <Btn
                            className={styles.editTeacherActionsBtn}
                            type={'button'}
                            onClick={() => navigate('/teachers')}
                            red
                            disable={editingTeacher}
                        >
                            Відмінити
                        </Btn>
                        <Btn className={styles.editTeacherActionsBtn} type={'submit'} disable={editingTeacher}>
                            Редагувати
                        </Btn>
                    </div>
                </Form>
            </div>
        </PageWrapper>
    )
}
