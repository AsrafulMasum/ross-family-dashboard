import { Button, ConfigProvider, Input, Select, Table } from 'antd';
import { useState } from 'react';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CiCircleInfo, CiLock, CiUnlock } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import UserModal from '../users/UserModal';
import BlockModal from '../users/BlockModal';
import { ChefsTypes } from '../../../types/types';

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

const driverData = [
    {
        serialId: 'DRV-001',
        userName: 'James Anderson',
        email: 'james.anderson@example.com',
        address: '123 Maple Street',
        city: 'Toronto',
        createdAt: '2025-01-15',
        totalOrder: 120,
        revenue: 5400,
        status: 'active',
    },
    {
        serialId: 'DRV-002',
        userName: 'Sophia Turner',
        email: 'sophia.turner@example.com',
        address: '78 Wellington Ave',
        city: 'Vancouver',
        createdAt: '2025-02-10',
        totalOrder: 87,
        revenue: 3600,
        status: 'inactive',
    },
    {
        serialId: 'DRV-003',
        userName: 'Liam Brown',
        email: 'liam.brown@example.com',
        address: '45 Elm Road',
        city: 'Calgary',
        createdAt: '2025-03-05',
        totalOrder: 142,
        revenue: 7100,
        status: 'active',
    },
    {
        serialId: 'DRV-004',
        userName: 'Olivia Wilson',
        email: 'olivia.wilson@example.com',
        address: '256 King Street West',
        city: 'Ottawa',
        createdAt: '2025-04-12',
        totalOrder: 75,
        revenue: 2900,
        status: 'inactive',
    },
    {
        serialId: 'DRV-005',
        userName: 'Noah Smith',
        email: 'noah.smith@example.com',
        address: '98 Queen Street',
        city: 'Montreal',
        createdAt: '2025-05-20',
        totalOrder: 102,
        revenue: 4700,
        status: 'active',
    },
    {
        serialId: 'DRV-006',
        userName: 'Emma Johnson',
        email: 'emma.johnson@example.com',
        address: '12 Pine Avenue',
        city: 'Edmonton',
        createdAt: '2025-06-08',
        totalOrder: 91,
        revenue: 4100,
        status: 'active',
    },
    {
        serialId: 'DRV-007',
        userName: 'William Davis',
        email: 'william.davis@example.com',
        address: '77 Spruce Street',
        city: 'Winnipeg',
        createdAt: '2025-07-01',
        totalOrder: 134,
        revenue: 6200,
        status: 'inactive',
    },
    {
        serialId: 'DRV-008',
        userName: 'Ava Martinez',
        email: 'ava.martinez@example.com',
        address: '31 Birch Road',
        city: 'Halifax',
        createdAt: '2025-07-22',
        totalOrder: 66,
        revenue: 2700,
        status: 'active',
    },
    {
        serialId: 'DRV-009',
        userName: 'Lucas Garcia',
        email: 'lucas.garcia@example.com',
        address: '90 King Edward Blvd',
        city: 'Quebec City',
        createdAt: '2025-08-11',
        totalOrder: 110,
        revenue: 4800,
        status: 'inactive',
    },
    {
        serialId: 'DRV-010',
        userName: 'Mia Rodriguez',
        email: 'mia.rodriguez@example.com',
        address: '54 Richmond Street',
        city: 'Regina',
        createdAt: '2025-09-02',
        totalOrder: 99,
        revenue: 3900,
        status: 'active',
    },
];

export default function Chefs({ dashboard }: { dashboard?: boolean }) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<ChefsTypes | null>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    const [userToBlock, setUserToBlock] = useState<ChefsTypes | null>(null);

    const showUserDetails = (user: ChefsTypes) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const showBlockModal = (user: ChefsTypes) => {
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
            onFilter: (value: boolean | React.Key, record: ChefsTypes) => record.city === value,
            render: (city: string) => city,
        },
        {
            title: 'Registration Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            responsive: ['sm'] as any,
        },
        {
            title: 'Total Order',
            dataIndex: 'totalOrder',
            key: 'totalOrder',
            responsive: ['sm'] as any,
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            responsive: ['sm'] as any,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: ChefsTypes) => (
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
                        dataSource={driverData}
                        pagination={dashboard ? false : { pageSize: 9, total: driverData.length }}
                        className="custom-table"
                    />
                </ConfigProvider>
            </div>

            <UserModal
                isModalVisible={isModalVisible}
                handleModalClose={handleModalClose}
                selectedUser={selectedUser}
            />

            <BlockModal
                isBlockModalVisible={isBlockModalVisible}
                handleBlockCancel={handleBlockCancel}
                handleBlockConfirm={handleBlockConfirm}
                isUserBlocked={userToBlock?.status !== 'active'}
            />
        </>
    );
}
