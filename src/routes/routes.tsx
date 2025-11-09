import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/authentication/Login';
import ErrorPage from '../pages/error/ErrorPage';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOtp from '../pages/authentication/VerifyOtp';
import NewPassword from '../pages/authentication/NewPassword';
import Dashboard from '../pages/dashboard/dashboard';
import Users from '../pages/dashboard/users';
import TermsAndCondition from '../pages/dashboard/terms-and-condition';
import Profile from '../pages/dashboard/profile';
import Notification from '../pages/dashboard/notification';
import Packages from '../pages/dashboard/package';
import PrivacyPolicy from '../pages/dashboard/privacy-policy';
import FAQPage from '../pages/dashboard/faq';
import Orders from '../pages/dashboard/orders';
import WaitingList from '../pages/dashboard/waiting-list';
import Drivers from '../pages/dashboard/drivers';
import Chefs from '../pages/dashboard/chefs';
import AboutUs from '../pages/dashboard/about-us';
import Disclaimer from '../pages/dashboard/disclaimer';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'orders', element: <Orders /> },
            { path: 'waiting-list', element: <WaitingList /> },
            { path: "chefs", element: <Chefs /> },
            { path: "users", element: <Users /> },
            { path: "drivers", element: <Drivers /> },
            { path: "package", element: <Packages /> },
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <Notification /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "terms-and-condition", element: <TermsAndCondition /> },
            { path: "about-us", element: <AboutUs /> },
            { path: "disclaimer", element: <Disclaimer /> },
            { path: "faq", element: <FAQPage /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);

export default router;
