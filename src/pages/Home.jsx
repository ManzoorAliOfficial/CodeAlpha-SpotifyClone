import React from 'react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import HomeSection from '../components/sections/HomeSection'

const Home = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Header />
    <div className="px-4 sm:px-6 lg:px-8 py-6 pb-8">
      <HomeSection />
    </div>
  </motion.div>
)

export default Home