import { FC, useEffect, useState } from "react";
import styles from "./SubscriptionForm.module.css";
import $adminApi from "@/http/adminClient";

interface SubscriptionFormProps {
  updateObjectCallback: () => void;
  editedObject: any;
  handleFinishedEdit: () => void;
}

const SubscriptionForm: FC<SubscriptionFormProps> = ({
  updateObjectCallback,
  editedObject,
  handleFinishedEdit,
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (editedObject) {
      setName(editedObject.name);
      setDescription(editedObject.description);
      setLevel(editedObject.level);
      setPrice(editedObject.price);
    } else {
      resetState();
    }
  }, [editedObject]);

  const resetState = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setLevel(0);
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: any = {};

    if (editedObject) {
      if (editedObject.name !== name) formData["name"] = name;
      if (editedObject.description !== description)
        formData["description"] = description;
      if (editedObject.price !== price) formData["price"] = price;

      try {
        await $adminApi.put(`/subscription/${editedObject.id}`, formData);
        updateObjectCallback();
        handleFinishedEdit();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при редактировании подписки");
        console.log(e);
      }
    } else {
      formData["name"] = name;
      formData["description"] = description;
      formData["price"] = price;
      formData["level"] = level;

      try {
        await $adminApi.post("/subscription", formData);
        updateObjectCallback();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при добавлении подписки");
        console.log(e);
      }
    }
  };

  return (
    <form action="" className={styles.form}>
      {editedObject ? (
        <h2>Редактировать подписку</h2>
      ) : (
        <h2>Создать подписку</h2>
      )}
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
      <div className={`${styles.form_field} ${styles.description}`}>
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="level">Уровень подписки</label>
        <input
          id="level"
          type="number"
          value={level}
          required
          onChange={(e) => setLevel(parseInt(e.target.value))}
          disabled={editedObject ? true : false}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="price">Цена</label>
        <input
          id="price"
          type="number"
          value={price}
          required
          onChange={(e) => setPrice(parseInt(e.target.value))}
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

export default SubscriptionForm;
