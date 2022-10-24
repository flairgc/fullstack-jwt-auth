import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { IUser } from "../models/IUser";
import UserService from "../services/UserService";

const UserList: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log("getUsers", e);
    }
  }

  return isLoading ? (
    <span>-</span>
  ) : (
    <>
      <div>
        <button onClick={() => getUsers()}>Получить пользователей</button>
      </div>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </>
  );
};

export default UserList;
