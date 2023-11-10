import { FC, use, useEffect, useState } from "react";
import styles from "./UserForm.module.css";
import $adminApi from "@/http/adminClient";

interface UserFormProps {
  updateObjectCallback: () => void;
  editedObject: any;
  handleFinishedEdit: () => void;
}

const UserForm: FC<UserFormProps> = ({
  updateObjectCallback,
  editedObject,
  handleFinishedEdit,
}) => {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [subscription, setSubscription] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (editedObject) {
      setEmail(editedObject.Email);
      setPhone(editedObject.Phone);
      setSubscription(editedObject.Subscription);
    } else {
      resetState();
    }
  }, [editedObject]);

  const resetState = () => {
    setEmail("");
    setPhone("");
    setSubscription("");
    setError("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: any = {};
    formData["Email"] = email;
    formData["Phone"] = phone;
    formData["Subscription"] = subscription;

    if (editedObject) {
      try {
        await $adminApi.put(`/user/${editedObject.ID}`, formData);
        updateObjectCallback();
        handleFinishedEdit();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при редактировании пользователя");
        console.log(e);
      }
    } else {
      try {
        await $adminApi.post("/user", formData);
        updateObjectCallback();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при добавлении пользователя");
        console.log(e);
      }
    }
  };

  return (
    <form action="" className={styles.form}>
      {editedObject ? (
        <h2>Редактировать пользователя</h2>
      ) : (
        <h2>Создать пользователя</h2>
      )}

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
        <label htmlFor="phone">Телефон</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className={styles.form_field}>
        <label htmlFor="subscription">Подписка</label>
        <input
          id="subscription"
          type="text"
          value={subscription}
          required
          onChange={(e) => setSubscription(e.target.value)}
        />
      </div>

      {/* {organizationList.length > 0 && (
        <div className={styles.form_field}>
          <label htmlFor="organization">Организация</label>
          <select
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          >
            <option value="">Без организации</option>
            {organizationList.map((organization) => (
              <option key={organization.id} value={organization.id}>
                {organization.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {organization !== "" && (
        <div className={styles.form_field}>
          <label htmlFor="first-name">Имя</label>
          <input
            id="first-name"
            type="text"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      )}

      {organization !== "" && (
        <div className={styles.form_field}>
          <label htmlFor="last-name">Фамилия</label>
          <input
            id="last-name"
            type="text"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      )}

      {organization !== "" && (
        <div className={styles.form_field}>
          <label htmlFor="role">Роль</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">Пользователь</option>
            <option value="owner">Владелец</option>
            <option value="editor">Редактор</option>
          </select>
        </div>
      )} */}

      <div className={styles.button_wrapper}>
        <button onClick={submit}>
          {editedObject ? "Сохранить" : "Создать"}
        </button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default UserForm;
