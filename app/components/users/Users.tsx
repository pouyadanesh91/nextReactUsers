"use client";
import {
    reload,
    updateOldUser,
    deleteOldUser,
    selectUsers,
    selectStatus,
} from "@/lib/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "./Users.module.scss";
import { List, Avatar } from "antd";
import { useEffect } from "react";

export const Users = () => {
    const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const status = useAppSelector(selectStatus);

  
  useEffect(() => {
    dispatch(reload(2))
  }, [])

  if (status === "failed") {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (status === "idle") {
    return (
        <List
        pagination={{ position:"bottom", align:"center" }}
        dataSource={users}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`${item.avatar}`} />}
              title={<a href="https://ant.design">{`${item.first_name} ${item.last_name}`}</a>}
              description={item.email}
            />
          </List.Item>
        )}
      />
    );
  }

  return null;
}