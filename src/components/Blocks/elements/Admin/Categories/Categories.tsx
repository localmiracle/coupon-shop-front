import React, { FC, useEffect, useState } from "react";
import styles from "./Categories.module.css";
import $adminApi from "@/http";
import CategoryForm from "./CategoryForm/CategoryForm";
import Modal from "@/components/UI/Modals/Modal";

type Category = {
  id: string;
  name: string;
  subcategory?: boolean;
};

const Categories: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [affirmationObject, setAffirmationObject] = useState<Category>();
  const [editedObject, setEditedObject] = useState<Category>();

  const updateCategories = async () => {
    try {
      const { data } = await $adminApi.get("category");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id: any) => {
    try {
      const { status } = await $adminApi.delete(`category/${id}`);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateCategories();
  }, []);

  const toggleAffirmation = (category: Category) => {
    if (affirmationObject?.id === category.id) setAffirmationObject(undefined);
    else setAffirmationObject(category);
  };

  const handleEdit = (category: Category) => {
    setEditedObject(category);
    setAffirmationObject(undefined);
  };

  const handleStopEdit = () => {
    setEditedObject(undefined);
  };

  const handleDelete = async (category: Category) => {
    await deleteCategory(category.id);
    updateCategories();
  };

  return (
    <>
      <div className={styles.list}>
        <h2>Категории</h2>
        <div className={styles.rows}>
          {categories.map((category) => (
            <div key={category.id}>
              <div className={styles.row}>
                <p>{category.name}</p>
                <div className={styles.modify_panel}>
                  {editedObject?.id === category.id ? (
                    <p className={styles.cancel} onClick={handleStopEdit}>
                      Отмена
                    </p>
                  ) : (
                    <>
                      
                        <>
                          <p
                            className={styles.modify}
                            onClick={() => handleEdit(category)}
                          >
                            Редактировать
                          </p>
                          <p>|</p>
                        </>
                      
                      <p>
                        {affirmationObject?.id === category.id ? (
                          <>
                            <span
                              className={styles.delete}
                              onClick={() => handleDelete(category)}
                            >
                              Удалить
                            </span>
                            <span> / </span>
                            <span className={styles.cancel} onClick={() => toggleAffirmation(category)}>Отмена</span>
                          </>
                        ) : (
                          <span className={styles.delete} onClick={() => toggleAffirmation(category)}>Удалить</span>
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
      <CategoryForm
        updateObjectCallback={updateCategories}
        editedObject={editedObject}
        handleFinishedEdit={handleStopEdit}
      />
    </>
  );
};

export default Categories;
