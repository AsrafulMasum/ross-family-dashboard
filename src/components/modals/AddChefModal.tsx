import { useState } from 'react';
import { Modal, Form, Input, Select, ConfigProvider } from 'antd';
import { HomeOutlined, MailOutlined } from '@ant-design/icons';

const CUISINE_OPTIONS = [
    { label: '🇫🇷 France', value: 'france' },
    { label: '🇮🇹 Italy', value: 'italy' },
    { label: '🇯🇵 Japan', value: 'japan' },
    { label: '🇮🇳 India', value: 'india' },
    { label: '🇲🇽 Mexico', value: 'mexico' },
    { label: '🇹🇭 Thailand', value: 'thailand' },
    { label: '🇨🇳 China', value: 'china' },
    { label: '🇪🇸 Spain', value: 'spain' },
];

const COUNTRY_OPTIONS = [
    { label: 'United States', value: 'usa' },
    { label: 'Canada', value: 'canada' },
    { label: 'France', value: 'france' },
    { label: 'Italy', value: 'italy' },
    { label: 'Germany', value: 'germany' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Japan', value: 'japan' },
    { label: 'Australia', value: 'australia' },
];

const REGION_OPTIONS = [
    { label: 'North', value: 'north' },
    { label: 'South', value: 'south' },
    { label: 'East', value: 'east' },
    { label: 'West', value: 'west' },
    { label: 'Central', value: 'central' },
];

interface CustomerInfoModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddChefModal({ open, onClose }: CustomerInfoModalProps) {
    const [form] = Form.useForm();
    const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);

    const handleCuisineChange = (value: string[]) => {
        setSelectedCuisines(value);
        form.setFieldValue('cuisines', value);
    };

    const handleSubmit = async () => {
        try {
            await form.validateFields();
            console.log('Form values:', form.getFieldsValue());
            onClose();
            form.resetFields();
            setSelectedCuisines([]);
        } catch (error) {
            console.error('Validation failed');
        }
    };

    const handleClose = () => {
        form.resetFields();
        setSelectedCuisines([]);
        onClose();
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
            <Modal open={open} onCancel={handleClose} footer={null} width={500} centered>
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold mb-2">Add A Chef</h2>
                    <p className="text-sm text-gray-600">Add A Chef to join the Family Eats community.</p>
                </div>
                <Form form={form} layout="vertical" className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Your Cuisine Expertise</label>
                        <Select
                            mode="multiple"
                            placeholder="select your expertise"
                            options={CUISINE_OPTIONS}
                            value={selectedCuisines}
                            onChange={handleCuisineChange}
                            className="w-full"
                            style={{ width: '100%' }}
                        />
                    </div>

                    <Form.Item
                        name="country"
                        label={<span className="text-sm font-medium">Country</span>}
                        rules={[{ required: true, message: 'Please select a country' }]}
                    >
                        <Select
                            placeholder="select your country"
                            options={COUNTRY_OPTIONS}
                            className="w-full"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label={<span className="text-sm font-medium">Address</span>}
                        rules={[{ required: true, message: 'Please enter your address' }]}
                    >
                        <Input placeholder="enter your address" prefix={<HomeOutlined className="text-gray-400" />} />
                    </Form.Item>

                    <Form.Item
                        name="zipCode"
                        label={<span className="text-sm font-medium">Zip Code</span>}
                        rules={[{ required: true, message: 'Please enter your zip code' }]}
                    >
                        <Input placeholder="enter zip code" prefix={<MailOutlined className="text-gray-400" />} />
                    </Form.Item>

                    <Form.Item
                        name="region"
                        label={<span className="text-sm font-medium">Region</span>}
                        rules={[{ required: true, message: 'Please select a region' }]}
                    >
                        <Select
                            placeholder="select region"
                            options={REGION_OPTIONS}
                            className="w-full"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors mt-6"
                    >
                        Add Chef
                    </button>
                </Form>
            </Modal>
        </ConfigProvider>
    );
}
