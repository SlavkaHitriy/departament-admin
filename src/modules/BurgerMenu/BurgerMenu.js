import React from 'react'

// Styles
import style from './index.module.scss'



const BurgerMenu = ({items}) => {
   return (
      <div className={style.menu}>
         <div className={style.menuContent}>
            <ul>
               {items.map(item =>
                  <li>
                     <a href={item.href}>{item.value}</a>
                  </li>
               )}
            </ul>
         </div>
      </div>
   )
}