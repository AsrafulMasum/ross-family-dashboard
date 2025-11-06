import { Button, ConfigProvider, Input, Select, Table } from 'antd';
import { useState } from 'react';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CiCircleInfo, CiLock, CiUnlock } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import UserModal from '../users/UserModal';
import BlockModal from '../users/BlockModal';
import { DriverTypes } from '../../../types/types';

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

const userData: DriverTypes[] = [
    {
        key: '1',
        serialId: 'DRV-1001',
        userName: 'John Doe',
        email: 'john.doe@example.com',
        address: '123 King Street W, Apt 12',
        city: 'Toronto',
        vehicleType: 'Car',
        licenseNo: 'ON-2345678',
        files: 'Profile, NID, License',
        status: 'active',
    },
    {
        key: '2',
        serialId: 'DRV-1002',
        userName: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        address: '58 W 5th Ave',
        city: 'Vancouver',
        vehicleType: 'Motorbike',
        licenseNo: 'BC-7865432',
        files: 'Profile, NID',
        status: 'inactive',
    },
    {
        key: '3',
        serialId: 'DRV-1003',
        userName: 'Michael Brown',
        email: 'michael.brown@example.com',
        address: '432 Rue Sainte-Catherine',
        city: 'Montreal',
        vehicleType: 'Car',
        licenseNo: 'QC-1239876',
        files: 'Profile, NID, License',
        status: 'active',
    },
    {
        key: '4',
        serialId: 'DRV-1004',
        userName: 'Emily Davis',
        email: 'emily.davis@example.com',
        address: '89 9th Ave SE',
        city: 'Calgary',
        vehicleType: 'Bicycle',
        licenseNo: 'AB-5647382',
        files: 'Profile, License',
        status: 'inactive',
    },
    {
        key: '5',
        serialId: 'DRV-1005',
        userName: 'Robert Wilson',
        email: 'robert.wilson@example.com',
        address: '35 Queen St',
        city: 'Ottawa',
        vehicleType: 'Car',
        licenseNo: 'ON-9081723',
        files: 'Profile, NID, License',
        status: 'active',
    },
    {
        key: '6',
        serialId: 'DRV-1006',
        userName: 'Olivia Martin',
        email: 'olivia.martin@example.com',
        address: '120 Jasper Ave NW',
        city: 'Edmonton',
        vehicleType: 'Van',
        licenseNo: 'AB-7756210',
        files: 'Profile, License',
        status: 'active',
    },
    {
        key: '7',
        serialId: 'DRV-1007',
        userName: 'Daniel Thompson',
        email: 'daniel.thompson@example.com',
        address: '21 Broadway Ave',
        city: 'Winnipeg',
        vehicleType: 'Motorbike',
        licenseNo: 'MB-4556239',
        files: 'Profile, NID',
        status: 'inactive',
    },
    {
        key: '8',
        serialId: 'DRV-1008',
        userName: 'Sophia White',
        email: 'sophia.white@example.com',
        address: '88 Rue Saint-Jean',
        city: 'Quebec City',
        vehicleType: 'Car',
        licenseNo: 'QC-9988123',
        files: 'Profile, NID, License',
        status: 'active',
    },
    {
        key: '9',
        serialId: 'DRV-1009',
        userName: 'James Anderson',
        email: 'james.anderson@example.com',
        address: '200 Barrington St',
        city: 'Halifax',
        vehicleType: 'Bicycle',
        licenseNo: 'NS-3388271',
        files: 'Profile',
        status: 'inactive',
    },
    {
        key: '10',
        serialId: 'DRV-1010',
        userName: 'Ava Taylor',
        email: 'ava.taylor@example.com',
        address: '75 Main St W',
        city: 'Hamilton',
        vehicleType: 'Car',
        licenseNo: 'ON-4467890',
        files: 'Profile, License',
        status: 'active',
    },
];

export default function Drivers({ dashboard }: { dashboard?: boolean }) {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<DriverTypes | null>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    const [userToBlock, setUserToBlock] = useState<DriverTypes | null>(null);

    const showUserDetails = (user: DriverTypes) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    const showBlockModal = (user: DriverTypes) => {
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
            onFilter: (value: boolean | React.Key, record: DriverTypes) => record.city === value,
            render: (city: string) => city,
        },
        {
            title: 'Vehicle Type',
            dataIndex: 'vehicleType',
            key: 'vehicleType',
            responsive: ['sm'] as any,
        },
        {
            title: 'License No.',
            dataIndex: 'licenseNo',
            key: 'licenseNo',
            responsive: ['sm'] as any,
        },
        {
            title: 'Uploaded Files',
            dataIndex: 'files',
            key: 'files',
            responsive: ['sm'] as any,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: DriverTypes) => (
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
