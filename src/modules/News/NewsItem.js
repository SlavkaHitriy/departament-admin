import React from 'react'

// Styles
import styles from './index.module.scss'

// Images
import noImage from '../../assets/images/no-image.jpg'

// Components
import { NewsActions } from './NewsActions'

const NewsItem = ({data, getNews}) => {
    return (
        <div className={styles.newsItem}>
            <img className={styles.newsItemImg}
                 src={data.imageStorageUrl ? data.imageStorageUrl : noImage}
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
            <NewsActions data={data} getNews={getNews} />
        </div>
    )
}

export default NewsItem
