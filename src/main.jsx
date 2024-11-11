import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import SignUpPage from './SignUpPage.jsx';
import SignInPage from './SignInPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import FeatureList from "./FeatureList.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
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
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
