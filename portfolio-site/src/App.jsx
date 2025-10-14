import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Experience from './components/Experience'
import Contact from './components/Contact'
import VisitorCounter from './components/VisitorCounter'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Experience />
      <Contact />
      <footer className="footer">
        <VisitorCounter />
        <p>&copy; {new Date().getFullYear()} Akeem Williams. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
