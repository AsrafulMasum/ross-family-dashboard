import { Modal, Descriptions, Button, ConfigProvider } from 'antd';
import { TransactionTypes } from '../../types/types';

interface TransactionDetailsModalProps {
    open: boolean;
    onClose: () => void;
    transaction: TransactionTypes | null;
    activeTab: 'chef' | 'customer' | 'driver';
}

const statusColorMap = {
    Pending: { color: '#D48806', bg: '#F7F1CC' },
    Rejected: { color: '#FF4D4F', bg: '#FFD8D7' },
    Approved: { color: '#52C41A', bg: '#D9F2CD' },
};

const TransactionDetailsModal = ({ open, onClose, transaction, activeTab }: TransactionDetailsModalProps) => {
    if (!transaction) return null;

    const statusStyle = transaction.deliveryStatus
        ? statusColorMap[transaction.deliveryStatus as keyof typeof statusColorMap] || {
              color: '#595959',
              bg: '#FAFAFA',
          }
        : { color: '#595959', bg: '#FAFAFA' };

    return (
        <ConfigProvider theme={{ token: { colorPrimary: '#59A817' } }}>
            <Modal
                title="Transaction Details"
                open={open}
                onCancel={onClose}
                footer={<Button onClick={onClose}>Close</Button>}
                width={600}
                centered
            >
                <Descriptions column={1} bordered size="middle">
                    <Descriptions.Item label="Name">{transaction.name}</Descriptions.Item>
                    <Descriptions.Item label="Email">{transaction.email}</Descriptions.Item>
                    <Descriptions.Item label="City">{transaction.city}</Descriptions.Item>
                    <Descriptions.Item label="Date">{transaction.date}</Descriptions.Item>
                    <Descriptions.Item
                        label={
                            activeTab === 'chef'
                                ? 'Total Sales'
                                : activeTab === 'customer'
                                ? 'Total Orders'
                                : 'Total Deliveries'
                        }
                    >
                        {activeTab === 'chef'
                            ? transaction.totalSales
                            : activeTab === 'customer'
                            ? transaction.totalOrders
                            : transaction.totalDeliveries}
                    </Descriptions.Item>
                    <Descriptions.Item label={activeTab === 'customer' ? 'Payment' : 'Income'}>
                        {activeTab === 'customer' ? transaction.payment : transaction.income}
                    </Descriptions.Item>
                    <Descriptions.Item label="Revenue">{transaction.revenue}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                        <span
                            style={{
                                color: statusStyle.color,
                                backgroundColor: statusStyle.bg,
                                padding: '2px 8px',
                                borderRadius: 6,
                                fontWeight: 500,
                            }}
                        >
                            {transaction.deliveryStatus}
                        </span>
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </ConfigProvider>
    );
};

export default TransactionDetailsModal;
