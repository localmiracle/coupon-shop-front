import React, { useState } from 'react'
import styles from './switch.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { setActive } from '@/redux/activeSlice'

const SwitchButtons = () => {
    const active = useSelector((state:RootState) => state.active.active)
    const dispatch = useDispatch()
    const handlerSwitch = (choice:string) => {
        if (choice === 'products'){
            dispatch(setActive('products'))
        } 
        if( choice === 'people'){
            dispatch(setActive('people'))
        }
    }
  return (

    <div className={styles.buttons}>
        <button onClick={()=>handlerSwitch('people')} 
        type='button' 
        className={active === 'people' ? `${styles.switchBtn} ${styles.active}` :`${styles.switchBtn}`}>Мои сотрудники</button>
        <button 
        onClick={()=>handlerSwitch('products')} 
        type='button' 
        className={active === 'products' ? `${styles.switchBtn} ${styles.active}` :`${styles.switchBtn}`}>Мои акции</button>
    </div>
  )
}

export default SwitchButtons