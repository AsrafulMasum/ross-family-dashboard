import type React from 'react';
import { Modal, Form, Input, Button, ConfigProvider } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddCustomerModal: React.FC<Props> = ({ open, onClose }) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        console.log('Sign up form submitted:', values);
        onClose();
        form.resetFields();
    };

    const handleModalClose = () => {
        onClose();
        form.resetFields();
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
            <Modal open={open} onCancel={handleModalClose} footer={null} centered width={450}>
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold mb-2">Add A Customer</h2>
                    <p className="text-sm text-gray-600">Add A Customer to join the Family Eats community.</p>
                </div>

                <Form layout="vertical" form={form} onFinish={handleFinish}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                        <Input placeholder="Enter name" prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item
                        label="Enter email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input placeholder="Enter email" prefix={<MailOutlined />} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input.Password placeholder="Enter password" prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            { required: true, message: 'Please confirm your password' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm password" prefix={<LockOutlined />} />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                            backgroundColor: '#4CAF50',
                            height: 45,
                            borderRadius: 6,
                            fontWeight: 600,
                            marginTop: 20,
                        }}
                    >
                        Add Customer
                    </Button>
                </Form>
            </Modal>
        </ConfigProvider>
    );
};

export default AddCustomerModal;
