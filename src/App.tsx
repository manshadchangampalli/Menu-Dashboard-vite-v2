import { RouterProvider } from 'react-router/dom'
import './App.css'
import { router } from './routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,           // max 2 calls total (1 initial + 1 retry)
      staleTime: 30000,   // 30s global stale time
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  )
}

export default App
