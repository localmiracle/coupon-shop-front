import React, { FC, useEffect, useState } from 'react'
import styles from './SubLevel1.module.css'
import Fire from './../../../../../public/fire.png'
import Image from 'next/image'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface SubProps{
    name: string;
    price: string;
    description: string;
    id: string;
    isAdmin: boolean;
    handleDeleteSub: any;
    handleEditSub: any
}

const SubLevel1:FC<SubProps>= ({id,name,price,description, isAdmin, handleDeleteSub, handleEditSub}) => {
    
  return (
    <div className={styles.min}>
      { isAdmin? 
        <div className={styles.admin}>
            <EditNoteIcon style={{color:'black', cursor:'pointer'}} onClick={handleEditSub}/>
            <DeleteForeverIcon style={{color:'red', cursor:'pointer'}} onClick={handleDeleteSub}/>
        </div> 
      : null}
        <div className={styles.item__info}>
            <h2>{name}</h2>
            <div>
                <ArrowBackIosIcon className={styles.arrows}/>
                <ArrowForwardIosIcon className={styles.arrows}/>
            </div>
        </div>
        <div className={styles.description}>
            <Image src={Fire} alt={''} />
            <h4>{price}</h4>
            <p>{description}</p>
        </div>
        <button type='button' className={styles.btn_buy}>Купить</button>
    </div>
  )
}

export default SubLevel1