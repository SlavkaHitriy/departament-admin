import React, { useState } from 'react'
import cn from 'classnames'
import { Link } from 'react-router-dom'

// Styles
import styles from './index.module.scss'

// Components
import { SvgSprite } from '../SvgSprite/SvgSprite'

export const Actions = ({id, deleteItem, path}) => {
    const [content, setContent] = useState('default')

    return (
        <div className={cn({
            [styles.actions]: true,
            [styles.actionsExpanded]: content === 'expanded',
            [styles.actionsDelete]: content === 'delete',
        })}>
            <div className={styles.actionsInner}>
                {
                    content === 'default' && (
                        <button
                            className={cn(styles.actionsBtn, styles.actionsBtnMore)}
                            type={'button'}
                            onClick={() => setContent('expanded')}
                        >
                            <span/>
                            <span/>
                            <span/>
                        </button>
                    )
                }
                {
                    content === 'expanded' && (<>
                        <Link
                            className={styles.actionsBtn}
                            to={`/${path}/${id}`}
                        >
                            <SvgSprite spriteID={'preview'} />
                        </Link>
                        <Link className={styles.actionsBtn}
                              to={`/edit-${path}/${id}`}
                        >
                            <SvgSprite spriteID={'edit'} />
                        </Link>
                        <button
                            className={cn(styles.actionsBtn, styles.actionsBtnRed)}
                            type={'button'}
                            onClick={() => setContent('delete')}
                        >
                            <SvgSprite spriteID={'delete'} />
                        </button>
                        <button
                            className={cn(styles.actionsBtn, styles.actionsBtnRed, styles.actionsBtnClose)}
                            type={'button'}
                            onClick={() => setContent('default')}
                        >
                            <SvgSprite spriteID={'error'} />
                        </button>
                    </>)
                }
                {
                    content === 'delete' && (<>
                        <button
                            className={cn(styles.actionsBtn)}
                            type={'button'}
                            onClick={deleteItem}
                        >
                            <SvgSprite spriteID={'check'} />
                        </button>
                        <button
                            className={cn(styles.actionsBtn, styles.actionsBtnRed, styles.actionsBtnClose)}
                            type={'button'}
                            onClick={() => setContent('expanded')}
                        >
                            <SvgSprite spriteID={'error'} />
                        </button>
                    </>)
                }
            </div>
        </div>
    )
}
