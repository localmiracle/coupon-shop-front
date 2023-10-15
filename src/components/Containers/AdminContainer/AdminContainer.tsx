import React, { FC } from 'react'
import styles from './AdminContainer.module.css'
import AdminHeader from '@/components/Blocks/Header/AdminHeader/AdminHeader'

interface AdminContainerProps{
    children: React.ReactNode
}

const AdminContainer:FC<AdminContainerProps> = ({children}) => {
  return (
    <>
        <header className={styles.header}>
            <AdminHeader />           
        </header>
            <div className={styles.container}>
                {children} 
            </div>
       
    </>
  )
}

export default AdminContainer