// REACT
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// STYLE
import './index.css'

// REACT ROUTER
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// PAGES
import App from './App.tsx'

import { NotFoundPage } from './pages/NotFoundPage.tsx';
import { ErrorPage } from './pages/ErrorPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContentPage } from './pages/ContentPage.tsx';
import { ComicDetail } from './pages/ComicDetail.tsx';

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />
  },
  {
    path: "/error",
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/content/:contentId",
    element: <ContentPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "read/comic/chapter/:number",
        element: <ComicDetail />,
        errorElement: <ErrorPage />,
      },
    ]
  },
  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <ErrorPage />,
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
