import { FC, useEffect, useState } from "react";
import styles from "./RegionForm.module.css";
import $adminApi from "@/http/adminClient";

interface RegionFormProps {
  updateObjectCallback: () => void;
  editedObject: any;
  handleFinishedEdit: () => void;
}

const RegionForm: FC<RegionFormProps> = ({
  updateObjectCallback,
  editedObject,
  handleFinishedEdit,
}) => {
  const [name, setName] = useState<string>("");
  const [linkVK, setLinkVK] = useState<string>("");
  const [linkTelegram, setLinkTelegram] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (editedObject) {
      setName(editedObject.name);
      setLinkVK(editedObject.vk);
      setLinkTelegram(editedObject.tg);
    } else {
      resetState();
    }
  }, [editedObject]);

  const resetState = () => {
    setName("");
    setLinkVK("");
    setLinkTelegram("");
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name: name,
      vk: linkVK,
      tg: linkTelegram,
    };

    if (editedObject) {
      try {
        await $adminApi.put(`/region/${editedObject.id}`, data);
        updateObjectCallback();
        handleFinishedEdit();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при редактировании региона");
        console.log(e);
      }
    } else {
      try {
        await $adminApi.post("/region", data);
        updateObjectCallback();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при добавлении региона");
        console.log(e);
      }
    }
  };

  return (
    <form action="" className={styles.form}>
      {editedObject ? <h2>Редактировать регион</h2> : <h2>Создать регион</h2>}
      <div className={styles.form_field}>
        <label htmlFor="name">Название</label>
        <input
          id="name"
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="vk">VK</label>
        <input
          id="vk"
          type="text"
          value={linkVK}
          required
          onChange={(e) => setLinkVK(e.target.value)}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="tg">Telegram</label>
        <input
          id="tg"
          type="text"
          value={linkTelegram}
          required
          onChange={(e) => setLinkTelegram(e.target.value)}
        />
      </div>
      <div className={styles.button_wrapper}>
        <button onClick={submit}>
          {editedObject ? "Сохранить" : "Создать"}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default RegionForm;
