import React, { FC } from 'react'
import styles from './UserContainer.module.css'
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import Head from 'next/head';

interface UserContainerProps{
    children: React.ReactNode;
}

const UserContainer:FC<UserContainerProps> = ({children}) => {
  const activePage = useSelector((state:RootState) => state.activePage.activePage)
  let pageTitle;

  if (activePage === 'settings') {
    pageTitle = 'Личный кабинет';
  } else if (activePage === 'transactions') {
    pageTitle = 'Транзакции';
  } else if (activePage === 'buy') {
    pageTitle = 'Транзакции';
  } else if (activePage === 'organisations') {
    pageTitle = 'Организации';
  } else {
    pageTitle = '';
  }
  return (
    <>
      <Head>
        <link rel="icon" href="/testIcon.png" />
        <title>{`Профиль ${pageTitle ? `| ${pageTitle}` : ''}`}</title>
      </Head>
      <div className={styles.container}>
          {children}
      </div>
    </>
  )
}

export default UserContainer