import { FC, useEffect, useState } from "react";
import styles from "./CouponForm.module.css";
import $adminApi from "@/http";

interface CouponFormProps {
  updateObjectCallback: () => void;
  editedObject: any;
  handleFinishedEdit: () => void;
}

const CouponForm: FC<CouponFormProps> = ({
  updateObjectCallback,
  editedObject,
  handleFinishedEdit,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [region, setRegion] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  useEffect(() => {
    if (editedObject) {
      setName(editedObject.name);
      setDescription(editedObject.description);
      setLevel(editedObject.level);
      setPrice(editedObject.price);
      setDiscount(editedObject.discount);
      setRegion(editedObject.region);
      setCategory(editedObject.category);
      setSubcategory(editedObject.subcategory);
    } else {
      resetState();
    }
  }, [editedObject]);

  const resetState = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setLevel(0);
    setDiscount(0);
    setRegion("");
    setCategory("");
    setSubcategory("");
    setImage(null);
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("file", image);
    }

    if (editedObject) {
      if (editedObject.name !== name) formData.append("name", name);
      if (editedObject.description !== description)
        formData.append("description", description);
      if (editedObject.price !== price)
        formData.append("price", price.toString());
      if (editedObject.discount !== discount)
        formData.append("discount", discount.toString());
      if (editedObject.region !== region) formData.append("region", region);
      if (editedObject.category !== category)
        formData.append("category", category);
      if (editedObject.subcategory !== subcategory)
        formData.append("subcategory", subcategory);

      try {
        await $adminApi.put(`/coupon/${editedObject.id}`, formData);
        updateObjectCallback();
        handleFinishedEdit();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при редактировании купона");
        console.log(e);
      }
    } else {
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price.toString());
      formData.append("level", level.toString());
      formData.append("discount", discount.toString());
      formData.append("region", region);
      formData.append("category", category);
      formData.append("subcategory", subcategory);

      try {
        await $adminApi.post("/coupon", formData);
        updateObjectCallback();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при добавлении купона");
        console.log(e);
      }
    }
  };

  return (
    <form action="" className={styles.form}>
      {editedObject ? <h2>Редактировать купон</h2> : <h2>Создать купон</h2>}
      <div className={styles.form_field}>
        <label htmlFor="image">Изображение</label>
        <input
          id="image"
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleImageChange}
        ></input>
      </div>
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
        <label htmlFor="level">Уровень купона</label>
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
      <div className={styles.form_field}>
        <label htmlFor="discount">Скидка (%)</label>
        <input
          id="discount"
          type="number"
          min={0}
          max={100}
          required
          value={discount}
          onChange={(e) => setDiscount(parseInt(e.target.value))}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="region">Регион</label>
        <input
          id="region"
          type="text"
          value={region}
          required
          onChange={(e) => setRegion(e.target.value)}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="category">Категория</label>
        <input
          id="category"
          type="text"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="subcategory">Подкатегория</label>
        <input
          id="subcategory"
          type="text"
          value={subcategory}
          required
          onChange={(e) => setSubcategory(e.target.value)}
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

export default CouponForm;
