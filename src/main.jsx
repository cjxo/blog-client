import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import WelcomePage from './pages/notauth/Welcome.jsx';
import SignUpPage from './pages/notauth/SignUp.jsx';
import SignInPage from './pages/notauth/SignIn.jsx';
import WelcomeErrorPage from './pages/notauth/WelcomeError.jsx';
import FeatureList from "./pages/notauth/FeatureList.jsx"
import HomePage from "./pages/auth/HomePage.jsx"
import AccountPage from "./pages/auth/Account.jsx"
import DisplayPostsPage from "./pages/auth/DisplayPosts.jsx"
import CreatePostPage from "./pages/auth/CreatePost.jsx"
import PostPage from "./pages/auth/Post.jsx"
import { AuthProvider } from "./components/AuthProvider.jsx"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <WelcomeErrorPage />,
    children: [
      {
        path: "/",
        element: <FeatureList />
      },
      {
        path: "sign-up",
        element: <SignUpPage />
      },
      {
        path: "sign-in",
        element: <SignInPage />
      }, 
    ]
  },
  {
    path: "/home",
    element: <HomePage />,
    errorElement: <WelcomeErrorPage />,
    children: [
      {
        path: "/home",
        element: <DisplayPostsPage />
      },
      {
        path: "account",
        element: <AccountPage />
      },
      {
        path: "add-post",
        element: <CreatePostPage />
      },
      {
        path: "post/:id",
        element: <PostPage />,
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
