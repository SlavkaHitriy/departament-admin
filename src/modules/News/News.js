import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Images
import loader from '../../assets/images/loader.gif'

// Store
import { NewsStore } from '../../store'

// Components
import NewsItem from './NewsItem'
import { PageWrapper } from '../../core/ui/PageWrapper'
import { Pagination } from '../../core/ui/Pagination'

export const News = observer(() => {
    const pageSize = 12
    const {page} = useParams()

    const [paginationInfo, setPaginationInfo] = useState()
    const [loadingData, setLoadingData] = useState(true)

    const getNews = async () => {
        try {
            const response = await fetch(`http://localhost:5000/PagedNews?page=${page}&PageSize=${pageSize}`)
            const news = await response.json()
            setLoadingData(false)

            console.log(news)
            NewsStore.setNews(news.itemsAtPage)
            setPaginationInfo({
                pageNumber: news.pageNumber,
                totalPages: news.totalPages,
                hasPreviousPage: news.hasPreviousPage,
                hasNextPage: news.hasNextPage,
            })
        } catch {
            setLoadingData(false)
        }
    }

    useEffect(() => {
        getNews()
    }, [page])

    return (
        <PageWrapper title={'Новини'} addNew>
            {
                loadingData ? <img src={loader} alt='loader'/> : (
                    NewsStore.news.length > 0 ? (
                        <div className={styles.news}>
                            {
                                NewsStore.news.map(newsItem => (
                                    <NewsItem data={newsItem} key={newsItem.id} getNews={getNews}/>
                                ))
                            }
                        </div>
                    ) : (
                        <div className={styles.newsNoItems}>
                            -- немає новин --
                        </div>
                    )
                )
            }
            {
                paginationInfo?.totalPages > 1 && <Pagination info={paginationInfo} />
            }
        </PageWrapper>
    )
})
