import React, { useState } from 'react';
import { Avatar, Input, List, Badge, Button, ConfigProvider } from 'antd';
import { SendOutlined } from '@ant-design/icons';

interface User {
    id: number;
    name: string;
    message: string;
    time: string;
    avatar: string;
    status?: 'online' | 'offline';
    role: 'chef' | 'driver'; // <-- NEW
}

interface MessageType {
    id: number;
    sender: 'me' | 'other';
    text: string;
    time: string;
}

const usersList: User[] = [
    { id: 1, name: 'Arlene McCoy', message: 'Hi! Could you ple...', time: '07:59 PM', avatar: '/user.svg', role: 'chef' },
    { id: 2, name: 'Brooklyn Simmons', message: 'Hi! Could you ple...', time: '07:59 PM', avatar: '/user.svg', role: 'chef' },
    { id: 3, name: 'Darrell Steward', message: 'Hi! Could you ple...', time: '07:59 PM', avatar: '/user.svg', role: 'driver' },
    { id: 4, name: 'Robert Fox', message: 'Hi! Could you ple...', time: '07:59 PM', avatar: '/user.svg', role: 'driver' },
    { id: 5, name: 'Marvin McKinney', message: 'Sent', time: '07:59 PM', avatar: '/user.svg', status: 'online', role: 'driver' },
];

const defaultMessages: MessageType[] = [
    { id: 1, sender: 'other', text: 'Hello! How can I help you today?', time: '10:24 AM' },
];

const Chats: React.FC = () => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(5);
    const [activeTab, setActiveTab] = useState<'all' | 'chefs' | 'drivers'>('all');
    const [search, setSearch] = useState('');
    const [input, setInput] = useState('');

    const [chatStore, setChatStore] = useState<Record<number, MessageType[]>>({
        1: [...defaultMessages],
        2: [...defaultMessages],
        3: [...defaultMessages],
        4: [...defaultMessages],
        5: [...defaultMessages, { id: 2, sender: 'me', text: 'I’m looking for more details.', time: '10:25 AM' }],
    });

    const filteredUsers = usersList.filter((u) => {
        const matchText = u.name.toLowerCase().includes(search.toLowerCase());

        if (activeTab === 'chefs') return u.role === 'chef' && matchText;
        if (activeTab === 'drivers') return u.role === 'driver' && matchText;

        return matchText; // all
    });

    const selectedUser = usersList.find((u) => u.id === selectedUserId);
    const messages = selectedUserId ? chatStore[selectedUserId] : [];

    const handleUserClick = (user: User) => {
        setSelectedUserId(user.id);

        if (!chatStore[user.id]) {
            setChatStore((prev) => ({
                ...prev,
                [user.id]: [...defaultMessages],
            }));
        }
    };

    const sendMessage = () => {
        if (!input.trim() || !selectedUserId) return;

        const newMessage: MessageType = {
            id: Date.now(),
            sender: 'me',
            text: input,
            time: 'Now',
        };

        setChatStore((prev) => ({
            ...prev,
            [selectedUserId]: [...prev[selectedUserId], newMessage],
        }));

        setInput('');
    };

    return (
        <div className="h-[calc(100vh-120px)] w-full grid grid-cols-[320px_1fr] bg-gray-100 rounded-lg">
            {/* LEFT SIDEBAR */}
            <div className="border-r flex flex-col rounded-l-lg">

                {/* Tabs */}
                <div className="px-4 pt-4 flex gap-2">
                    {['all', 'chefs', 'drivers'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-1 rounded-full text-sm capitalize
                                ${activeTab === tab ? 'bg-[#59A817] text-white' : 'bg-gray-200 text-gray-700'}
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="p-4">
                    <div className="flex items-center bg-[#f5f5f5] border border-gray-300 rounded-xl px-3 h-10">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="ml-3 w-full bg-transparent focus:outline-none"
                        />

                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Users List */}
                <List
                    itemLayout="horizontal"
                    dataSource={filteredUsers}
                    className="overflow-y-auto h-full"
                    renderItem={(item) => (
                        <List.Item
                            className={`py-3 cursor-pointer !px-2 ${
                                selectedUserId === item.id ? 'bg-[#0000000D]' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => handleUserClick(item)}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Badge dot={item.status === 'online'} color="green" offset={[-5, 35]}>
                                        <Avatar src={item.avatar} size={45} />
                                    </Badge>
                                }
                                title={<span className="font-medium">{item.name}</span>}
                                description={<span className="text-gray-500 text-sm">{item.message}</span>}
                            />
                            <div className="text-xs text-gray-400">{item.time}</div>
                        </List.Item>
                    )}
                />
            </div>

            {/* RIGHT CHAT AREA */}
            <div className="flex flex-col h-full rounded-r-lg">
                {/* Chat Header */}
                {selectedUser && (
                    <div className="p-4 border-b flex items-center gap-3">
                        <Avatar src={selectedUser.avatar} size={45} />
                        <div>
                            <h3 className="font-semibold">{selectedUser.name}</h3>
                            <span
                                className={`text-xs ${
                                    selectedUser.status === 'online' ? 'text-green-500' : 'text-gray-500'
                                }`}
                            >
                                {selectedUser.status === 'online' ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>
                )}

                {/* Messages */}
                <div className="flex-1 p-6 max-h-[calc(100vh-280px)] overflow-y-auto space-y-4">
                    {messages?.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-lg p-3 rounded-2xl text-sm shadow 
                                    ${
                                        msg.sender === 'me'
                                            ? 'bg-primary text-white rounded-br-none'
                                            : 'bg-white text-gray-800 rounded-bl-none'
                                    }`}
                            >
                                {msg.text}

                                <div
                                    className={`text-xs mt-1 ${
                                        msg.sender === 'me' ? 'text-green-100' : 'text-gray-400'
                                    }`}
                                >
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Box */}
                <div className="p-4 border-t flex items-center gap-3">
                    <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
                        <Input
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onPressEnter={sendMessage}
                            className="h-12"
                        />
                        <Button
                            type="primary"
                            shape="circle"
                            className="h-12 !w-12"
                            icon={<SendOutlined className="-rotate-45 pl-1" />}
                            onClick={sendMessage}
                            style={{ backgroundColor: '#59A817', borderColor: '#59A817' }}
                        />
                    </ConfigProvider>
                </div>
            </div>
        </div>
    );
};

export default Chats;
