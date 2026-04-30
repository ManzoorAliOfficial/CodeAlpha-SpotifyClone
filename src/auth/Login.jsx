import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react'
import useAuthStore from '../store/useAuthStore'

const SpotifyLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
)

const SocialButton = ({ icon, label }) => (
  <button
    type="button"
    className="w-full flex items-center justify-center gap-3 border border-[#878787] rounded-full py-3 px-4 text-white font-semibold text-sm hover:border-white hover:scale-[1.02] active:scale-100 transition-all duration-200"
  >
    <span className="w-5 h-5 flex-shrink-0">{icon}</span>
    <span>Continue with {label}</span>
  </button>
)

const InputField = ({
  label, type, placeholder, value, onChange,
  error, icon: Icon, showToggle, onToggle, showPassword,
}) => (
  <div className="mb-5">
    <label className="block text-sm font-bold text-white mb-2">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#878787] pointer-events-none">
        <Icon size={16} />
      </div>
      <input
        type={showToggle ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-[#121212] border rounded-md py-3.5 pl-11 pr-11 text-white text-sm
          placeholder-[#6a6a6a] outline-none transition-all duration-200 focus:ring-1 ${
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-[#878787] focus:border-white focus:ring-white'
        }`}
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#878787] hover:text-white transition-colors"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          className="flex items-center gap-1.5 text-red-400 text-xs mt-2"
        >
          <AlertCircle size={12} />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
)

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email address'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    login({ email: form.email, name: form.email.split('@')[0], avatar: null })
    setLoading(false)
    navigate('/')
  }

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: '' }))
  }

  return (
  
    <div className="fixed inset-0 overflow-y-auto bg-[#121212]">
      <div className="min-h-full flex flex-col">

        {/* ── Sticky top logo bar ── */}
       <div className="sticky top-0 z-10 bg-[#121212] border-b border-[#282828] flex justify-center py-6 flex-shrink-0">
          
    {/* Logo */}
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 text-[#1DB954] flex-shrink-0">
        <SpotifyLogo />
      </div>
      <span className="text-white font-black text-xl tracking-tight hidden sm:block">
        Spotify
      </span>
    </div>
    
        </div>
        

        {/* ── Main scrollable content ── */}
        <div className="flex-1 flex justify-center px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-full max-w-[450px]"
          >
            <h1 className="text-3xl sm:text-4xl font-black text-white text-center mb-10 leading-tight">
              Log in to Spotify
            </h1>

            {/* Social buttons */}
            <div className="space-y-3 mb-8">
              <SocialButton
                label="Google"
                icon={
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                }
              />
              <SocialButton
                label="Facebook"
                icon={
                  <svg viewBox="0 0 24 24" fill="#1877F2" className="w-5 h-5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                }
              />
              <SocialButton
                label="Apple"
                icon={
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                  </svg>
                }
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-[#282828]" />
              <span className="text-[#878787] text-sm font-bold">or</span>
              <div className="flex-1 h-px bg-[#282828]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <InputField
                label="Email or username"
                type="email"
                placeholder="Email or username"
                value={form.email}
                onChange={handleChange('email')}
                error={errors.email}
                icon={Mail}
              />
              <InputField
                label="Password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange('password')}
                error={errors.password}
                icon={Lock}
                showToggle
                onToggle={() => setShowPassword((s) => !s)}
                showPassword={showPassword}
              />

              <div className="flex items-center justify-between mb-8 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#1DB954] cursor-pointer rounded"
                  />
                  <span className="text-white text-sm select-none">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-white text-sm font-semibold underline hover:text-[#1DB954] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#1DB954] text-black font-black text-base rounded-full py-4 hover:bg-[#1ed760] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : 'Log In'}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="h-px bg-[#282828] my-10" />

            {/* Sign up */}
            <p className="text-center text-[#878787] text-sm pb-10">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-white font-bold underline hover:text-[#1DB954] transition-colors"
              >
                Sign up for Spotify
              </Link>
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default Login