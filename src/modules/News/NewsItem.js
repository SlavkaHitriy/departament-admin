import React from 'react'
import { v4 as uuidv4 } from 'uuid'

// Styles
import styles from './index.module.scss'

// Images
import noImage from '../../assets/images/no-image.jpg'

// Store
import { NewsStore, NotificationsStore } from '../../store'

// Components
import { Actions } from '../../core/ui/Actions/Actions'

const NewsItem = ({data, getNews}) => {
    const deleteItem = async () => {
        NewsStore.deleteNew(data.id)

        await fetch(`${process.env.REACT_APP_API_HOST}/DeleteNewsId?id=${data.id}`, {
            method: 'DELETE',
        })

        const deletedID = uuidv4()

        NotificationsStore.addNotification(deletedID, 'success', 'Успішно видалено')
        NotificationsStore.removeNotification(3000, deletedID)

        getNews()
    }

    return (
        <div className={styles.newsItem}>
            <img className={styles.newsItemImg}
                 src={data.headerImageStorageUrl ? data.headerImageStorageUrl : noImage}
                 alt={data.imageName ? data.imageName : 'image'}
            />
            <div className={styles.newsItemContent}>
                <div className={styles.newsItemTitle}>
                    {data.title}
                </div>
                <div className={styles.newsItemDescription}>
                    {data.description ? data.description : 'Немає опису'}
                </div>
                <div className={styles.newsItemDate}>
                    {new Date(data.dateTime).getDate() > 9 ? new Date(data.dateTime).getDate() : '0' + new Date(data.dateTime).getDate()}.
                    {new Date(data.dateTime).getMonth() > 10 + 1 ? new Date(data.dateTime).getMonth() + 1 : '0' + (new Date(data.dateTime).getMonth() + 1)}.
                    {new Date(data.dateTime).getFullYear()}
                </div>
            </div>
            <Actions id={data.id} deleteItem={deleteItem} path={'new'} />
        </div>
    )
}

export default NewsItem
