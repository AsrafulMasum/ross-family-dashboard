import { FC } from 'react';
import { Card, Rate, Avatar } from 'antd';

interface ReviewType {
    id: number;
    name: string;
    time: string;
    rating: number;
    avatar: string;
    review: string;
}

const reviews: ReviewType[] = [
    {
        id: 1,
        name: 'Jhon Lura',
        time: '2h ago',
        rating: 5,
        avatar: '/user.svg',
        review: 'Really impressed with the demo! The layout is smooth, the charts are easy to read, and the overall flow feels user-friendly. It gives a very solid picture of how the final system will look.',
    },
    {
        id: 2,
        name: 'Jhon Lura',
        time: '2h ago',
        rating: 3,
        avatar: '/user.svg',
        review: 'Really impressed with the demo! The layout is smooth, the charts are easy to read, and the overall flow feels user-friendly. It gives a very solid picture of how the final system will look.',
    },
    {
        id: 3,
        name: 'Jhon Lura',
        time: '2h ago',
        rating: 1,
        avatar: '/user.svg',
        review: 'Really impressed with the demo! The layout is smooth, the charts are easy to read, and the overall flow feels user-friendly. It gives a very solid picture of how the final system will look.',
    },
];

const ReviewCards: FC = () => {
    return (
        <div className="w-full py-6">
            {/* <HeaderTitle title="Customer Satisfaction" /> */}
            <h2 className="text-lg font-semibold">Customer Satisfaction</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
                {reviews.map((item) => (
                    <Card key={item.id} className="rounded-xl shadow border" bodyStyle={{ padding: '20px' }}>
                        <div className="flex items-center justify-between mb-3">
                            {/* Avatar + name */}
                            <div className="flex items-center gap-3">
                                <Avatar
                                    src={<img src={item.avatar} alt="avatar" className="rounded-full object-cover" />}
                                />
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-gray-500">{item.time}</p>
                                </div>
                            </div>

                            {/* Stars */}
                            <Rate value={item.rating} disabled className="text-orange-400" style={{ fontSize: 16 }} />
                        </div>

                        {/* Review text */}
                        <p className="text-sm text-gray-600 leading-relaxed">{item.review}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ReviewCards;
