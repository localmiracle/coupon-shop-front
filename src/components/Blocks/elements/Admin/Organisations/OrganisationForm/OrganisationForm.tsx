import { FC, useEffect, useState } from "react";
import styles from "./OrganisationForm.module.css";
import $adminApi from "@/http";

interface OrganisationFormProps {
  updateObjectCallback: () => void;
  editedObject: any;
  handleFinishedEdit: () => void;
}

const OrganisationForm: FC<OrganisationFormProps> = ({
  updateObjectCallback,
  editedObject,
  handleFinishedEdit,
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [orgNumber, setOrgNumber] = useState<string>("");
  const [kpp, setKpp] = useState<string>("");
  const [inn, setInn] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  useEffect(() => {
    if (editedObject) {
      setName(editedObject.name);
      setEmail(editedObject.email_admin);
      setLevel(editedObject.level_subscription);
      setOrgNumber(editedObject.orgn);
      setKpp(editedObject.kpp);
      setInn(editedObject.inn);
      setAddress(editedObject.address);
    } else {
      resetState();
    }
  }, [editedObject]);

  const resetState = () => {
    setName("");
    setEmail("");
    setLevel(0);
    setOrgNumber("");
    setKpp("");
    setInn("");
    setAddress("");
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
      if (editedObject.email_admin !== email)
        formData.append("email_admin", email);
      if (editedObject.orgn !== orgNumber) formData.append("orgn", orgNumber);
      if (editedObject.kpp !== kpp) formData.append("kpp", kpp);
      if (editedObject.inn !== inn) formData.append("inn", inn);
      if (editedObject.address !== address) formData.append("address", address);

      try {
        await $adminApi.put(`/organization/${editedObject.id}`, formData);
        updateObjectCallback();
        handleFinishedEdit();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при редактировании организации");
        console.log(e);
      }
    } else {
      formData.append("name", name);
      formData.append("email_admin", email);
      formData.append("level_subscription", level.toString());
      formData.append("orgn", orgNumber);
      formData.append("kpp", kpp);
      formData.append("inn", inn);
      formData.append("address", address);

      try {
        await $adminApi.post("/organization", formData);
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
        <h2>Редактировать организацию</h2>
      ) : (
        <h2>Создать организацию</h2>
      )}
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
      <div className={styles.form_field}>
        <label htmlFor="email">Почта</label>
        <input
          id="email"
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
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
        <label htmlFor="orgn">Орг. номер</label>
        <input
          id="orgn"
          type="text"
          value={orgNumber}
          required
          onChange={(e) => setOrgNumber(e.target.value)}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="kpp">КПП</label>
        <input
          id="kpp"
          type="text"
          value={kpp}
          required
          onChange={(e) => setKpp(e.target.value)}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="inn">ИНН</label>
        <input
          id="inn"
          type="text"
          value={inn}
          required
          onChange={(e) => setInn(e.target.value)}
        />
      </div>
      <div className={styles.form_field}>
        <label htmlFor="address">Адрес</label>
        <input
          id="address"
          type="text"
          value={address}
          required
          onChange={(e) => setAddress(e.target.value)}
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

export default OrganisationForm;
