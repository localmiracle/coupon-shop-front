import React, { FC } from "react";
import styles from "./Subscription.module.css";
import Fire from "./../../../../../public/fire.png";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SubscriptionProps {
  id: string;
  name: string;
  description: string;
  level: number;
  price: number;
}

const Subscription: FC<SubscriptionProps> = ({
  id,
  name,
  description,
  level,
  price,
}) => {
  let levelStyle = null;

  switch (level) {
    case 2:
      levelStyle = styles.level2;
      break;
    case 3:
      levelStyle = styles.level3;
      break;

    default:
      levelStyle = styles.level1;
      break;
  }

  return (
    <div className={`${styles.subscription} ${levelStyle}`}>
      <div className={styles.subscription_header}>
        <h2>{name}</h2>
        <div className={styles.subscription_controls}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
          >
            <path
              opacity="0.4"
              d="M9.5 19C4.25334 19 0 14.7467 0 9.5C0 4.25329 4.25334 0 9.5 0C14.7467 0 19 4.25329 19 9.5C19 14.7467 14.7467 19 9.5 19Z"
            />
            <path d="M10.6976 13.5662C10.8781 13.5662 11.0586 13.4997 11.2011 13.3572C11.4766 13.0817 11.4766 12.6257 11.2011 12.3502L8.35108 9.50019L11.2011 6.65015C11.4766 6.37465 11.4766 5.91865 11.2011 5.64315C10.9256 5.36765 10.4696 5.36765 10.1941 5.64315L6.84058 8.99669C6.56508 9.27219 6.56508 9.72819 6.84058 10.0037L10.1941 13.3572C10.3366 13.4997 10.5171 13.5662 10.6976 13.5662Z" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
          >
            <path
              opacity="0.4"
              d="M9.5 19C14.7467 19 19 14.7467 19 9.5C19 4.25329 14.7467 0 9.5 0C4.25329 0 0 4.25329 0 9.5C0 14.7467 4.25329 19 9.5 19Z"
            />
            <path d="M8.30242 13.5662C8.12192 13.5662 7.94142 13.4997 7.79892 13.3572C7.52341 13.0817 7.52341 12.6257 7.79892 12.3502L10.6489 9.50019L7.79892 6.65015C7.52341 6.37465 7.52341 5.91865 7.79892 5.64315C8.07442 5.36765 8.53042 5.36765 8.80592 5.64315L12.1594 8.99669C12.4349 9.27219 12.4349 9.72819 12.1594 10.0037L8.80592 13.3572C8.66342 13.4997 8.48292 13.5662 8.30242 13.5662Z" />
          </svg>
        </div>
      </div>

      <div className={styles.subscription_info_wrapper}>
        <div className={styles.subscription_info}>
          <Image src={Fire} alt={""} />
          <p className={styles.description}>{description}</p>
          <p className={styles.sub_description}>
            Вам станут доступны новые категории купонов с ещё большими скидками
            и выгодными условиями
          </p>
        </div>
        <div className={styles.subscription_info}>
          <Image src={Fire} alt={""} />
          <p className={styles.description}>{description}</p>
          <p className={styles.sub_description}>
            Вам станут доступны новые категории купонов с ещё большими скидками
            и выгодными условиями
          </p>
        </div>
      </div>
      <p className={styles.price}>{price} ₽ в месяц</p>
      <button type="button">Купить</button>
    </div>
  );
};

export default Subscription;
