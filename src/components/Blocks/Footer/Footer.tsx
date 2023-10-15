import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image';
import vkIcon from './../../../../public/vk.png'
import tgIcon from './../../../../public/tg.png'

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer__items}>
            <p>©2023 ShopSmart</p>
            <p>Партнёры</p>
            <p>О программе</p>
            <p>Контакты</p>
            <div>
                <Image src={vkIcon} alt={'vk'} />
                <Image src={tgIcon} alt={'tg'} />
            </div>
        </div>
    </footer>
  )
}

export default Footer