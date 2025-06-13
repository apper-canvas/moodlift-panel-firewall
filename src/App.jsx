import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AnimatePresence } from 'framer-motion'
import Layout from '@/Layout'
import { routeArray } from '@/config/routes'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen overflow-hidden bg-background">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/mood-select" replace />} />
              {routeArray.map((route) => (
                <Route
                  key={route.id}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Route>
          </Routes>
        </AnimatePresence>
        
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastClassName="font-body"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App