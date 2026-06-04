import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tournaments from './pages/Tournaments'
import Matches from './pages/Matches'
import Teams from './pages/Teams'
import Rankings from './pages/Rankings'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/rankings" element={<Rankings />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
