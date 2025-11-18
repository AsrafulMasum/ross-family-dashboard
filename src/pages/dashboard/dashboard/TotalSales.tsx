import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, Card } from 'antd';
import { earningsData } from '../../../demo-data/home-data';

const { Option } = Select;

const canadianCities = [
    'Toronto',
    'Vancouver',
    'Montreal',
    'Calgary',
    'Ottawa',
    'Edmonton',
    'Quebec City',
    'Winnipeg',
    'Halifax',
    'Victoria',
];

const months = [
    'Monthly',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const CustomLegend = () => {
    return (
        <div className="flex justify-center gap-2 2xl:gap-4 text-sm text-[#757575]">
            <div className="flex items-center gap-1 whitespace-nowrap">
                <div className="w-3 h-3 bg-[#3CC3DF] rounded-full" />
                Sales
            </div>
        </div>
    );
};

const TotalSales = () => {
    const [selectedYear, setSelectedYear] = useState('2025');
    const [selectedCity, setSelectedCity] = useState('Toronto');
    const [selectedMonth, setSelectedMonth] = useState('Monthly');

    return (
        <div>
            <Card className="rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4 gap-4">
                    <h2 className="text-lg font-semibold">Total Sales</h2>
                    <div className="flex gap-2">
                        {/* City Dropdown */}
                        <Select value={selectedCity} onChange={setSelectedCity} className="w-36">
                            {canadianCities.map((city) => (
                                <Option key={city} value={city}>
                                    {city}
                                </Option>
                            ))}
                        </Select>

                        {/* Month Dropdown */}
                        <Select value={selectedMonth} onChange={setSelectedMonth} className="w-32">
                            {months.map((month) => (
                                <Option key={month} value={month}>
                                    {month}
                                </Option>
                            ))}
                        </Select>

                        {/* Year Dropdown */}
                        <Select value={selectedYear} onChange={setSelectedYear} className="w-24">
                            <Option value="2023">2023</Option>
                            <Option value="2024">2024</Option>
                            <Option value="2025">2025</Option>
                        </Select>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={230}>
                    <AreaChart data={earningsData}>
                        <defs>
                            <linearGradient id="colorOfEarnings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3CC3DF" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#3CC3DF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        {/* <XAxis dataKey="month" stroke="#999" style={{ fontSize: '12px' }} /> */}
                        {/* <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        /> */}
                        <XAxis
                            dataKey="month"
                            stroke="#999"
                            style={{ fontSize: '12px' }}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis stroke="#999" style={{ fontSize: '12px' }} tickFormatter={(value) => `${value}`} />
                        <Tooltip
                            formatter={(value) => `$${value}`}
                            contentStyle={{
                                backgroundColor: '#f5f5f5',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '8px 12px',
                            }}
                            labelStyle={{ color: '#c61f1f' }}
                        />
                        <Area
                            type="linear"
                            dataKey="value"
                            stroke="#3CC3DF"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorOfEarnings)"
                            activeDot={{ r: 6 }}
                            dot={{ fill: '#3CC3DF', r: 4 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <CustomLegend />
            </Card>
        </div>
    );
};

export default TotalSales;
