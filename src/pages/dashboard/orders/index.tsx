import { Button, ConfigProvider, Input, Select, Table } from 'antd';
import { EyeOutlined, LockOutlined } from '@ant-design/icons';
import type { ColumnType } from 'antd/es/table/interface';
// import { User } from '../../../demo-data/users.data';
// import { useState } from 'react';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { Order } from '../../../types/types';

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

const data: Order[] = [
    {
        key: '1',
        orderNumber: 'ORD-1001',
        customerName: 'John Doe',
        chefName: 'Chef Ramsey',
        itemCount: 5,
        city: 'Toronto',
        price: 120,
        revenue: 600,
        orderData: '2025-11-01',
        deliveryStatus: 'completed',
        status: 'active',
    },
    {
        key: '2',
        orderNumber: 'ORD-1002',
        customerName: 'Jane Smith',
        chefName: 'Chef Oliver',
        itemCount: 3,
        city: 'Vancouver',
        price: 85,
        revenue: 255,
        orderData: '2025-11-02',
        deliveryStatus: 'pending',
        status: 'active',
    },
    {
        key: '3',
        orderNumber: 'ORD-1003',
        customerName: 'Michael Brown',
        chefName: 'Chef Marie',
        itemCount: 7,
        city: 'Montreal',
        price: 150,
        revenue: 1050,
        orderData: '2025-11-03',
        deliveryStatus: 'delivered',
        status: 'inactive',
    },
    {
        key: '4',
        orderNumber: 'ORD-1004',
        customerName: 'Emily Davis',
        chefName: 'Chef Luca',
        itemCount: 2,
        city: 'Calgary',
        price: 60,
        revenue: 120,
        orderData: '2025-11-04',
        deliveryStatus: 'cancelled',
        status: 'inactive',
    },
    {
        key: '5',
        orderNumber: 'ORD-1005',
        customerName: 'Robert Wilson',
        chefName: 'Chef Kim',
        itemCount: 4,
        city: 'Ottawa',
        price: 95,
        revenue: 380,
        orderData: '2025-11-05',
        deliveryStatus: 'completed',
        status: 'active',
    },
    {
        key: '6',
        orderNumber: 'ORD-1001',
        customerName: 'John Doe',
        chefName: 'Chef Ramsey',
        itemCount: 5,
        city: 'Toronto',
        price: 120,
        revenue: 600,
        orderData: '2025-11-01',
        deliveryStatus: 'completed',
        status: 'active',
    },
    {
        key: '7',
        orderNumber: 'ORD-1002',
        customerName: 'Jane Smith',
        chefName: 'Chef Oliver',
        itemCount: 3,
        city: 'Vancouver',
        price: 85,
        revenue: 255,
        orderData: '2025-11-02',
        deliveryStatus: 'pending',
        status: 'active',
    },
    {
        key: '8',
        orderNumber: 'ORD-1003',
        customerName: 'Michael Brown',
        chefName: 'Chef Marie',
        itemCount: 7,
        city: 'Montreal',
        price: 150,
        revenue: 1050,
        orderData: '2025-11-03',
        deliveryStatus: 'delivered',
        status: 'inactive',
    },
    {
        key: '9',
        orderNumber: 'ORD-1004',
        customerName: 'Emily Davis',
        chefName: 'Chef Luca',
        itemCount: 2,
        city: 'Calgary',
        price: 60,
        revenue: 120,
        orderData: '2025-11-04',
        deliveryStatus: 'cancelled',
        status: 'inactive',
    },
    {
        key: '10',
        orderNumber: 'ORD-1005',
        customerName: 'Robert Wilson',
        chefName: 'Chef Kim',
        itemCount: 4,
        city: 'Ottawa',
        price: 95,
        revenue: 380,
        orderData: '2025-11-05',
        deliveryStatus: 'completed',
        status: 'active',
    },
];

const statusColorMap = {
    pending: { color: '#D48806', bg: '#F7F1CC' },
    processing: { color: '#1890FF', bg: '#D9EEFF' },
    shipped: { color: '#13C2C2', bg: '#CCFAF9' },
    cancelled: { color: '#FF4D4F', bg: '#FFD8D7' },
    completed: { color: '#52C41A', bg: '#D9F2CD' },
    returned: { color: '#FF0000', bg: '#FFCCCC' },
};

export default function Orders({ dashboard }: { dashboard?: boolean }) {
    // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    // const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    // const [userToBlock, setUserToBlock] = useState<User | null>(null);

    // const showUserDetails = (user: User) => {
    //     setSelectedUser(user);
    //     setIsModalVisible(true);
    // };

    // const handleModalClose = () => {
    //     setIsModalVisible(false);
    //     setSelectedUser(null);
    // };

    // const showBlockModal = (user: User) => {
    //     setUserToBlock(user);
    //     setIsBlockModalVisible(true);
    // };

    // const handleBlockConfirm = () => {
    //     // Handle block user logic here
    //     console.log('Blocking user:', userToBlock);
    //     setIsBlockModalVisible(false);
    //     setUserToBlock(null);
    // };

    // const handleBlockCancel = () => {
    //     setIsBlockModalVisible(false);
    //     setUserToBlock(null);
    // };
    // import type { ColumnType } from 'antd/es/table';

    const columns: ColumnType<Order>[] = [
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            responsive: ['sm'] as any,
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Chef Name',
            dataIndex: 'chefName',
            key: 'chefName',
        },
        {
            title: 'Item count',
            dataIndex: 'itemCount',
            key: 'itemCount',
            responsive: ['md'] as any,
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
            onFilter: (value: boolean | React.Key, record: Order) => record.city === value,
            render: (city: string) => city,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            responsive: ['sm'] as any,
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            responsive: ['lg'] as any,
        },
        {
            title: 'Date',
            dataIndex: 'orderData',
            key: 'orderData',
            responsive: ['sm'] as any,
        },
        {
            title: 'Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (status: Order['deliveryStatus'], record: Order) => {
                const key = status as keyof typeof statusColorMap;
                const currentStyle =
                    status in statusColorMap
                        ? statusColorMap[key]
                        : {
                              color: '#595959',
                              bg: '#FAFAFA',
                          };

                return (
                    <p
                        className="capitalize px-1 py-0.5 text-center rounded-lg"
                        style={{
                            color: currentStyle.color,
                            backgroundColor: currentStyle.bg,
                        }}
                    >
                        {record?.deliveryStatus}
                    </p>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Order) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        className="text-gray-500 hover:text-blue-500"
                        // onClick={() => showUserDetails(record)}
                    />
                    <Button
                        type="text"
                        icon={<LockOutlined />}
                        className={
                            record?.status == 'active'
                                ? 'text-gray-500 hover:!text-red-500'
                                : 'hover:!text-gray-500 !text-red-500'
                        }
                        // onClick={() => showBlockModal(record)}
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-4">
                    <HeaderTitle title="Orders" />
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: '#59A817',
                            },
                        }}
                    >
                        <Input
                            placeholder="Search"
                            className=""
                            style={{ width: 280, height: 40 }}
                            prefix={<i className="bi bi-search"></i>}
                        />
                    </ConfigProvider>
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
                        dataSource={data as any}
                        pagination={dashboard ? false : { pageSize: 9, total: data.length }}
                        className="custom-table"
                    />
                </ConfigProvider>
            </div>
        </>
    );
}
