import React from 'react'
import styles from './UserHeader.module.css'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Link from 'next/link';
import Logo from '../HomeHeader/HomeHeaderElements/Logo/Logo';

const LoginHeader = () => {
  return (
    <header className={styles.header}>
        <div className={styles.header__container}>
          <div className={styles.header__nav}>
            <Link href={'/'}><KeyboardArrowLeftIcon /></Link>
            <h1>Личный кабинет</h1>
          </div>
          <Logo />
          {/* <Link href={'/'}><h1 style={{color: '#EB5E28'}}>ShopSmart</h1></Link> */}
        </div>
    </header>
  )
}

export default LoginHeader