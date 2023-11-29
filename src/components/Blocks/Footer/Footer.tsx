import React from 'react';
import styles from './Footer.module.css';
import Image from 'next/image';
import vkIcon from './../../../../public/vk.png';
import tgIcon from './../../../../public/tg.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__items}>
        <p>©2023 Parcus</p>
        <p>Партнёры</p>
        <p onMouseOver={() => showContacts()}>Контакты</p>
        <div id="contactDetails" className={styles.hiddenContacts}>
          <p>ООО “ЦИФРА”</p>
          <p>ИНН 5031152475</p>
          <p>Номер поддержки +7 (916) 586-17-10</p>
          <p>Почтовый адрес digititcompany@gmail.com</p>
        </div>
        <div>
          <Image src={vkIcon} alt={'vk'} />
          <Image src={tgIcon} alt={'tg'} />
        </div>
      </div>
    </footer>
  );
};

const showContacts = () => {
  const contactDetails = document.getElementById('contactDetails');
  contactDetails.classList.toggle(styles.hiddenContacts);
};

export default Footer;
