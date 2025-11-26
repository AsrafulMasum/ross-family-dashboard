import { Button, ConfigProvider, Input, Select, Table, Tabs, Modal } from 'antd';
import { useState } from 'react';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CiCircleInfo, CiLock, CiUnlock } from 'react-icons/ci';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import BlockModal from '../users/BlockModal';
import { ChefsTypes } from '../../../types/types';
import ChefDetailsModal from '../../../components/modals/ChefDetailsModal';
import AddChefModal from '../../../components/modals/AddChefModal';

const { Option } = Select;
const { TabPane } = Tabs;

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
    'Forfield',
    'Noperville',
    'Orange',
    'Toledo',
    'Austin',
];

const chefData: ChefsTypes[] = [
    {
        id: 1,
        name: 'James Anderson',
        username: 'jamesanderson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jamesanderson',
        email: 'james.anderson@example.com',
        country: 'Canada',
        address: '123 Maple Street',
        zip: 'M5V 3A8',
        region: 'Ontario',
        city: 'Toronto',
        cuisineType: 'Italian, French, American',
        certificateFile: '/certificate.pdf',
        verified: true,
        registrationDate: '2023-02-14',
        totalOrder: 128,
        revenue: 45230.5,
    },
    {
        id: 2,
        name: 'Sophia Turner',
        username: 'sophiaturner',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sophiaturner',
        email: 'sophia.turner@example.com',
        country: 'Canada',
        address: '78 Wellington Ave',
        zip: 'V6B 2R3',
        region: 'British Columbia',
        city: 'Vancouver',
        cuisineType: 'French, Mediterranean, Asian',
        certificateFile: '/certificate.pdf',
        verified: true,
        registrationDate: '2022-11-03',
        totalOrder: 94,
        revenue: 38910.0,
    },
    {
        id: 3,
        name: 'Liam Brown',
        username: 'liambrown',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liambrown',
        email: 'liam.brown@example.com',
        country: 'Canada',
        address: '45 Elm Road',
        zip: 'T2P 2G8',
        region: 'Alberta',
        city: 'Calgary',
        cuisineType: 'Italian, Spanish, Mexican',
        certificateFile: '/certificate.pdf',
        verified: true,
        registrationDate: '2023-05-27',
        totalOrder: 143,
        revenue: 50120.75,
    },
];

// New dummy request data
const requestData = [
    {
        key: 1,
        name: 'John Smith',
        email: 'john.smith@example.com',
        cuisineType: 'Italian',
        address: '123 King Street, Toronto',
        zipCode: 'M5H 2N2',
        certificate: '/certificates/sample1.pdf',
        status: 'Pending',
    },
    {
        key: 2,
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        cuisineType: 'Indian',
        address: '56 Queen Ave, Vancouver',
        zipCode: 'V6B 3H7',
        certificate: '/certificates/sample2.pdf',
        status: 'Approved',
    },
];

const statusColorMap = {
    Pending: { color: '#D48806', bg: '#F7F1CC' },
    Rejected: { color: '#FF4D4F', bg: '#FFD8D7' },
    Approved: { color: '#52C41A', bg: '#D9F2CD' },
};

export default function Chefs({ dashboard }: { dashboard?: boolean }) {
    const [addChefModal, setAddChefModal] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<ChefsTypes | null>(null);
    const [isBlockModalVisible, setIsBlockModalVisible] = useState<boolean>(false);
    const [userToBlock, setUserToBlock] = useState<ChefsTypes | null>(null);
    const [pdfModalVisible, setPdfModalVisible] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    console.log(selectedCity);

    const showPdfModal = (url: string) => {
        setPdfUrl(url);
        setPdfModalVisible(true);
    };

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
            dataIndex: 'id',
            key: 'id',
            responsive: ['sm'] as any,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            dataIndex: 'registrationDate',
            key: 'registrationDate',
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

    const requestColumns = [
        { title: 'Serial No', dataIndex: 'key', key: 'key' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Cuisine Type', dataIndex: 'cuisineType', key: 'cuisineType' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        { title: 'Zip Code', dataIndex: 'zipCode', key: 'zipCode' },
        {
            title: 'Certificate',
            dataIndex: 'certificate',
            key: 'certificate',
            render: (url: string) => (
                <Button type="link" onClick={() => showPdfModal(url)}>
                    View PDF
                </Button>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: ChefsTypes['status'], record: ChefsTypes) => {
                const key = status as keyof typeof statusColorMap;
                const currentStyle =
                    status && status in statusColorMap
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
                        {record?.status}
                    </p>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <div className="flex gap-2">
                    <Button type="primary">Approve</Button>
                    <Button danger>Reject</Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Chefs" key="1">
                        {/* 👇 Your original table untouched */}
                        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                            <div className="flex items-center justify-between mb-4">
                                <HeaderTitle title="Users" />
                                <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
                                    <div className="flex justify-end gap-4 mb-4">
                                        <Select
                                            placeholder="City"
                                            style={{ width: 120, height: 40 }}
                                            allowClear
                                            showSearch
                                            onChange={(value) => setSelectedCity(value)}
                                            filterOption={(input, option) =>
                                                (String(option?.children) ?? '')
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                        >
                                            {canadianCities?.map((city) => (
                                                <Select.Option key={city} value={city}>
                                                    {city}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        <Select
                                            placeholder="Region"
                                            style={{ width: 120, height: 40 }}
                                            allowClear
                                            showSearch
                                            onChange={(value) => setSelectedCity(value)}
                                            filterOption={(input, option) =>
                                                (String(option?.children) ?? '')
                                                    .toLowerCase()
                                                    .includes(input.toLowerCase())
                                            }
                                        >
                                            {canadianCities?.map((city) => (
                                                <Select.Option key={city} value={city}>
                                                    {city}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                        <Input
                                            placeholder="Search"
                                            className=""
                                            style={{ width: 280, height: 40 }}
                                            prefix={<i className="bi bi-search"></i>}
                                        />
                                        <button
                                            className="bg-primary h-10 px-4 rounded-md text-white text-sm font-semibold"
                                            onClick={() => setAddChefModal(true)}
                                        >
                                            Add Chef
                                        </button>
                                    </div>
                                </ConfigProvider>
                            </div>
                            <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
                                <Table
                                    columns={columns}
                                    dataSource={chefData}
                                    pagination={dashboard ? false : { pageSize: 9, total: chefData.length }}
                                />
                            </ConfigProvider>
                        </div>
                    </TabPane>

                    {/* ✅ New Request Tab */}
                    <TabPane tab="Requests" key="2">
                        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                            <HeaderTitle title="Chef Requests" />
                            <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
                                <Table columns={requestColumns} dataSource={requestData} pagination={{ pageSize: 9 }} />
                            </ConfigProvider>
                        </div>
                    </TabPane>

                    <TabPane tab="Trending" key="3">
                        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
                            <HeaderTitle title="Trending Chefs" />
                            <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
                                <Table
                                    columns={columns}
                                    dataSource={chefData
                                        .sort((a, b) => (b.totalOrder ?? 0) - (a.totalOrder ?? 0))
                                        .slice(0, 5)}
                                    pagination={false}
                                />
                            </ConfigProvider>
                        </div>
                    </TabPane>
                </Tabs>
            </ConfigProvider>

            {/* Modals */}
            <ChefDetailsModal open={isModalVisible} onCancel={handleModalClose} selectedUser={selectedUser} />

            <BlockModal
                isBlockModalVisible={isBlockModalVisible}
                handleBlockCancel={handleBlockCancel}
                handleBlockConfirm={handleBlockConfirm}
                isUserBlocked={userToBlock?.status !== 'active'}
            />

            <Modal
                open={pdfModalVisible}
                onCancel={() => setPdfModalVisible(false)}
                footer={null}
                width={800}
                title="Chef Certificate"
            >
                <iframe src={pdfUrl} width="100%" height="600px" style={{ border: 'none' }} />
            </Modal>

            <AddChefModal open={addChefModal} onClose={() => setAddChefModal(false)} />
        </>
    );
}
