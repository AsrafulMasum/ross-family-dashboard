'use client';

import { useState } from 'react';
import { Button, ConfigProvider, Select, Table, Tabs } from 'antd';
import type { ColumnType } from 'antd/es/table';
import HeaderTitle from '../../../components/shared/HeaderTitle';
import { CategoryTypes } from '../../../types/types';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { CiCircleInfo } from 'react-icons/ci';

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
    'Forfield',
    'Noperville',
    'Orange',
    'Toledo',
    'Austin',
];

export const categoryData: CategoryTypes[] = [
    { key: '1', categoryName: 'Italian Cuisine', totalDishes: 45, city: 'Toronto', deliveryStatus: 'active' },
    { key: '2', categoryName: 'Chinese Delights', totalDishes: 38, city: 'Vancouver', deliveryStatus: 'inactive' },
    { key: '3', categoryName: 'Indian Spices', totalDishes: 52, city: 'Calgary', deliveryStatus: 'active' },
    { key: '4', categoryName: 'Mexican Fiesta', totalDishes: 41, city: 'Ottawa', deliveryStatus: 'inactive' },
];

export const subCategoryData: CategoryTypes[] = [
    { key: '1', categoryName: 'Pasta', totalDishes: 12, city: 'Toronto', deliveryStatus: 'active' },
    { key: '2', categoryName: 'Dim Sum', totalDishes: 8, city: 'Vancouver', deliveryStatus: 'inactive' },
    { key: '3', categoryName: 'Curry', totalDishes: 10, city: 'Calgary', deliveryStatus: 'active' },
    { key: '4', categoryName: 'Tacos', totalDishes: 7, city: 'Ottawa', deliveryStatus: 'inactive' },
];

const statusColorMap = {
    active: { color: '#52C41A', bg: '#D9F2CD' },
    inactive: { color: '#FF0000', bg: '#FFCCCC' },
};

export default function Category({ dashboard }: { dashboard?: boolean }) {
    const [activeTab, setActiveTab] = useState<'category' | 'subcategory'>('category');

    const columns: ColumnType<CategoryTypes>[] = [
        {
            title: 'Serial No.',
            dataIndex: 'key',
            key: 'key',
            responsive: ['sm'] as any,
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
        },
        {
            title: 'Total Dishes',
            dataIndex: 'totalDishes',
            key: 'totalDishes',
            responsive: ['sm'] as any,
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            responsive: ['lg'] as any,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
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
            onFilter: (value: boolean | React.Key, record: CategoryTypes) => record.city === value,
            render: (city: string) => city,
        },
        {
            title: 'Status',
            dataIndex: 'deliveryStatus',
            key: 'deliveryStatus',
            render: (status: CategoryTypes['deliveryStatus'], record: CategoryTypes) => {
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
                        className="capitalize px-1 py-0.5 text-center rounded-lg max-w-40"
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
            render: (_: any) => (
                <div className="flex gap-2">
                    <Button
                        type="text"
                        icon={<CiCircleInfo size={24} />}
                        className="text-gray-500 hover:text-blue-500"
                    />
                    <Button type="text" icon={<MdOutlineDeleteOutline size={24} />} className="text-red-500" />
                </div>
            ),
        },
    ];

    return (
        <div className="rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
                <HeaderTitle title={activeTab === 'category' ? 'Categories' : 'Sub-Categories'} />

                <button className="bg-primary h-10 px-4 rounded-md text-white text-sm font-semibold">
                    Add {activeTab === 'category' ? 'Category' : 'Sub-Category'}
                </button>
            </div>

            <ConfigProvider
                theme={{
                    token: { colorPrimary: '#59A817' },
                }}
            >
                <Tabs
                    defaultActiveKey="category"
                    onChange={(key) => setActiveTab(key as 'category' | 'subcategory')}
                    items={[
                        {
                            key: 'category',
                            label: 'Categories',
                            children: (
                                <Table
                                    columns={columns}
                                    dataSource={categoryData}
                                    pagination={dashboard ? false : { pageSize: 9, total: categoryData.length }}
                                    className="custom-table"
                                />
                            ),
                        },
                        {
                            key: 'subcategory',
                            label: 'Sub-Categories',
                            children: (
                                <Table
                                    columns={columns}
                                    dataSource={subCategoryData}
                                    pagination={dashboard ? false : { pageSize: 9, total: subCategoryData.length }}
                                    className="custom-table"
                                />
                            ),
                        },
                    ]}
                />
            </ConfigProvider>
        </div>
    );
}
