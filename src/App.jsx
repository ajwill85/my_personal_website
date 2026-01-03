import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import Router from './components/Router'
import VisitorCounter from './components/VisitorCounter'
import './App.css'

function App() {
  const [currentRoute, setCurrentRoute] = useState('home')

  // Handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home'
      setCurrentRoute(hash)
    }

    // Set initial route from hash
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleNavigate = (route) => {
    window.location.hash = route
    setCurrentRoute(route)
  }

  return (
    <Layout currentRoute={currentRoute} onNavigate={handleNavigate}>
      <Router />
      <footer className="footer">
        <VisitorCounter />
        <p>&copy; {new Date().getFullYear()} Akeem Williams. All rights reserved.</p>
      </footer>
    </Layout>
  )
}

export default App
