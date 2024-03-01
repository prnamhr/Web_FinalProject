import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login/Login'
import SignUp from './pages/Signup/Signuppage';
import ForgotPassword from './pages/ForgotPass/ForgotPassword';
import Home from './pages/Home/Home.jsx';
import Creation from './pages/Creation/Creation.jsx'
import Post from './pages/Post/Post.jsx'
import User from './pages/User/User.jsx'
import EditProfil from './pages/EditProfile/EditProfile.jsx'
import AccountManagement from './pages/AccountManagement/AccountManagement.jsx'
import UserPosts from './pages/UserPosts/UserPosts.jsx'
import './index.css'
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
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path:"/:username",
    element:<Home/>
  },
  {
    path:"/:username/creation",
    element:<Creation/>
  },{
    path:"/:username/post/:postId",
    element: <Post/>
  },
  {
    path:"/:username/user",
    element: <User/>
  },
  {
    path:"/:username/editProfile",
    element: <EditProfil/>
  }
  ,
  {
    path:"/:username/accountManagement",
    element: <AccountManagement/>
  },
  {
    path:"/:username/_created",
    element: <UserPosts/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
