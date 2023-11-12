import { FC, useEffect, useState } from "react";
import styles from "./OrganisationMembers.module.css";
import $adminApi from "@/http/adminClient";

interface OrganisationMembersProps {
  organisation: any;
}

type Member = {
  id: string;
  email: string;
  name: string;
  second_name: string;
  organization_ID: string;
  role: string;
};

const OrganisationMembers: FC<OrganisationMembersProps> = ({
  organisation,
}) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userFirstName, setUserFirstName] = useState<string>("");
  const [userLastName, setUserLastName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("user");
  const [error, setError] = useState<string>("");
  const [showMembers, setShowMembers] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [affirmationObject, setAffirmationObject] = useState<Member>();
  const [editedObject, setEditedObject] = useState<Member>();

  const updateMembers = async () => {
    try {
      const { data } = await $adminApi.get(`organization/${organisation.id}`);
      setMembers(data?.members);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMember = async (email: string) => {
    const data = {
      email: email,
    };
    try {
      const { status } = await $adminApi.delete(
        `organization/members/${organisation.id}`,
        { data: JSON.stringify([data]) }
      );
      return status;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editedObject) {
      setUserEmail(editedObject.email);
      setUserFirstName(editedObject.name);
      setUserLastName(editedObject.second_name);
      setUserRole(editedObject.role);
    } else {
      resetState();
    }
  }, [editedObject]);

  useEffect(() => {
    updateMembers();
  }, []);

  const resetState = () => {
    setUserEmail("");
    setUserFirstName("");
    setUserLastName("");
    setUserRole("user");
    setError("");
  };

  const handleEdit = (member: Member) => {
    setEditedObject(member);
    setAffirmationObject(undefined);
  };

  const handleStopEdit = () => {
    setEditedObject(undefined);
  };

  const handleDelete = async (member: Member) => {
    await deleteMember(member.email);
    updateMembers();
  };

  const toggleAffirmation = (member: Member) => {
    if (affirmationObject?.id === member.id) setAffirmationObject(undefined);
    else setAffirmationObject(member);
  };

  const getRoleString = (role: string) => {
    switch (role) {
      case "user":
        return "Пользователь";
      case "editor":
        return "Редактор";
      case "owner":
        return "Владелец";
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: any = {};
    formData["email"] = userEmail;
    formData["organization_ID"] = organisation.id;

    if (editedObject) {
      if (editedObject.name !== userFirstName) formData["name"] = userFirstName;
      if (editedObject.second_name !== userLastName)
        formData["second_name"] = userLastName;
      if (editedObject.role !== userRole) formData["role"] = userRole;

      try {
        await $adminApi.put(
          `/organization/members/${organisation.id}`,
          JSON.stringify([formData])
        );
        updateMembers();
        handleStopEdit();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при добавлении пользователя");
        console.log(e);
      }
    } else {
      formData["name"] = userFirstName;
      formData["second_name"] = userLastName;
      formData["role"] = userRole;

      try {
        await $adminApi.post(
          `/organization/members/${organisation.id}`,
          JSON.stringify([formData])
        );
        updateMembers();
        resetState();
      } catch (e) {
        setError("Произошла ошибка при добавлении пользователя");
        console.log(e);
      }
    }
  };

  return (
    <div className={styles.members}>
      <form action="" className={styles.form}>
        {editedObject ? (
          <h3>Редактировать пользователя</h3>
        ) : (
          <h3>Добавить пользователя</h3>
        )}
        <div className={styles.form_field}>
          <label htmlFor="user-email">Email</label>
          <input
            type="email"
            id="user-email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className={styles.form_field}>
          <label htmlFor="user-fname">Имя</label>
          <input
            type="text"
            id="user-fname"
            value={userFirstName}
            onChange={(e) => setUserFirstName(e.target.value)}
          />
        </div>
        <div className={styles.form_field}>
          <label htmlFor="user-lname">Фамилия</label>
          <input
            type="text"
            id="user-lname"
            value={userLastName}
            onChange={(e) => setUserLastName(e.target.value)}
          />
        </div>
        <div className={styles.form_field}>
          <label htmlFor="user-role">Роль</label>
          <select
            id="user-role"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            required
          >
            <option value="user">Пользователь</option>
            <option value="owner">Владелец</option>
            <option value="editor">Редактор</option>
          </select>
        </div>
        <div className={styles.button_wrapper}>
          <button onClick={submit}>
            {editedObject ? "Сохранить" : "Добавить"}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <div className={styles.members}>
        <h3>Пользователи</h3>
        <p
          className={styles.members_dropdown_label}
          onClick={() => setShowMembers(!showMembers)}
        >
          <span>Показать список пользователей </span>
          <span>{showMembers ? "↑" : "↓"}</span>
        </p>
        <div
          className={styles.members_list}
          style={showMembers ? { display: "flex" } : { display: "none" }}
        >
          <table className={styles.members_table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Имя</th>
                <th>Роль</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.email}</td>
                  <td>{member.name + " " + member.second_name}</td>
                  <td>{getRoleString(member.role)}</td>
                  <td>
                    {editedObject?.id === member.id ? (
                      <p className={styles.cancel} onClick={handleStopEdit}>
                        Отмена
                      </p>
                    ) : (
                      <>
                        <>
                          <p
                            className={styles.modify}
                            onClick={() => handleEdit(member)}
                          >
                            Редактировать
                          </p>
                        </>

                        <p>
                          {affirmationObject?.id === member.id ? (
                            <>
                              <span
                                className={styles.delete}
                                onClick={() => handleDelete(member)}
                              >
                                Удалить
                              </span>
                              <span> / </span>
                              <span
                                className={styles.cancel}
                                onClick={() => toggleAffirmation(member)}
                              >
                                Отмена
                              </span>
                            </>
                          ) : (
                            <span
                              className={styles.delete}
                              onClick={() => toggleAffirmation(member)}
                            >
                              Удалить
                            </span>
                          )}
                        </p>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrganisationMembers;
