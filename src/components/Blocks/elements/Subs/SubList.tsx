import React, { FC } from 'react'
import styles from './SubList.module.css'
import Fire from './../../../../../public/fire.png'
import Image from 'next/image'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SubList:FC = () => {
  return (
    <section>
        <div className={styles.items}>
            <div className={styles.min}>
                <div className={styles.item__info}>
                    <h2>Минимум</h2>
                    <div>
                        <ArrowBackIosIcon className={styles.arrows}/>
                        <ArrowForwardIosIcon className={styles.arrows}/>
                    </div>
                </div>
                <div className={styles.description}>
                    <Image src={Fire} alt={''} />
                    <h5>Ещё больше выгодных акций и предложений!</h5>
                    <p>Вам станут доступны новые категории купонов с ещё большими скидками и выгодными условиями</p>
                </div>
                <button type='button' className={styles.btn_buy}>Купить</button>
            </div>
            <div className={styles.standart}>
                <div className={styles.item__info}>
                    <h2>Стандарт</h2>
                    <div>
                        <ArrowBackIosIcon className={styles.arrows}/>
                        <ArrowForwardIosIcon className={styles.arrows}/>
                    </div>
                </div>
                <div className={`${styles.description} ${styles.descStan}`}>
                    <Image src={Fire} alt={''} />
                    <h5>Ещё больше выгодных акций и предложений!</h5>
                    <p>Вам станут доступны новые категории купонов с ещё большими скидками и выгодными условиями</p>
                </div>
                <button type='button' className={`${styles.btn_buy} ${styles.stan}`}>Купить</button>
            </div>
            <div className={styles.premium}>
                <div className={styles.item__info}>
                    <h2>Премуим</h2>
                    <div>
                        <ArrowBackIosIcon className={styles.arrows}/>
                        <ArrowForwardIosIcon className={styles.arrows}/>
                    </div>
                </div>
                <div className={`${styles.description} ${styles.descPrem}`}>
                    <Image src={Fire} alt={''} />
                    <h5>Ещё больше выгодных акций и предложений!</h5>
                    <p>Вам станут доступны новые категории купонов с ещё большими скидками и выгодными условиями</p>
                </div>
                <button type='button' className={`${styles.btn_buy} ${styles.prem}`}>Купить</button>
            </div>
        </div>
    </section>
  )
}

export default SubList