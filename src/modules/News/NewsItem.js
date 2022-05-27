import React, { useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Images
import noImage from '../../assets/images/no-image.jpg'
import { changeRoute } from '../../utils/changeRoute'

const NewsItem = ({data}) => {
    const [openedSettings, setOpenedSettings] = useState(false)

    return (
        <div
            className={styles.newsItem}
            onMouseEnter={() => setOpenedSettings(true)}
            onMouseLeave={() => setOpenedSettings(false)}
        >
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
                    {new Date(data.dateTime).getDate() > 10 ? new Date(data.dateTime).getDate() : '0' + new Date(data.dateTime).getDate()}.
                    {new Date(data.dateTime).getMonth() > 10 + 1 ? new Date(data.dateTime).getMonth() + 1 : '0' + (new Date(data.dateTime).getMonth() + 1)}.
                    {new Date(data.dateTime).getFullYear()}
                </div>
            </div>
            <div className={cn({
                [styles.newsItemActions]: true,
                [styles.newsItemActionsActive]: openedSettings,
            })}>
                <div className={styles.newsItemActionsInner}>
                    <Link
                        className={styles.newsItemActionsBtn}
                        to={`/new/${data.id}`}
                        onClick={() => changeRoute(`/new/${data.id}`, `Повна інформація про новину №${data.id}`)}
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='512' height='512' x='0' y='0'
                             viewBox='0 0 58.667 58.667'>
                            <path
                                d='M34.783,13.852c0-2.319-1.887-4.205-4.206-4.205s-4.204,1.886-4.204,4.205s1.886,4.205,4.205,4.205    C32.896,18.057,34.783,16.171,34.783,13.852z M28.373,13.852c0-1.216,0.989-2.205,2.205-2.205c1.216,0,2.206,0.989,2.206,2.205    c0,1.216-0.989,2.205-2.206,2.205C29.362,16.057,28.373,15.068,28.373,13.852z'
                                fill='#232323' data-original='#000000'/>
                            <path
                                d='M26.063,48.108c1.21,0.605,2.423,0.912,3.605,0.912c3.202,0,5.536-2.32,5.674-5.645c0.016-0.375-0.181-0.725-0.507-0.909    c-0.325-0.185-0.729-0.171-1.043,0.034c-0.213,0.141-0.776,0.43-1.151,0.43c-0.246,0-0.297-0.505-0.297-0.928    c0-0.988,1.41-7.534,2.276-11.342c0.106-0.328,2.543-8.057-2.171-10.414c-1.211-0.605-2.424-0.913-3.606-0.913    c-3.202,0-5.535,2.32-5.673,5.643c-0.016,0.375,0.181,0.725,0.507,0.91c0.325,0.185,0.729,0.17,1.043-0.035    c0.213-0.14,0.776-0.429,1.152-0.429c0.245,0,0.296,0.505,0.296,0.929c0,0.988-1.41,7.533-2.276,11.342    C23.785,38.021,21.348,45.75,26.063,48.108z M25.818,38.224c0.392-1.718,2.349-10.367,2.349-11.872    c0-2.718-1.757-2.929-2.296-2.929c-0.121,0-0.241,0.008-0.36,0.023c0.56-1.32,1.757-2.113,3.331-2.113    c0.856,0,1.794,0.243,2.711,0.702c3.133,1.566,1.184,7.945,1.139,8.094C32.3,31.848,30.343,40.495,30.343,42    c0,2.718,1.757,2.929,2.296,2.929c0.121,0,0.241-0.009,0.36-0.024c-0.56,1.321-1.757,2.114-3.332,2.114    c-0.856,0-1.793-0.243-2.71-0.7C23.825,44.752,25.774,38.372,25.818,38.224z'
                                fill='#232323' data-original='#000000'/>
                            <path
                                d='M40.578,14.946C40.225,15.11,40,15.464,40,15.852v7.166c0,0.292,0.128,0.57,0.352,0.76l7.109,6.074l-7.109,6.074    C40.128,36.116,40,36.394,40,36.686v7.166c0,0.389,0.225,0.742,0.578,0.906c0.135,0.062,0.279,0.094,0.422,0.094    c0.23,0,0.459-0.08,0.643-0.234l16.668-14c0.226-0.189,0.356-0.47,0.356-0.766s-0.131-0.576-0.356-0.766l-16.668-14    C41.346,14.837,40.93,14.781,40.578,14.946z M42,17.998l14.111,11.854L42,41.706v-4.559l7.648-6.535    C49.872,30.422,50,30.144,50,29.852s-0.128-0.57-0.352-0.76L42,22.557V17.998z'
                                fill='#232323' data-original='#000000'/>
                            <path
                                d='M18.667,23.018v-7.166c0-0.389-0.225-0.742-0.578-0.906c-0.352-0.165-0.767-0.109-1.065,0.141l-16.667,14    C0.131,29.277,0,29.557,0,29.853s0.131,0.576,0.357,0.767l16.667,14c0.184,0.153,0.412,0.233,0.643,0.233    c0.144,0,0.288-0.03,0.422-0.094c0.353-0.164,0.578-0.519,0.578-0.906v-7.166c0-0.292-0.128-0.569-0.351-0.76l-7.11-6.074    l7.11-6.074C18.539,23.588,18.667,23.31,18.667,23.018z M16.667,22.557l-7.649,6.535c-0.223,0.19-0.351,0.468-0.351,0.76    s0.128,0.57,0.351,0.76l7.649,6.535v4.559L2.555,29.852l14.112-11.854V22.557z'
                                fill='#232323' data-original='#000000'/>
                        </svg>
                        Повна інформація
                    </Link>
                    <Link className={styles.newsItemActionsBtn}
                          to={`/edit-new/${data.id}`}
                          onClick={() => changeRoute(`/edit-new/${data.id}`, `Редагування новини №${data.id}`)}
                    >
                        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='512' height='512' x='0' y='0'
                             viewBox='0 0 477.873 477.873'>
                            <path
                                d='M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2    c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067    S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2    c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z'
                                fill='#277efb' data-original='#000000'/>
                            <path
                                d='M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937    c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585    c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13    l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202    L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955    C443.754,73.631,440.467,81.575,434.603,87.419z'
                                fill='#277efb' data-original='#000000'/>
                        </svg>
                        Редагувати
                    </Link>
                    <button className={cn(styles.newsItemActionsBtn, styles.newsItemActionsBtnDelete)} type={'button'}>
                        <svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='512' height='512' x='0' y='0'
                             viewBox='0 0 24 24'
                        >
                            <path xmlns='http://www.w3.org/2000/svg'
                                  d='M19,7a1,1,0,0,0-1,1V19.191A1.92,1.92,0,0,1,15.99,21H8.01A1.92,1.92,0,0,1,6,19.191V8A1,1,0,0,0,4,8V19.191A3.918,3.918,0,0,0,8.01,23h7.98A3.918,3.918,0,0,0,20,19.191V8A1,1,0,0,0,19,7Z'
                                  fill='#f25858' data-original='#000000'/>
                            <path
                                xmlns='http://www.w3.org/2000/svg'
                                d='M20,4H16V2a1,1,0,0,0-1-1H9A1,1,0,0,0,8,2V4H4A1,1,0,0,0,4,6H20a1,1,0,0,0,0-2ZM10,4V3h4V4Z'
                                fill='#f25858' data-original='#000000'/>
                            <path
                                xmlns='http://www.w3.org/2000/svg' d='M11,17V10a1,1,0,0,0-2,0v7a1,1,0,0,0,2,0Z'
                                fill='#f25858' data-original='#000000'/>
                            <path
                                xmlns='http://www.w3.org/2000/svg' d='M15,17V10a1,1,0,0,0-2,0v7a1,1,0,0,0,2,0Z'
                                fill='#f25858' data-original='#000000'/>
                        </svg>
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsItem