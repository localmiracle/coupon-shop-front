import React, { FC, useEffect, useState } from 'react'
import styles from './Authorization.module.css'
import Link from 'next/link';
import Image from 'next/image';
import Profile from './../../../../../../../public/IconProfile.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch } from 'react-redux';
import { setToken } from '@/redux/tokenSlice';

interface AuthorizationProps{
    handleToggleModal: () =>  void;
}

const Authorization:FC<AuthorizationProps> = ({handleToggleModal}) => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token){
      dispatch(setToken(token))
      setStatus("authenticated")
    } else {
      setStatus("unauthenticated")
    }
  }, [])
  
  
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token')
    location.reload()
  }
  return (
    <div className={styles.auth}>
        
        {status === "authenticated" ? 
        <>
          <div onClick={handleToggle} className={styles.profile__menu}>
              
            <Image src={Profile} alt='Профиль'/>
            <p>Профиль</p>
            { isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
          <div className={isOpen ? `${styles.profile__list} ${styles.open}` : `${styles.profile__list}`}>
            <Link href={'/user'}>Личный кабинет</Link>
            <button onClick={handleSignOut}>Выйти</button>
          </div>
         
        </>
        :
        <>
        <Link href={'/login'} className={styles.signIn}>Вход</Link>
        
        </>}
    </div>
  )
}

export default Authorization