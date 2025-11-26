import type React from 'react';
import { useState } from 'react';
import { Modal, Form, Input, Row, Col, Upload, Checkbox, Button, ConfigProvider, Radio } from 'antd';
import { CiImageOn } from 'react-icons/ci';

interface Props {
    open: boolean;
    onClose: () => void;
}

const AddDriverModal: React.FC<Props> = ({ open, onClose }) => {
    const [form1] = Form.useForm();
    const [form2] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(1);
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

    const handleFinish = (values: any) => {
        if (currentStep === 1) {
            setCurrentStep(2);
        } else {
            console.log('Final form submission:', values);
            onClose();
            handleModalClose();
        }
    };

    const handlePrevious = () => {
        setCurrentStep(1);
    };

    const handleModalClose = () => {
        onClose();
        form1.resetFields();
        form2.resetFields();
        setCurrentStep(1);
        setIsRegistered(null);
    };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
            <Modal open={open} onCancel={handleModalClose} footer={null} centered width={650}>
                {/* Step 1: Driver Information */}
                {currentStep === 1 && (
                    <>
                        <h2 className="text-center font-semibold text-lg mb-4">
                            Share driver information to join the Family Eats community
                        </h2>

                        <Form layout="vertical" form={form1} onFinish={handleFinish}>
                            <Form.Item label="Address" name="address" rules={[{ required: true }]}>
                                <Input placeholder="Enter your Address" />
                            </Form.Item>

                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item label="Zip Code" name="zipCode" rules={[{ required: true }]}>
                                        <Input placeholder="Enter Zip Code" />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item label="Vehicle Type" name="vehicleType" rules={[{ required: true }]}>
                                        <Input placeholder="Vehicle Type" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item label="License Number" name="licenseNumber" rules={[{ required: true }]}>
                                        <Input placeholder="License Number" />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label="Insurance Number"
                                        name="insuranceNumber"
                                        rules={[{ required: true }]}
                                    >
                                        <Input placeholder="Insurance Number" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Upload License Photo"
                                        name="licensePhoto"
                                        valuePropName="fileList"
                                        getValueFromEvent={(e) => e?.fileList || []}
                                    >
                                        <Upload.Dragger
                                            maxCount={1}
                                            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                                            beforeUpload={() => false}
                                        >
                                            <p className="flex justify-center pb-3">
                                                <CiImageOn size={32} />
                                            </p>
                                            <p>PDF, PNG, JPG or DOC</p>
                                        </Upload.Dragger>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item
                                        label="Upload Insurance Photo"
                                        name="insurancePhoto"
                                        valuePropName="fileList"
                                        getValueFromEvent={(e) => e?.fileList || []}
                                    >
                                        <Upload.Dragger
                                            maxCount={1}
                                            accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                                            beforeUpload={() => false}
                                        >
                                            <p className="flex justify-center pb-3">
                                                <CiImageOn size={32} />
                                            </p>
                                            <p>PDF, PNG, JPG or DOC</p>
                                        </Upload.Dragger>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name="agree"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject('Please accept terms'),
                                    },
                                ]}
                            >
                                <Checkbox>
                                    I certify that all information provided is accurate and truthful. By checking this
                                    box, I confirm that the documents submitted are authentic and that I assume full
                                    responsibility for them.
                                </Checkbox>
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
                                }}
                            >
                                Next
                            </Button>
                        </Form>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <h2 className="text-center font-semibold text-lg mb-6">GST/QST Registration</h2>

                        <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
                            <p>
                                You don't need GST/QST to get started. As long as you earn less than $30,000 per year,
                                you are considered a small supplier and are not required to collect taxes. If you exceed
                                this threshold, you will need to add them.
                            </p>
                        </div>

                        <Form layout="vertical" form={form2} onFinish={handleFinish}>
                            <Form.Item
                                name="gstRegistrationStatus"
                                rules={[{ required: true, message: 'Please select an option' }]}
                            >
                                <Radio.Group
                                    onChange={(e) => setIsRegistered(e.target.value)}
                                    value={isRegistered}
                                    style={{
                                        display: 'flex',
                                        gap: '4px',
                                    }}
                                >
                                    <div className="mb-4 p-4 border-2 border-gray-200 rounded-lg h-24 flex-1">
                                        <Radio value={true}>
                                            <div className="ml-2">
                                                <p className="font-semibold">I am registered for GST/QST</p>
                                                <p className="text-xs text-gray-600">
                                                    You have a GST/QST number and are required to collect taxes.
                                                </p>
                                            </div>
                                        </Radio>
                                    </div>

                                    <div className="p-4 border-2 border-gray-200 rounded-lg h-24 flex-1">
                                        <Radio value={false}>
                                            <div className="ml-2">
                                                <p className="font-semibold">I am not registered for GST/QST</p>
                                                <p className="text-xs text-gray-600">
                                                    You are considered a small supplier and are not required to collect
                                                    taxes.
                                                </p>
                                            </div>
                                        </Radio>
                                    </div>
                                </Radio.Group>
                            </Form.Item>

                            {isRegistered === true && (
                                <>
                                    <Row gutter={12}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="GST"
                                                name="gst"
                                                rules={[{ required: true, message: 'Please enter GST number' }]}
                                            >
                                                <Input placeholder="enter gst number" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="QST"
                                                name="qst"
                                                rules={[{ required: true, message: 'Please enter QST number' }]}
                                            >
                                                <Input placeholder="enter qst number" />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <p className="text-xs text-gray-600 mb-4">
                                        Disclaimer: The tax details you provide are used only to apply the correct
                                        GST/QST rules. This does not impact your income or the amount you earn from
                                        orders.
                                    </p>
                                </>
                            )}

                            <Form.Item
                                label="Upload Certificate"
                                name="certificate"
                                valuePropName="fileList"
                                getValueFromEvent={(e) => e?.fileList || []}
                            >
                                <Upload.Dragger
                                    maxCount={1}
                                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                                    beforeUpload={() => false}
                                >
                                    <p className="flex justify-center pb-3">
                                        <CiImageOn size={32} />
                                    </p>
                                    <p>PDF, PNG, JPG or DOC</p>
                                </Upload.Dragger>
                            </Form.Item>

                            <Form.Item
                                name="certifyAccuracy"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject('Please confirm'),
                                    },
                                ]}
                            >
                                <Checkbox>
                                    I certify that all information provided is accurate and truthful. By checking this
                                    box, I confirm that the documents submitted are authentic and that I assume full
                                    responsibility for them.
                                </Checkbox>
                            </Form.Item>

                            <Row gutter={12}>
                                <Col span={12}>
                                    <Button
                                        block
                                        style={{ height: 45, borderRadius: 6, fontWeight: 600 }}
                                        onClick={handlePrevious}
                                    >
                                        Previous
                                    </Button>
                                </Col>
                                <Col span={12}>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        block
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            height: 45,
                                            borderRadius: 6,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </>
                )}
            </Modal>
        </ConfigProvider>
    );
};

export default AddDriverModal;
