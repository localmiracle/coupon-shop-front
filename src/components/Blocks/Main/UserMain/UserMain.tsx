import React, { FC, useEffect, useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import styles from './UserMain.module.css'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setActivePage } from '@/redux/activePageSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';

interface UserMainProps{ 
  children: React.ReactNode;
}

const UserMain:FC<UserMainProps> = ({children}) => {
    const dispatch = useDispatch();
    const router = useRouter()
    const activePage = useSelector((state:RootState) => state.activePage.activePage)
    useEffect(() => {
      const path = window.location.pathname; // получаем текущий путь
  
      // Ваш код проверки текущего пути и диспатча действия setActivePage
      // Например:
      if (path === '/user') {
        dispatch(setActivePage('settings'));
      } else if (path === '/user/subscription') {
        dispatch(setActivePage('buy'));
      } else if (path === '/user/transactions') {
        dispatch(setActivePage('transactions'));
      } else if (path === '/user/organisations') {
        dispatch(setActivePage('organisations'));
      }

    }, []);
    const redirectToUser = () =>{
      router.push('/user')
    }
    const redirectToSubcriptions = () =>{
      router.push('/user/subscription')
    }
    const redirectToTransactions = () =>{
      router.push('/user/transactions')
    }
    const redirectToOrganisations = () =>{
      router.push('/user/organisations')
    }
    const handleLinkClick = (page:string) => {
      dispatch(setActivePage(page));
    }
  return (
    <main className={styles.main}>
        <nav className={styles.left}>
            <div className={styles.left__item}>
              
                <TuneIcon onClick={redirectToUser}/>
                <Link 
                href={'/user'}
                onClick={()=> handleLinkClick('settings')}
                className={activePage === 'settings' ? styles.activePage : ''}>Настройки</Link>
            </div>
            <div className={styles.left__item}>
              
                <HowToRegIcon onClick={redirectToSubcriptions}/>
                <Link href={'/user/subscription'}
                onClick={()=> handleLinkClick('buy')}
                className={activePage === 'buy' ? styles.activePage : ''}>Купить подписку</Link>
            </div>
            <div className={styles.left__item}>
            
                <MultipleStopIcon onClick={redirectToTransactions}/>
                <Link 
                onClick={()=> handleLinkClick('history')}
                href={'/user/transactions'}
                className={activePage === 'transactions' ? styles.activePage : ''}>История транзакций</Link>
            </div>
            <div className={styles.left__item}>
                
                <WorkOutlineOutlinedIcon onClick={redirectToOrganisations}/>
                <Link href={'/user/organisations'}
                onClick={()=> handleLinkClick('organisations')}
                className={activePage === 'organisations' ? styles.activePage : ''}>Мои организации</Link>
            </div>
        </nav>
        <div className={styles.right}>
            {children}
        </div>
    </main>
  )
}

export default UserMain