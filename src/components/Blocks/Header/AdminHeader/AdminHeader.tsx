import React, { FC } from 'react'
import styles from './AdminHeader.module.css'
import Logo from '../HomeHeader/HomeHeaderElements/Logo/Logo'

const AdminHeader:FC = () => {
  
  return (
    <>
        <div className={styles.info}>
            <Logo />
            <div>
                <h2>
                    Администратор
                </h2>
            </div>
        </div>
    </>
  )
}

export default AdminHeader