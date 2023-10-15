import { NextPage } from 'next';
import React, { FC } from 'react'
import styles from './HomeContainer.module.css'

interface HomeContainerProps {
    children: React.ReactNode;
}

const HomeContainer:FC<HomeContainerProps> = ({children}) => {
  return (
    <div className={styles.container}>
        {children}
    </div>
  )
}

export default HomeContainer  