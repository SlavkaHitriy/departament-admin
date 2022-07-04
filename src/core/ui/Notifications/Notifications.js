import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react-lite'

// Styles
import styles from './index.module.scss'

// Store
import {NotificationsStore} from '../../../store'

// Images
import loader from '../../../assets/images/loader.gif'
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const Notifications = observer(() => {
    return NotificationsStore.notifications.length > 0 ? (
        <div className={styles.notifications}>
            {
                NotificationsStore.notifications.map(notificationItem => (
                    <div className={cn({
                        [styles.notificationsItem]: true,
                        [styles.notificationsItemLoading]: notificationItem.type === 'loading',
                        [styles.notificationsItemGreen]: notificationItem.type === 'success',
                        [styles.notificationsItemRed]: notificationItem.type ===  'error',
                    })} key={notificationItem.id}>
                        <span className={styles.notificationsItemIcon}>
                            {
                                notificationItem.type === 'loading' && <img src={loader} alt='loader'/>
                            }
                            {
                                notificationItem.type === 'success' && <SvgSprite spriteID={'success'} />
                            }
                            {
                                notificationItem.type === 'error' && (
                                    <SvgSprite
                                        className={styles.notificationsIconError}
                                        spriteID={'error'}
                                    />
                                )
                            }
                        </span>
                        {notificationItem.text}
                    </div>
                ))
            }
        </div>
    ) : null
})
