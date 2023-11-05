import React, { FC, useState } from "react";
import styles from "./Panel.module.css";
import Logo from "@/components/Blocks/Header/HomeHeader/HomeHeaderElements/Logo/Logo";
import AdminForm from "@/components/UI/Forms/AdminForm/AdminForm";
import Organisations from "@/components/Blocks/elements/Admin/Organisations/Organisations";
import Coupons from "@/components/Blocks/elements/Admin/Coupons/Coupons";
import Subscriptions from "@/components/Blocks/elements/Admin/Subscriptions/Subscriptions";
import Regions from "../Regions/Regions";
import Categories from "../Categories/Categories";

interface PanelProps {
  isLoggedIn: boolean;
  handleLogOut: () => void;
  token: string;
  setToken: (token: string) => void;
}

const Panel: FC<PanelProps> = ({
  isLoggedIn,
  handleLogOut,
  token,
  setToken,
}) => {
  const [selectedField, setSelectedField] = useState<number>(0);

  return (
    <div className={styles.panel}>
      <div className={styles.panel_header}>
        <div className={styles.header_left}>
          <Logo />
          <h1>Панель Администратора</h1>
        </div>
        {isLoggedIn && (
          <button type="button" onClick={handleLogOut}>
            Выйти
          </button>
        )}
      </div>
      {isLoggedIn ? (
        <div className={styles.panel_body}>
          <div className={styles.field_select}>
            <div className={styles.field} onClick={() => setSelectedField(0)}>
              <a style={selectedField === 0 ? { fontWeight: "700" } : {}}>
                Купоны
              </a>
            </div>
            <div className={styles.field} onClick={() => setSelectedField(1)}>
              <a style={selectedField === 1 ? { fontWeight: "700" } : {}}>
                Подписки
              </a>
            </div>
            <div className={styles.field} onClick={() => setSelectedField(2)}>
              <a style={selectedField === 2 ? { fontWeight: "700" } : {}}>
                Организации
              </a>
            </div>
            <div className={styles.field} onClick={() => setSelectedField(3)}>
              <a style={selectedField === 3 ? { fontWeight: "700" } : {}}>
                Регионы
              </a>
            </div>
            <div className={styles.field} onClick={() => setSelectedField(4)}>
              <a style={selectedField === 4 ? { fontWeight: "700" } : {}}>
                Категории
              </a>
            </div>
            <div className={styles.field} onClick={() => setSelectedField(5)}>
              <a style={selectedField === 5 ? { fontWeight: "700" } : {}}>
                Пользователи
              </a>
            </div>
          </div>
          <div className={styles.field_display}>
            {selectedField === 0 && <Coupons />}
            {selectedField === 1 && <Subscriptions />}
            {selectedField === 2 && <Organisations />}
            {selectedField === 3 && <Regions />}
            {selectedField === 4 && <Categories />}
            {selectedField === 5 && <h2>Not Implemented</h2>}
          </div>
        </div>
      ) : (
        <div className={styles.auth_wrapper}>
          <AdminForm setToken={setToken} />
        </div>
      )}

      {/* {children} */}
    </div>
  );
};

export default Panel;
