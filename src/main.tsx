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
import { StoryDetail } from './pages/StoryDetail.tsx';

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
    path: "/content/:title",
    element: <ContentPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "read/comic/:titleSlug/:filters?",
        element: <ComicDetail />,
        errorElement: <ErrorPage />,
      },
      {
        path: "read/story/:titleSlug/:filters?",
        element: <StoryDetail />,
        errorElement: <ErrorPage />,
      }
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
