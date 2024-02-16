import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login/Login'
import ForgotPassword from './pages/ForgotPass/ForgotPassword';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/password/reset",
    element: <ForgotPassword />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
