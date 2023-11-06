import React, { FC, useEffect, useState } from "react";
import styles from "./Regions.module.css";
import $adminApi from "@/http/adminClient";
import RegionForm from "./RegionForm/RegionForm";

type Region = {
  id: string;
  name: string;
};

const Regions: FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);
  const [affirmationObject, setAffirmationObject] = useState<Region>();
  const [editedObject, setEditedObject] = useState<Region>();

  const updateRegions = async () => {
    try {
      const { data } = await $adminApi.get("region");
      setRegions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRegion = async (id: any) => {
    try {
      const { status } = await $adminApi.delete(`region/${id}`);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateRegions();
  }, []);

  const toggleAffirmation = (region: Region) => {
    if (affirmationObject?.id === region.id) setAffirmationObject(undefined);
    else setAffirmationObject(region);
  };

  const handleEdit = (region: Region) => {
    setEditedObject(region);
    setAffirmationObject(undefined);
  };

  const handleStopEdit = () => {
    setEditedObject(undefined);
  };

  const handleDelete = async (region: Region) => {
    await deleteRegion(region.id);
    updateRegions();
  };

  return (
    <>
      <div className={styles.list}>
        <h2>Регионы</h2>
        <div className={styles.rows}>
          {regions.map((region) => (
            <div key={region.id}>
              <div className={styles.row}>
                <p>{region.name}</p>
                <div className={styles.modify_panel}>
                  {editedObject?.id === region.id ? (
                    <p className={styles.cancel} onClick={handleStopEdit}>
                      Отмена
                    </p>
                  ) : (
                    <>
                      
                        <>
                          <p
                            className={styles.modify}
                            onClick={() => handleEdit(region)}
                          >
                            Редактировать
                          </p>
                          <p>|</p>
                        </>
                      
                      <p>
                        {affirmationObject?.id === region.id ? (
                          <>
                            <span
                              className={styles.delete}
                              onClick={() => handleDelete(region)}
                            >
                              Удалить
                            </span>
                            <span> / </span>
                            <span className={styles.cancel} onClick={() => toggleAffirmation(region)}>Отмена</span>
                          </>
                        ) : (
                          <span className={styles.delete} onClick={() => toggleAffirmation(region)}>Удалить</span>
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <RegionForm
        updateObjectCallback={updateRegions}
        editedObject={editedObject}
        handleFinishedEdit={handleStopEdit}
      />
    </>
  );
};

export default Regions;
