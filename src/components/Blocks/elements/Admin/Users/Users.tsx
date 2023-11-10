import React, { FC, useEffect, useState } from "react";
import ProductList from "../../ProductList/ProductList";
import styles from "./Users.module.css";
import Modal from "@/components/UI/Modals/Modal";
import UserForm from "./UserForm/UserForm";
import $adminApi from "@/http/adminClient";

type User = {
  ID: string;
  Email: string;
  Phone: string;
  Subscription: string;
};

const Users: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [affirmationObject, setAffirmationObject] = useState<User>();
  const [editedObject, setEditedObject] = useState<User>();
  const [previewObject, setPreviewObject] = useState<User>();

  const updateUsers = async () => {
    try {
      const { data } = await $adminApi.get("user");
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (ID: any) => {
    try {
      const { status } = await $adminApi.delete(`user/${ID}`);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateUsers();
  }, []);

  const toggleAffirmation = (user: User) => {
    if (affirmationObject?.ID === user.ID) setAffirmationObject(undefined);
    else setAffirmationObject(user);
  };

  const togglePreview = (user: User) => {
    if (previewObject?.ID === user.ID) setPreviewObject(undefined);
    else setPreviewObject(user);
  };

  const handleEdit = (user: User) => {
    setEditedObject(user);
    setAffirmationObject(undefined);
  };

  const handleStopEdit = () => {
    setEditedObject(undefined);
  };

  const handleDelete = async (user: User) => {
    await deleteUser(user.ID);
    updateUsers();
  };

  return (
    <>
      <div className={styles.list}>
        <h2>Пользователи</h2>
        <div className={styles.rows}>
          {users.map((user) => (
            <div key={user.ID}>
              <div className={styles.row}>
                <p className={styles.name}>
                  {user.Email !== ""
                    ? user.Email
                    : user.Phone !== ""
                    ? user.Phone
                    : user.ID}
                </p>
                <div className={styles.modify_panel}>
                  <p
                    className={styles.cancel}
                    onClick={() => togglePreview(user)}
                  >
                    Подробнее {previewObject?.ID === user.ID ? "↑" : "↓"}
                  </p>
                  <p>|</p>
                  {editedObject?.ID === user.ID ? (
                    <p className={styles.cancel} onClick={handleStopEdit}>
                      Отмена
                    </p>
                  ) : (
                    <>
                      <>
                        <p
                          className={styles.modify}
                          onClick={() => handleEdit(user)}
                        >
                          Редактировать
                        </p>
                        <p>|</p>
                      </>

                      <p>
                        {affirmationObject?.ID === user.ID ? (
                          <>
                            <span
                              className={styles.delete}
                              onClick={() => handleDelete(user)}
                            >
                              Удалить
                            </span>
                            <span> / </span>
                            <span
                              className={styles.cancel}
                              onClick={() => toggleAffirmation(user)}
                            >
                              Отмена
                            </span>
                          </>
                        ) : (
                          <span
                            className={styles.delete}
                            onClick={() => toggleAffirmation(user)}
                          >
                            Удалить
                          </span>
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>
              {previewObject?.ID === user.ID && (
                <div className={styles.detail}>
                  <div className={styles.detail_fields}>
                    <p>
                      <span>ID:</span> {user.ID}
                    </p>
                    <p>
                      <span>Email:</span> {user.Email}
                    </p>
                    <p>
                      <span>Телефон:</span> {user.Phone}
                    </p>
                    <p>
                      <span>Подписка:</span> {user.Subscription}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <UserForm
        updateObjectCallback={updateUsers}
        editedObject={editedObject}
        handleFinishedEdit={handleStopEdit}
      />
    </>
  );
};

export default Users;
