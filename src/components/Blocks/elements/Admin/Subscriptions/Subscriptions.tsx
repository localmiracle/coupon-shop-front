import React, { FC, useEffect, useState } from "react";
import ProductList from "../../ProductList/ProductList";
import styles from "./Subscriptions.module.css";
import Modal from "@/components/UI/Modals/Modal";
import SubscriptionForm from "./SubscriptionForm/SubscriptionForm";
import $adminApi from "@/http/adminClient";
import Subscription from "../../Subscription/Subscription";

type Sub = {
  id: string;
  name: string;
  description: string;
  level: number;
  price: number;
};

const Subscriptions: FC = () => {
  const [subscriptions, setSubscriptions] = useState<Sub[]>([]);
  const [affirmationObject, setAffirmationObject] = useState<Sub>();
  const [editedObject, setEditedObject] = useState<Sub>();
  const [previewObject, setPreviewObject] = useState<Sub>();

  const updateSubscriptions = async () => {
    try {
      const { data } = await $adminApi.get("subscription");
      setSubscriptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubscription = async (id: any) => {
    try {
      const { status } = await $adminApi.delete(`subscription/${id}`);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateSubscriptions();
  }, []);

  const toggleAffirmation = (subscription: Sub) => {
    if (affirmationObject?.id === subscription.id)
      setAffirmationObject(undefined);
    else setAffirmationObject(subscription);
  };

  const togglePreview = (subscription: Sub) => {
    if (previewObject?.id === subscription.id) setPreviewObject(undefined);
    else setPreviewObject(subscription);
  };

  const handleEdit = (subscription: Sub) => {
    setEditedObject(subscription);
    setAffirmationObject(undefined);
  };

  const handleStopEdit = () => {
    setEditedObject(undefined);
  };

  const handleDelete = async (subscription: Sub) => {
    await deleteSubscription(subscription.id);
    updateSubscriptions();
  };

  return (
    <>
      <div className={styles.list}>
        <h2>Подписки</h2>
        <div className={styles.rows}>
          {subscriptions.map((subscription) => (
            <div key={subscription.id}>
              <div className={styles.row}>
                <p>{subscription.name}</p>
                <div className={styles.modify_panel}>
                  <p
                    className={styles.cancel}
                    onClick={() => togglePreview(subscription)}
                  >
                    Превью {previewObject?.id === subscription.id ? "↑" : "↓"}
                  </p>
                  <p>|</p>
                  {editedObject?.id === subscription.id ? (
                    <p className={styles.cancel} onClick={handleStopEdit}>
                      Отмена
                    </p>
                  ) : (
                    <>
                      <>
                        <p
                          className={styles.modify}
                          onClick={() => handleEdit(subscription)}
                        >
                          Редактировать
                        </p>
                        <p>|</p>
                      </>

                      <p>
                        {affirmationObject?.id === subscription.id ? (
                          <>
                            <span
                              className={styles.delete}
                              onClick={() => handleDelete(subscription)}
                            >
                              Удалить
                            </span>
                            <span> / </span>
                            <span
                              className={styles.cancel}
                              onClick={() => toggleAffirmation(subscription)}
                            >
                              Отмена
                            </span>
                          </>
                        ) : (
                          <span
                            className={styles.delete}
                            onClick={() => toggleAffirmation(subscription)}
                          >
                            Удалить
                          </span>
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>
              {previewObject?.id === subscription.id && (
                <div className={styles.preview_wrapper}>
                  <Subscription
                    id={subscription.id}
                    name={subscription.name}
                    description={subscription.description}
                    level={subscription.level}
                    price={subscription.price}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <SubscriptionForm
        updateObjectCallback={updateSubscriptions}
        editedObject={editedObject}
        handleFinishedEdit={handleStopEdit}
      />
    </>
  );
};

export default Subscriptions;
