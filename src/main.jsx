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
import PostEdit from './pages/PostEdit/PostEdit.jsx'
import VisitPage from './pages/VisitPage/VisitPage.jsx'
import FindUser from './pages/ForgotPass/FindUser.jsx'

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
    path:"/inside",
    element:<Home/>
  },
  {
    path:"creation",
    element:<Creation/>
  },{
    path:"/post/:postId",
    element: <Post/>
  },
  {
    path:"/user",
    element: <User/>
  },
  {
    path:"/editProfile",
    element: <EditProfil/>
  }
  ,
  {
    path:"/accountManagement",
    element: <AccountManagement/>
  },
  {
    path:"/_created",
    element: <UserPosts/>
  },
  {
    path:"/postEdit/:postId",
    element: <PostEdit/>
  },
  {
    path:"/user/:usernameVisit",
    element: <VisitPage/>
  }
  ,
  {
    path:"/:username/findUser",
    element: <FindUser/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
