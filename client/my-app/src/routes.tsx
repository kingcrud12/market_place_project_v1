

import React from 'react';

// Importation des pages
import Homepage from './screens_2/pages/Homepage';
import Signin from './screens_2/pages/Signin';
import Signup from './screens_2/pages/Signup';
import Forgotpassword from './screens_2/pages/Forgotpassword';
import ResetNewPassword from './screens_2/pages/ResetNewPassword';
import ShopPage from './screens_2/pages/ShopPage';
import SignUp from './screens_2/Ancientsx/SignUp';
import ResetPassword from './screens_2/Ancientsx/ResetPassword';
import OrderDetails from './screens_2/Ancientsx/OrderDetails';

export interface Route {
  path: string;
  label: string;
  element: React.ReactNode;
  parent?: string;
}

// Configuration des routes
const routes: Route[] = [
  { path: '/', label: 'Home', element: <Homepage /> },
  { path: '/signin', label: 'Sign In', element: <Signin />, parent: '/' },
  { path: '/signup', label: 'Sign Up', element: <Signup />, parent: '/' },
  { path: '/forgotpassword', label: 'Forgot Password', element: <Forgotpassword />, parent: '/signin' },
  { path: '/resetnewpassword', label: 'Reset New Password', element: <ResetNewPassword />, parent: '/forgotpassword' },
  { path: '/ShopPage', label: 'Shop Page', element: <ShopPage /> },
  { path: '/reset-password/:id', label: 'Reset Password', element: <ResetPassword /> },
  { path: '/order-details/:orderId/:cartId', label: 'Order Details', element: <OrderDetails /> },
  { path: '/maincomponent', label: 'Main Component', element: <SignUp /> },
];

export default routes;