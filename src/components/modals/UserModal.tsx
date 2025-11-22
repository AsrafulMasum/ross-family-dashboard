import React from 'react';
import { Modal, Descriptions, Avatar, Badge } from 'antd';
import { ChefsTypes } from '../../types/types';

interface Props {
    open: boolean;
    onCancel: () => void;
    selectedUser: ChefsTypes | null;
}

const UserModal: React.FC<Props> = ({ open, onCancel, selectedUser }) => {
    if (!selectedUser) return null;

    const infoFields: { label: string; value?: string | null; isLink?: boolean }[] = [
        { label: 'Serial ID', value: selectedUser.id?.toString() },
        { label: 'Username', value: selectedUser.username },
        { label: 'Email', value: selectedUser.email },
        { label: 'Address', value: selectedUser.address },
        { label: 'City', value: selectedUser.city },
        { label: 'Region', value: selectedUser.region },
        { label: 'Country', value: selectedUser.country },
        { label: 'Cuisine Type', value: selectedUser.cuisineType },
        { label: 'Certificate', value: selectedUser.certificateFile, isLink: true },
        { label: 'Created At', value: selectedUser.createdAt },
        { label: 'Status', value: selectedUser.status },
    ];

    return (
        <Modal
            title="Chef Details"
            open={open}
            onCancel={onCancel}
            footer={null}
            width={600}
            centered
            bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
        >
            {/* Profile Header */}
            <div className="flex items-start gap-6 mb-6 border-b border-gray-200 pb-6">
                {selectedUser.avatar && (
                    <Avatar size={96} src={selectedUser.avatar} className="border-4 border-gray-100" />
                )}

                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
                        {selectedUser.verified && <Badge color="green" text="Verified" className="ml-2" />}
                    </div>
                    {selectedUser.username && <p className="text-gray-500 mb-4">@{selectedUser.username}</p>}

                    {/* Info Grid */}
                    <Descriptions column={1} bordered size="small">
                        {infoFields.map(
                            (field) =>
                                field.value && (
                                    <Descriptions.Item key={field.label} label={field.label}>
                                        {field.isLink ? (
                                            <a
                                                href={field.value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600"
                                            >
                                                View File
                                            </a>
                                        ) : (
                                            field.value
                                        )}
                                    </Descriptions.Item>
                                ),
                        )}
                    </Descriptions>
                </div>
            </div>
        </Modal>
    );
};

export default UserModal;
