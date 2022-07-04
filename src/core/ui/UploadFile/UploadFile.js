import React, { useEffect, useState } from 'react'
import cn from 'classnames'

// Styles
import styles from './index.module.scss'

// Images
import remove from '../../../assets/images/remove.svg'

export const UploadFile = ({label, setFile, className, initSrc, setHaveInitPicture}) => {
    const [src, setSrc] = useState(initSrc)

    const handleUpload = e => {
        const fileData = new FormData()

        if (e.target.files.length > 0) {
            fileData.append('ImageFile', e.target.files[0])
            setSrc(URL.createObjectURL(e.target.files[0]))
            setFile(fileData)
        }
    }

    const removeImage = () => {
        setSrc('')
        setFile()

        if (setHaveInitPicture)
            setHaveInitPicture(false)
    }

    return (
        <div className={cn({
            [styles.upload]: true,
            [className]: className,
        })}>
            <div className={styles.uploadTitle}>{label}</div>
            <div className={styles.uploadInner}>
                <label className={styles.uploadWrapper}>
                    <div>Завантажити</div>
                    <input className={styles.uploadInp} type='file' onChange={handleUpload}
                           accept='image/png, image/jpeg'/>
                </label>
                {
                    src && (
                        <button className={styles.uploadRemove} type={'button'} onClick={removeImage}>
                            <img src={remove} alt='remove'/>
                        </button>
                    )
                }
            </div>
            {src && <img className={styles.uploadPreview} src={src} alt='preview'/>}
        </div>
    )
}
