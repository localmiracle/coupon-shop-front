import React, { FC, useEffect, useState } from "react";
import ProductList from "../../ProductList/ProductList";
import styles from "./Organisations.module.css";
import Modal from "@/components/UI/Modals/Modal";
import OrganisationForm from "./OrganisationForm/OrganisationForm";
import $adminApi from "@/http/adminClient";
import Image from "next/image";
import OrganisationMembers from "./OrganisationMembers/OrganisationMembers";

type Organisation = {
  id: string;
  name: string;
  email_admin: string;
  level_subscription: number;
  orgn: string;
  kpp: string;
  inn: string;
  address: string;
  content_url: string;
};

const Organisations: FC = () => {
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [affirmationObject, setAffirmationObject] = useState<Organisation>();
  const [editedObject, setEditedObject] = useState<Organisation>();
  const [previewObject, setPreviewObject] = useState<Organisation>();

  const updateOrganisations = async () => {
    try {
      const { data } = await $adminApi.get("organization");
      setOrganisations(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrganisation = async (id: any) => {
    try {
      const { status } = await $adminApi.delete(`organization/${id}`);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateOrganisations();
  }, []);

  const toggleAffirmation = (organisation: Organisation) => {
    if (affirmationObject?.id === organisation.id)
      setAffirmationObject(undefined);
    else setAffirmationObject(organisation);
  };

  const togglePreview = (organisation: Organisation) => {
    if (previewObject?.id === organisation.id) setPreviewObject(undefined);
    else setPreviewObject(organisation);
  };

  const handleEdit = (organisation: Organisation) => {
    setEditedObject(organisation);
    setAffirmationObject(undefined);
  };

  const handleStopEdit = () => {
    setEditedObject(undefined);
  };

  const handleDelete = async (organisation: Organisation) => {
    await deleteOrganisation(organisation.id);
    updateOrganisations();
  };

  return (
    <>
      <div className={styles.list}>
        <h2>Организации</h2>
        <div className={styles.rows}>
          {organisations.map((organisation) => (
            <div key={organisation.id}>
              <div className={styles.row}>
                <p>{organisation.name}</p>
                <div className={styles.modify_panel}>
                  <p
                    className={styles.cancel}
                    onClick={() => togglePreview(organisation)}
                  >
                    Подробнее{" "}
                    {previewObject?.id === organisation.id ? "↑" : "↓"}
                  </p>
                  <p>|</p>
                  {editedObject?.id === organisation.id ? (
                    <p className={styles.cancel} onClick={handleStopEdit}>
                      Отмена
                    </p>
                  ) : (
                    <>
                      <>
                        <p
                          className={styles.modify}
                          onClick={() => handleEdit(organisation)}
                        >
                          Редактировать
                        </p>
                        <p>|</p>
                      </>

                      <p>
                        {affirmationObject?.id === organisation.id ? (
                          <>
                            <span
                              className={styles.delete}
                              onClick={() => handleDelete(organisation)}
                            >
                              Удалить
                            </span>
                            <span> / </span>
                            <span
                              className={styles.cancel}
                              onClick={() => toggleAffirmation(organisation)}
                            >
                              Отмена
                            </span>
                          </>
                        ) : (
                          <span
                            className={styles.delete}
                            onClick={() => toggleAffirmation(organisation)}
                          >
                            Удалить
                          </span>
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>
              {previewObject?.id === organisation.id && (
                <div className={styles.organisation_info}>
                  <div className={styles.detail}>
                    <div className={styles.detail_fields}>
                      <p>
                        <span>Номер:</span> {organisation.orgn}
                      </p>
                      <p>
                        <span>ИНН:</span> {organisation.inn}
                      </p>
                      <p>
                        <span>КПП:</span> {organisation.kpp}
                      </p>
                      <p>
                        <span>Адрес:</span> {organisation.address}
                      </p>
                      <p>
                        <span>Email администратора:</span>{" "}
                        {organisation.email_admin}
                      </p>
                      <p>
                        <span>Уровень подписки:</span>{" "}
                        {organisation.level_subscription}
                      </p>
                    </div>
                    <Image
                      src={organisation.content_url}
                      alt={""}
                      width={112}
                      height={112}
                    />
                  </div>
                  <OrganisationMembers
                    organisation={organisation}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <OrganisationForm
        updateObjectCallback={updateOrganisations}
        editedObject={editedObject}
        handleFinishedEdit={handleStopEdit}
      />
    </>
  );
};

export default Organisations;
