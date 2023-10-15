import React, { FC } from 'react'
import styles from './SubLevel2.module.css'
import Fire from './../../../../../public/fire.png'
import Image from 'next/image'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface SubProps{
    name: string;
    min_desc: string;
    desc: string;
}

const SubLevel2:FC<SubProps>= ({name,min_desc,desc}) => {
  return (
    <div className={styles.standart}>
        <div className={styles.item__info}>
            <h2>{name}</h2>
            <div>
                <ArrowBackIosIcon className={styles.arrows}/>
                <ArrowForwardIosIcon className={styles.arrows}/>
            </div>
        </div>
        <div className={`${styles.description} ${styles.descStan}`}>
            <Image src={Fire} alt={''} />
            <h5>{min_desc}</h5>
            <p>{desc}</p>
        </div>
        <button type='button' className={`${styles.btn_buy} ${styles.stan}`}>Купить</button>
    </div>
  )
}

export default SubLevel2