// REACT
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// STYLE
import './index.css'

// REACT ROUTER
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// PAGES
import App from './App.tsx'

import { ErrorPage } from '@/pages/ErrorPage.tsx';
import { NotFoundPage } from '@/pages/NotFoundPage.tsx';
import { AboutPage } from '@/pages/AboutPage.tsx';
import { LibraryDetail } from '@/pages/LibraryDetail.tsx';
import { StoryPage } from '@/pages/StoryPage.tsx';
import { ComicPage } from '@/pages/ComicPage.tsx';

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
    children: [
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "library",
        element: <LibraryDetail />,
        errorElement: <ErrorPage />,
      },
      {
        // Story detail routes with the pattern you requested
        path: "story/element_id=:elementId/:titleSlug/:filters?",
        element: <StoryPage />,
        errorElement: <ErrorPage />,
      },
      {
        // Comic detail routes with similar pattern
        path: "comic/element_id=:elementId/:titleSlug/:filters?",
        element: <ComicPage />,
        errorElement: <ErrorPage />,
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
