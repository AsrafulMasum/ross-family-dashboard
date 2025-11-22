import { Button, ConfigProvider, Input, Select, Table } from 'antd';
import { useState } from 'react';
import UserModal from '../../../components/modals/UserModal';
import BlockModal from './BlockModal';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CiCircleInfo, CiLock, CiUnlock } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { User } from '../../../types/types';

const { Option } = Select;

const canadianCities = [
    'Toronto',
    'Vancouver',
    'Montreal',
    'Calgary',
    'Edmonton',
    'Ottawa',
    'Winnipeg',
    'Quebec City',
    'Hamilton',
    'Kitchener',
    'London',
    'Victoria',
    'Halifax',
    'Oshawa',
    'Windsor',
    'Saskatoon',
    'Regina',
    'St. Johns',
    'Barrie',
    'Kelowna',
    'Abbotsford',
    'Sherbrooke',
    'Guelph',
    'Kingston',
    'Forfield', // From your original data
    'Noperville', // From your original data
    'Orange', // From your original data
    'Toledo', // From your original data
    'Austin', // From your original data
];

const userData: User[] = [
    {
        key: '1',
        serialId: 'USR-2001',
        userName: 'Liam Carter',
        email: 'liam.carter@example.com',
        address: '12 Maple Street, Apt 3B',
        city: 'Toronto',
        createdAt: '2025-11-05',
        country: 'Canada',
        status: 'active',
    },
    {
        key: '2',
        serialId: 'USR-2002',
        userName: 'Emma Wilson',
        email: 'emma.wilson@example.com',
        address: '78 Pine Avenue',
        city: 'Vancouver',
        createdAt: '2025-10-20',
        country: 'Canada',
        status: 'inactive',
    },
    {
        key: '3',
        serialId: 'USR-2003',
        userName: 'Noah Thompson',
        email: 'noah.thompson@example.com',
        address: '34 Oak Crescent',
        city: 'Montreal',
        createdAt: '2025-09-15',
        country: 'Canada',
        status: 'active',
    },
    {
        key: '4',
        serialId: 'USR-2004',
        userName: 'Ava Martinez',
        email: 'ava.martinez@example.com',
        address: '210 7th Street SE',
        city: 'Calgary',
        createdAt: '2025-08-10',
        country: 'Canada',
        status: 'inactive',
    },
    {
        key: '5',
        serialId: 'USR-2005',
        userName: 'Ethan Brown',
        email: 'ethan.brown@example.com',
        address: '14 King Street, Downtown',
        city: 'Ottawa',
        createdAt: '2025-07-02',
        country: 'Canada',
        status: 'active',
    },
    {
        key: '6',
        serialId: 'USR-2006',
        userName: 'Sophia Lee',
        email: 'sophia.lee@example.com',
        address: '520 Jasper Ave NW',
        city: 'Edmonton',
        createdAt: '2025-06-28',
        country: 'Canada',
        status: 'active',
    },
    {
        key: '7',
        serialId: 'USR-2007',
        userName: 'Mason Clark',
        email: 'mason.clark@example.com',
        address: '321 Broadway Ave',
        city: 'Winnipeg',
        createdAt: '2025-05-18',
        country: 'Canada',
        status: 'inactive',
    },
    {
        key: '8',
        serialId: 'USR-2008',
        userName: 'Isabella Scott',
        email: 'isabella.scott@example.com',
        address: '55 Rue Saint-Jean',
        city: 'Quebec City',
        createdAt: '2025-04-12',
        country: 'Canada',
        status: 'active',
    },
    {
        key: '9',
        serialId: 'USR-2009',
        userName: 'Lucas Adams',
        email: 'lucas.adams@example.com',
        address: '200 Barrington St',
        city: 'Halifax',
        createdAt: '2025-03-20',
        country: 'Canada',
        status: 'inactive',
    },
    {
        key: '10',
        serialId: 'USR-2010',
        userName: 'Mia Johnson',
        email: 'mia.johnson@example.com',
        address: '99 Main St W',
        city: 'Hamilton',
        createdAt: '2025-02-15',
        country: 'Canada',
        status: 'active',
    },
];

export default function Users({ dashboard }: { dashboard?: boolean }) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    const [userToBlock, setUserToBlock] = useState<User | null>(null);

    const showUserDetails = (user: User) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const showBlockModal = (user: User) => {
        setUserToBlock(user);
        setIsBlockModalVisible(true);
    };

    const handleBlockConfirm = () => {
        // Handle block user logic here
        console.log('Blocking user:', userToBlock);
        setIsBlockModalVisible(false);
        setUserToBlock(null);
    };

    const handleBlockCancel = () => {
        setIsBlockModalVisible(false);
        setUserToBlock(null);
    };

    const columns = [
        {
            title: 'Serial ID',
            dataIndex: 'serialId',
            key: 'serialId',
            responsive: ['sm'] as any,
        },
        {
            title: 'Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'] as any,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            responsive: ['lg'] as any,
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            responsive: ['lg'] as any,
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }: {
                setSelectedKeys?: (keys: React.Key[]) => void;
                selectedKeys?: React.Key[];
                confirm?: () => void;
                clearFilters?: () => void;
            }) => (
                <div style={{ padding: 8 }}>
                    <Select
                        placeholder="Select a Canadian city"
                        value={selectedKeys?.[0] ?? undefined}
                        style={{ width: 200 }}
                        onChange={(value) => {
                            setSelectedKeys?.(value ? [value] : []);
                            confirm?.();
                        }}
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                            (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                        }
                    >
                        {canadianCities?.map((city) => (
                            <Option key={city} value={city}>
                                {city}
                            </Option>
                        ))}
                    </Select>
                    <div style={{ marginTop: 8 }}>
                        <a
                            onClick={() => {
                                clearFilters?.();
                                confirm?.();
                            }}
                            style={{ width: 90, marginRight: 8 }}
                        >
                            Reset
                        </a>
                    </div>
                </div>
            ),
            onFilter: (value: boolean | React.Key, record: User) => record.city === value,
            render: (city: string) => city,
        },
        {
            title: 'Registration Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            responsive: ['sm'] as any,
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            responsive: ['sm'] as any,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: User) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-primary"
                        onClick={() => showUserDetails(record)}
                    />

                    <Button
                        type="text"
                        icon={record?.status == 'active' ? <CiLock size={24} /> : <CiUnlock size={24} />}
                        className={
                            record?.status == 'active'
                                ? 'text-gray-500 hover:!text-red-500'
                                : 'hover:!text-gray-500 !text-red-500'
                        }
                        onClick={() => showBlockModal(record)}
                    />
                    <Button
                        type="text"
                        icon={<MdOutlineDeleteOutline size={24} />}
                        className={'text-red-400 hover:!text-red-500'}
                        onClick={() => showBlockModal(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title="Users" />
                    <Input
                        placeholder="Search"
                        className=""
                        style={{ width: 280, height: 40 }}
                        prefix={<i className="bi bi-search"></i>}
                    />
                </div>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: '#59A817',
                        },
                    }}
                >
                    <Table
                        columns={columns}
                        dataSource={userData}
                        pagination={dashboard ? false : { pageSize: 9, total: userData.length }}
                        className="custom-table"
                    />
                </ConfigProvider>
            </div>

            <UserModal open={isModalVisible} onCancel={handleModalClose} selectedUser={selectedUser} />

            <BlockModal
                isBlockModalVisible={isBlockModalVisible}
                handleBlockCancel={handleBlockCancel}
                handleBlockConfirm={handleBlockConfirm}
                isUserBlocked={userToBlock?.status !== 'active'}
            />
        </>
    );
}
