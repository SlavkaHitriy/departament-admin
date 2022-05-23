import React from 'react'

// Images
import logoVntu from '../../assets/images/logoVntu.svg'
import logoOt from '../../assets/images/logoOt.svg'
import searchBtn from '../../assets/images/searchBtn.svg'
import flag from '../../assets/images/flag.svg'
import email from '../../assets/images/email.svg'

// Styles
import style from './index.module.scss'

const Header = () => {
    return (
        <header>
            <div className={style.container}>
                <div className={style.headerFirst}>
                    <div className={style.headerLogo}>
                        <div className={style.headerLogoVntu}>
                            <img src={logoVntu}/>
                        </div>
                        <div className={style.headerLogoOt}>
                            <img src={logoOt}/>
                        </div>
                    </div>
                    <div className={style.headerSearch}>
                        <form>
                            <input type='search' name='name' placeholder='Пошук...'/>
                            <button type='submit'><img src={searchBtn}/></button>
                        </form>
                    </div>
                    <div className={style.headerLanguage}>
                        <select>
                            <option>Українська</option>
                            <option>English</option>
                        </select>
                        <img src={flag} className={style.headerFlag}/>
                    </div>
                    <div className={style.headerEmail}>
                        <img src={email}/>
                        <div>ot.vntu@gmail.com</div>
                    </div>
                    <div className={style.headerMenu}>
                        <div className={style.textMenu}>Mеню</div>
                        <div className={style.menuBtn}>
                            <div className={style.burgerBtn}>
                                <span/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header
