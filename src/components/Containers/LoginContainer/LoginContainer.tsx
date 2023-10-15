import React, {  FC } from 'react'
import styles from './LoginContainer.module.css'


interface LoginContainerProps{
    children: React.ReactNode;
}

const LoginContainer:FC<LoginContainerProps> = ({children}) => {
  return (
    <div className={styles.container}>

        {children}
      
    </div>
  )
}

export default LoginContainer