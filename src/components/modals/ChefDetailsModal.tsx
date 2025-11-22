import type React from 'react';

import { useState } from 'react';
import { Star, MessageCircle, X } from 'lucide-react';
import { ChefsTypes } from '../../types/types';
import { Select } from 'antd';

interface Recipe {
    cuisineType: string;
    name: string;
    id: number;
    image: string;
    price: number;
    rating: number;
    reviews: number;
    date: string;
    time: string;
    category: string;
}

interface Props {
    open: boolean;
    onCancel: () => void;
    selectedUser: ChefsTypes | null;
}

const recipesData: Recipe[] = [
    {
        id: 1,
        name: 'Mutton Paneer',
        image: 'https://images.unsplash.com/photo-1585937421456-de714db40abc?w=400&h=300&fit=crop',
        rating: 4.1,
        reviews: 203,
        price: 29.8,
        cuisineType: 'American',
        category: 'Non-Veg',
        date: '11 Aug 2025',
        time: '6 pm - 9 pm',
    },
    {
        id: 2,
        name: 'Teheri',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
        rating: 4.1,
        reviews: 123,
        price: 29.8,
        cuisineType: 'American',
        category: 'Non-Veg',
        date: '11 Aug 2025',
        time: '6 pm - 9 pm',
    },
    {
        id: 3,
        name: 'Ghee Rice',
        image: 'https://images.unsplash.com/photo-1585238341710-4dd9c0c96fdf?w=400&h=300&fit=crop',
        rating: 4.1,
        reviews: 103,
        price: 28.8,
        cuisineType: 'American',
        category: 'Veg',
        date: '11 Aug 2025',
        time: '6 pm - 9 pm',
    },
    {
        id: 4,
        name: 'Ghee Roast',
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
        rating: 4.1,
        reviews: 78,
        price: 32.5,
        cuisineType: 'American',
        category: 'Veg',
        date: '11 Aug 2025',
        time: '6 pm - 9 pm',
    },
];

const ChefDetailsModal: React.FC<Props> = ({ open, onCancel, selectedUser }) => {
    const [activeTab, setActiveTab] = useState<'1' | '2'>('1');

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header with close button */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Chef Details</h2>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('1')}
                        className={`px-6 py-3 font-medium text-sm transition ${
                            activeTab === '1'
                                ? 'text-green-600 border-b-2 border-green-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Information
                    </button>
                    <button
                        onClick={() => setActiveTab('2')}
                        className={`px-6 py-3 font-medium text-sm transition ${
                            activeTab === '2'
                                ? 'text-green-600 border-b-2 border-green-600'
                                : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Recipes
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === '1' && selectedUser && (
                        <div className="space-y-6">
                            {/* Profile Header Section */}
                            <div className="flex items-start gap-6 pb-6 border-b border-gray-200">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <img
                                        src={selectedUser.avatar || '/placeholder.svg'}
                                        alt={selectedUser.name}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                                    />
                                </div>

                                {/* Profile Info */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h3>
                                            {selectedUser.verified && (
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                    ✓ Verified
                                                </span>
                                            )}
                                        </div>
                                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-primary text-primary hover:bg-blue-50 font-medium transition">
                                            <MessageCircle size={18} />
                                            Message
                                        </button>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-6">@{selectedUser.username}</p>

                                    {/* Info Grid */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
                                            <p className="text-sm text-gray-600">{selectedUser.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Country</p>
                                            <p className="text-sm text-gray-600">{selectedUser.country}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Address</p>
                                            <p className="text-sm text-gray-600">{selectedUser.address}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Zip</p>
                                            <p className="text-sm text-gray-600">{selectedUser.zip}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Region</p>
                                            <p className="text-sm text-gray-600">{selectedUser.region}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Cuisine Type</p>
                                            <p className="text-sm text-gray-600">{selectedUser.cuisineType}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 mb-1">Certificate</p>
                                            <a
                                                href={selectedUser.certificateFile}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-700 font-medium text-sm underline"
                                            >
                                                View File
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === '2' && (
                        <div>
                            {/* Filter dropdown */}
                            <div className="mb-6 flex justify-end">
                                <Select
                                    defaultValue="all"
                                    style={{ width: 180 }}
                                    options={[
                                        { label: 'All Recipes', value: 'all' },
                                        { label: 'My Recipes', value: 'my' },
                                    ]}
                                />
                            </div>

                            {/* Recipes Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                                {recipesData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition cursor-pointer group"
                                    >
                                        {/* Recipe Image */}
                                        <div className="relative h-40 overflow-hidden bg-gray-100">
                                            <img
                                                src={item.image || '/placeholder.svg'}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        </div>

                                        {/* Recipe Info */}
                                        <div className="p-3 space-y-2">
                                            <h4 className="font-bold text-sm text-gray-900 line-clamp-1">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-gray-500">{item.category}</p>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2 py-1">
                                                <div className="flex items-center gap-1">
                                                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                                    <span className="text-xs font-semibold text-gray-900">
                                                        {item.rating}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-gray-500">({item.reviews} reviews)</span>
                                            </div>

                                            {/* Date and Time */}
                                            <div className="text-xs text-gray-600 space-y-1">
                                                <p>📅 {item.date}</p>
                                                <p>🕐 {item.time}</p>
                                            </div>

                                            {/* Price */}
                                            <div className="pt-2 border-t border-gray-100">
                                                <p className="text-sm font-bold text-green-600">
                                                    ${item.price.toFixed(1)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChefDetailsModal;
