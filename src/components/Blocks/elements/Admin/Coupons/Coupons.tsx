import React, { FC, useEffect, useState } from "react";
import ProductList from "../../ProductList/ProductList";
import styles from "./Coupons.module.css";
import Modal from "@/components/UI/Modals/Modal";
import CouponForm from "./CouponForm/CouponForm";
import $adminApi from "@/http/adminClient";
import Product from "../../Product/Product";

type Coupon = {
  id: string;
  image: File;
  content_url: string;
  name: string;
  description: string;
  level: number;
  price: number;
  discount: number;
  region: string;
  category: string;
  subcategory: string | null;
};

const Coupons: FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [affirmationObject, setAffirmationObject] = useState<Coupon>();
  const [editedObject, setEditedObject] = useState<Coupon>();
  const [previewObject, setPreviewObject] = useState<Coupon>();

  const updateCoupons = async () => {
    try {
      const { data } = await $adminApi.get("coupon");
      setCoupons(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCoupon = async (id: any) => {
    try {
      const { status } = await $adminApi.delete(`coupon/${id}`);
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateCoupons();
  }, []);

  const toggleAffirmation = (coupon: Coupon) => {
    if (affirmationObject?.id === coupon.id) setAffirmationObject(undefined);
    else setAffirmationObject(coupon);
  };

  const togglePreview = (coupon: Coupon) => {
    if (previewObject?.id === coupon.id) setPreviewObject(undefined);
    else setPreviewObject(coupon);
  };

  const handleEdit = (coupon: Coupon) => {
    setEditedObject(coupon);
    setAffirmationObject(undefined);
  };

  const handleStopEdit = () => {
    setEditedObject(undefined);
  };

  const handleDelete = async (coupon: Coupon) => {
    await deleteCoupon(coupon.id);
    updateCoupons();
  };

  return (
    <>
      <div className={styles.list}>
        <h2>Купоны</h2>
        <div className={styles.rows}>
          {coupons.map((coupon) => (
            <div key={coupon.id}>
              <div className={styles.row}>
                <p>{coupon.name}</p>
                <div className={styles.modify_panel}>
                  <p
                    className={styles.cancel}
                    onClick={() => togglePreview(coupon)}
                  >
                    Превью {previewObject?.id === coupon.id ? "↑" : "↓"}
                  </p>
                  <p>|</p>
                  {editedObject?.id === coupon.id ? (
                    <p className={styles.cancel} onClick={handleStopEdit}>
                      Отмена
                    </p>
                  ) : (
                    <>
                      <>
                        <p
                          className={styles.modify}
                          onClick={() => handleEdit(coupon)}
                        >
                          Редактировать
                        </p>
                        <p>|</p>
                      </>

                      <p>
                        {affirmationObject?.id === coupon.id ? (
                          <>
                            <span
                              className={styles.delete}
                              onClick={() => handleDelete(coupon)}
                            >
                              Удалить
                            </span>
                            <span> / </span>
                            <span
                              className={styles.cancel}
                              onClick={() => toggleAffirmation(coupon)}
                            >
                              Отмена
                            </span>
                          </>
                        ) : (
                          <span
                            className={styles.delete}
                            onClick={() => toggleAffirmation(coupon)}
                          >
                            Удалить
                          </span>
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>
              {previewObject?.id === coupon.id && (
                <div className={styles.preview_wrapper}>
                  <Product product={coupon} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <CouponForm
        updateObjectCallback={updateCoupons}
        editedObject={editedObject}
        handleFinishedEdit={handleStopEdit}
      />
    </>
  );
};

export default Coupons;
