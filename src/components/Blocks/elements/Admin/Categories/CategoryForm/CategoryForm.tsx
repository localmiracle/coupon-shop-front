import { FC, useEffect, useState } from "react";
import styles from "./CategoryForm.module.css";
import $adminApi from "@/http/adminClient";

interface CategoryFormProps {
  updateObjectCallback: () => void;
  editedObject: any;
  handleFinishedEdit: () => void;
}

const CategoryForm: FC<CategoryFormProps> = ({
  updateObjectCallback,
  editedObject,
  handleFinishedEdit,
}) => {
  const [name, setName] = useState<string>("");
  const [isSubcategory, setIsSubcategory] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (editedObject) {
      setName(editedObject.name);
    } else {
      setName("");
    }
  }, [editedObject]);

  useEffect(() => {console.log(isSubcategory)}, [isSubcategory]);

  const toggleSubcategory = () => {
    setIsSubcategory(!isSubcategory);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editedObject) {
      try {
        await $adminApi.put(`/category/${editedObject.id}`, { name: name });
        updateObjectCallback();
        handleFinishedEdit();
        setName("");
        setError("");
      } catch (e) {
        setError("Произошла ошибка при редактировании категории");
        console.log(e);
      }
    } else {
      try {
        await $adminApi.post("/category", { name: name });
        updateObjectCallback();
        setName("");
        setError("");
      } catch (e) {
        setError("Произошла ошибка при добавлении категории");
        console.log(e);
      }
    }
  };

  return (
    <form action="" className={styles.form}>
      {editedObject ? (
        <h2>Редактировать категорию</h2>
      ) : (
        <h2>Создать категорию</h2>
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
      <div className={styles.button_wrapper}>
        <button onClick={submit}>
          {editedObject ? "Сохранить" : "Создать"}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default CategoryForm;
