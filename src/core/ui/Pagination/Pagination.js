import React from 'react'

// Styles
import styles from './index.module.scss'

// Components
import { PaginationItem } from './PaginationItem'

export const Pagination = ({info}) => {
    return (
        <div className={styles.pagination}>
            {
                info && (
                    <ul className={styles.paginationList}>
                        <PaginationItem
                            link={`/news/${info.pageNumber - 1}`}
                            prevArrow
                            disabled={info.pageNumber === 1}
                        />


                        {info.pageNumber === 3 && <PaginationItem link={`/news/1`}>1</PaginationItem>}
                        {
                            info.pageNumber > 3 && (<>
                                <PaginationItem link={`/news/1`}>1</PaginationItem>
                                <PaginationItem separator />
                            </>)
                        }

                        {
                            info.pageNumber > 1 && (
                                <PaginationItem link={`/news/${info.pageNumber - 1}`}>
                                    {info.pageNumber - 1}
                                </PaginationItem>
                            )
                        }
                        <PaginationItem link={`/news/${info.pageNumber}`} active>
                            {info.pageNumber}
                        </PaginationItem>
                        {
                            info.pageNumber < info.totalPages - 1 && (
                                <PaginationItem link={`/news/${info.pageNumber + 1}`}>
                                    {info.pageNumber + 1}
                                </PaginationItem>
                            )
                        }

                        {
                            info.pageNumber < info.totalPages - 2 && (<>
                                <PaginationItem separator />
                                <PaginationItem link={`/news/${info.totalPages}`}>
                                    {info.totalPages}
                                </PaginationItem>
                            </>)
                        }
                        {
                            info.pageNumber < info.totalPages && info.pageNumber > info.totalPages - 3 && (
                                <PaginationItem link={`/news/${info.totalPages}`}>
                                    {info.totalPages}
                                </PaginationItem>
                            )
                        }

                        <PaginationItem
                            link={`/news/${info.pageNumber + 1}`}
                            nextArrow
                            disabled={info.pageNumber === info.totalPages}
                        />
                    </ul>
                )
            }
        </div>
    )
}
