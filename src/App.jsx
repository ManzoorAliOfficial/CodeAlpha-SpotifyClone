import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import useAuthStore from './store/useAuthStore'

const Home     = lazy(() => import('./pages/Home'))
const Search   = lazy(() => import('./pages/Search'))
const Library  = lazy(() => import('./pages/Library'))
const Playlist = lazy(() => import('./pages/Playlist'))
const Album    = lazy(() => import('./pages/Album'))
const Artist   = lazy(() => import('./pages/Artist'))
const Login    = lazy(() => import('../src/auth/Login'))
const SignUp   = lazy(() => import('../src/auth/SignUp'))
const NotFound = lazy(() => import('./pages/NotFound'))

const Fallback = () => (
  <div className="flex items-center justify-center h-screen bg-[#121212]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-3 border-[#1DB954] border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
)

// Auth route — agar already logged in hai toh home pe bhejo
const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useAuthStore()
  if (isLoggedIn) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>

          {/* Auth routes — logged in hoga toh / pe redirect */}
          <Route path="/login" element={
            <AuthRoute><Login /></AuthRoute>
          } />
          <Route path="/signup" element={
            <AuthRoute><SignUp /></AuthRoute>
          } />

          {/* Protected routes — logged out hoga toh /login pe redirect */}
          <Route element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route path="/"                  element={<Home />} />
            <Route path="/search"            element={<Search />} />
            <Route path="/library"           element={<Library />} />
            <Route path="/playlist/:id"      element={<Playlist />} />
            <Route path="/album/:id"         element={<Album />} />
            <Route path="/artist/:id"        element={<Artist />} />
            <Route path="/collection/tracks" element={<Playlist />} />
          </Route>

          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}