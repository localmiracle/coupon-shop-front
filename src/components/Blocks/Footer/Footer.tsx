import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import vkIcon from "./../../../../public/vk.png";
import tgIcon from "./../../../../public/tg.png";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Footer = () => {
  const vk = useSelector((state: RootState) => state.region.vk);
  const tg = useSelector((state: RootState) => state.region.tg);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__items}>
        <p>©2023 Parcus</p>
        <p>Партнёры</p>
        <p>О программе</p>
        <p>Контакты</p>
        <div>
          <a href={vk}>
            <Image src={vkIcon} alt={"vk"} />
          </a>
          <a href={tg}>
            <Image src={tgIcon} alt={"tg"} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
