"use client";
import { Button, Flex, Form, Modal, Input } from "antd";
import {
    createNewUser,
} from "@/lib/features/users/userSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Users } from "../components/users/Users";
import { PlusOutlined } from '@ant-design/icons';
import { useState } from "react";

export default function UsersPage() {
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    type FieldType = {
        name?: string;
        job?: string;
      };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleFinish = (values: any) => {
    dispatch(createNewUser(values))
  }
  
  const handleOk = (values: any) => {
    form.submit()
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
        <Flex dir="row" justify="center" align="center" gap={30}>
            <h1>Users page</h1>
            <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={showModal}/>
        </Flex>
        <Users />
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form form={form} layout="vertical" autoComplete="off" onFinish={handleFinish}>
            <Form.Item<FieldType>
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Please input your name!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Job"
      name="job"
      rules={[{ required: true, message: 'Please input your job!' }]}
    >
      <Input />
    </Form.Item>
            </Form>
      </Modal>
    </>
  );
}