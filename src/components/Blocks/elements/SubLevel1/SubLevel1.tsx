import React, { FC } from 'react'
import styles from './SubLevel1.module.css'
import Fire from './../../../../../public/fire.png'
import Image from 'next/image'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface SubProps{
    name: string;
    min_desc: string;
    desc: string;
}

const SubLevel1:FC<SubProps>= ({name,min_desc,desc}) => {
  return (
    <div className={styles.min}>
        <div className={styles.item__info}>
            <h2>{name}</h2>
            <div>
                <ArrowBackIosIcon className={styles.arrows}/>
                <ArrowForwardIosIcon className={styles.arrows}/>
            </div>
        </div>
        <div className={styles.description}>
            <Image src={Fire} alt={''} />
            <h5>{min_desc}</h5>
            <p>{desc}</p>
        </div>
        <button type='button' className={styles.btn_buy}>Купить</button>
    </div>
  )
}

export default SubLevel1