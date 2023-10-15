import React, { FC } from 'react'
import styles from './AdminHeader.module.css'

const AdminHeader:FC = () => {
  return (
    <>
        <div className={styles.info}>
            <h2>ShopSmart</h2>
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