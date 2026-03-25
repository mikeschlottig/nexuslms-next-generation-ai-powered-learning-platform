import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { Toaster } from "@/components/ui/sonner";
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { CoursePlayer } from '@/pages/CoursePlayer'
import { Catalog } from '@/pages/Catalog'
import { Portfolio } from '@/pages/Portfolio'
import { CourseBuilder } from '@/pages/CourseBuilder'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/course/:id",
    element: <CoursePlayer />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/builder",
    element: <CourseBuilder />,
    errorElement: <RouteErrorBoundary />,
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)