import React, { useState, useEffect, FC } from "react";
import styles from './CouponForm.module.css'

interface CouponFormProps{
    coupon: any;
    
    onDelete: any;
    onEdit:any;
}

const CouponForm:FC<CouponFormProps> =({ coupon, onDelete, onEdit }) =>{
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mini_desc, setMiniDesc] = useState('')
  useEffect(() => {
    if (coupon) {
      setTitle(coupon.title);
      setDescription(coupon.description);
    }
  }, [coupon]);

  const handleTitleChange = (e:any) => {
    onEdit({ ...coupon, title: e.target.value });
  };

  const handleDescriptionChange = (e: any) => {
    onEdit({ ...coupon, description: e.target.value });
  };

  const handleMiniDescChange = (e: any) => {
    onEdit({ ...coupon, mini_desc: e.target.value });
  };
  const handleDelete = () => {
    onDelete(coupon.id);
  };

  return (
    <form className={styles.editForm}>
        <div className={styles.formwrapper}>
            <h4 style={{textAlign: 'center'}}>Измените название</h4>
            <input type="text" value={title} onChange={handleTitleChange} style={{maxWidth: '150px', borderRadius: '10px'}}/>
            <h4>Измените мини-описание</h4>
            <textarea style={{maxWidth: '250px',maxHeight:'100px', borderRadius: '10px'}} value={description} onChange={handleDescriptionChange} />
            <h4>Измените описание</h4>
            <textarea style={{maxWidth: '250px',maxHeight:'100px', borderRadius: '10px'}} value={mini_desc} onChange={handleMiniDescChange}/>
            <button>Сохранить изменения</button>
            {coupon && <button onClick={handleDelete}>Delete</button>}
        </div>
    </form>
  );
}

export default CouponForm;