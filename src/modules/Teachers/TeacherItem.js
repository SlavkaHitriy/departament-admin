import React from 'react'
import { v4 as uuidv4 } from 'uuid'

// Styles
import styles from './index.module.scss'

// Images
import noImage from '../../assets/images/no-image.jpg'

// Store
import { TeachersStore, NotificationsStore } from '../../store'

// Components
import { Actions } from '../../core/ui/Actions/Actions'

export const TeacherItem = ({data}) => {
    const deleteItem = async () => {
        TeachersStore.deleteTeacher(data.id)

        await fetch(`${process.env.REACT_APP_API_HOST}/DeleteTeacherId?id=${data.id}`, {
            method: 'DELETE',
        })

        const deletedID = uuidv4()

        NotificationsStore.addNotification(deletedID, 'success', 'Успішно видалено')
        NotificationsStore.removeNotification(3000, deletedID)
    }

    return (
        <div className={styles.teachersItem}>
            <img className={styles.teachersItemImg}
                 src={data.headerImageStorageUrl ? data.headerImageStorageUrl : noImage}
                 alt={data.imageName ? data.imageName : 'image'}
            />
            <div className={styles.teachersItemInfo}>
                {data.firstName} {data.secondName} {data.middleName}
            </div>
            <Actions deleteItem={deleteItem} id={data.id} path={'teacher'} />
        </div>
    )
}
