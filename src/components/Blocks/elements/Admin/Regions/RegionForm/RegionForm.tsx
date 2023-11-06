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
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (editedObject) {
      setName(editedObject.name);
    } else {
      setName("");
    }
  }, [editedObject]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editedObject) {
      try {
        await $adminApi.put(`/region/${editedObject.id}`, { name: name });
        updateObjectCallback();
        handleFinishedEdit();
        setName("");
        setError("");
      } catch (e) {
        setError("Произошла ошибка при редактировании региона");
        console.log(e);
      }
    } else {
      try {
        await $adminApi.post("/region", { name: name });
        updateObjectCallback();
        setName("");
        setError("");
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
