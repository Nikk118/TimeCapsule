import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <p className="text-2xl font-bold text-white mb-2">Time Capsule 📦</p>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-white transition">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms</Link>
            <Link to="/contact" className="hover:text-white transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
