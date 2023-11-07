import React, { FC } from "react";
import styles from "./SubList.module.css";
import Fire from "./../../../../../public/fire.png";
import Image from "next/image";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Subscription from "../Subscription/Subscription";

interface SubListProps {
  subscriptions: any[];
}

const SubList: FC<SubListProps> = ({ subscriptions }) => {
  return (
    <section>
      <div className={styles.items}>
        {subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <Subscription key={sub.id} subscription={sub} />
          ))
        ) : (
          <p>Нет подписок</p>
        )}
      </div>
    </section>
  );
};

export default SubList;
